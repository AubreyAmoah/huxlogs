import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    let body = await req.json();

    // Convert all keys and values in `body` to lowercase
    body = Object.fromEntries(
      Object.entries(body).map(([key, value]) => [
        key.toLowerCase(),
        typeof value === "string" ? value.toLowerCase() : value,
      ])
    );

    const userID = await getDataFromToken(req);
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    if (!userID)
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );

    const { id } = body; // Get itemID from request body
    let item = await db.collection("item").findOne({ _id: new ObjectId(id) });

    if (!id)
      return NextResponse.json(
        { error: "Item ID not provided" },
        { status: 400 }
      );

    // Check if the cart for the user exists
    let userCart = await db.collection("cart").findOne({ userID });

    if (!userCart) {
      // If no cart exists, create a new cart for the user
      userCart = {
        userID,
        items: [],
        createdAt: new Date(Date.now()),
      };
    }

    // Check if the item is already in the cart
    const itemExists = userCart.items.find(
      (item) => item.itemID.toString() === id
    );

    if (itemExists) {
      return NextResponse.json(
        {
          error: "Item already in cart.",
        },
        { status: 400 }
      );
    }

    console.log(item);

    // If the item is not in the cart, add it
    const newItem = {
      itemID: new ObjectId(id),
      quantity: 1,
      price: item.price,
      addedAt: new Date(Date.now()),
    };

    userCart.items.push(newItem);

    // Update the user's cart in the database
    const updateCart = await db.collection("cart").updateOne(
      { userID },
      { $set: { items: userCart.items } },
      { upsert: true } // Create the cart if it doesn't exist
    );

    if (!updateCart) {
      return NextResponse.json(
        { error: "Could not update cart" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: "Item added to cart" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

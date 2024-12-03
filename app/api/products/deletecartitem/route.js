import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const body = await req.json(); // Get the item ID from request body
    const { id } = body; // item ID to be removed

    console.log(id);

    if (!id) {
      return NextResponse.json(
        { error: "Item ID not provided" },
        { status: 400 }
      );
    }

    const userID = await getDataFromToken(req); // Authenticate the user
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    if (!userID) {
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );
    }

    // Find user's cart
    const userCart = await db.collection("cart").findOne({ userID });

    if (!userCart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    // Check if the item exists in the cart
    const itemExists = userCart.items.find(
      (item) => item.itemID.toString() === id
    );

    if (!itemExists) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    // Filter out the item to be removed
    const updatedItems = userCart.items.filter(
      (item) => item.itemID.toString() !== id
    );

    // Update the cart by removing the item
    const updateCart = await db
      .collection("cart")
      .updateOne({ userID }, { $set: { items: updatedItems } });

    if (!updateCart) {
      return NextResponse.json(
        { error: "Could not update cart" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Item removed from cart" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

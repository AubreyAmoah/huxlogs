import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const userID = await getDataFromToken(req);
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    if (!userID)
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );

    const userCart = await db.collection("cart").findOne({ userID });

    if (!userCart || !userCart.items || userCart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Create a new order
    const newOrder = {
      userID,
      items: userCart.items,
      total: userCart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
      createdAt: new Date(Date.now()),
      status: "pending",
    };

    const createOrder = await db.collection("orders").insertOne(newOrder);

    if (!createOrder) {
      return NextResponse.json(
        { error: "Could not create order" },
        { status: 500 }
      );
    }

    // Clear the user's cart
    const clearCart = await db.collection("cart").deleteOne({ userID });

    if (!clearCart) {
      return NextResponse.json(
        { error: "Could not clear cart" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Order created and cart cleared",
        orderID: createOrder.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

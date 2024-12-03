import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userID = await getDataFromToken(req);
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    if (!userID) {
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );
    }

    // Retrieve the user's cart from the database
    const userCart = await db.collection("cart").findOne({ userID });

    if (!userCart || userCart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 200 });
    }

    // Get the item IDs from the cart
    const itemIDs = userCart.items.map((item) => new ObjectId(item.itemID));

    // Fetch the item details from the 'item' collection using the itemIDs
    const itemDetails = await db
      .collection("item")
      .find({ _id: { $in: itemIDs } })
      .toArray();

    // Map the cart items to include the item details from the 'item' collection
    const detailedCart = userCart.items.map((cartItem) => {
      const itemDetail = itemDetails.find(
        (item) => item._id.toString() === cartItem.itemID.toString()
      );

      // If item details exist, combine them with the cart data
      return {
        itemID: cartItem.itemID,
        name: itemDetail?.itemname || "Unknown item", // Use 'Unknown item' if no name is found
        price: itemDetail?.price || 0, // Default to 0 if no price is available
        description: itemDetail?.description || "No description available",
        quantity: cartItem.quantity,
        addedAt: cartItem.addedAt,
      };
    });

    // Return the detailed cart
    return NextResponse.json({ cart: detailedCart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

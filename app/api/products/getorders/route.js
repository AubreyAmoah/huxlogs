import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userID = await getDataFromToken(req);
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    if (!userID)
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );

    // Fetch orders grouped by status
    const pendingOrders = await db
      .collection("orders")
      .find({ userID, status: "pending" })
      .sort({ createdAt: -1 })
      .toArray();
    const completedOrders = await db
      .collection("orders")
      .find({ userID, status: "completed" })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      { pendingOrders, completedOrders },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

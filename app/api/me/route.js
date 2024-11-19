import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const userID = await getDataFromToken(req);
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const user = await db.collection("user").findOne(
      {
        _id: new ObjectId(userID),
      },
      { projection: { email: 1, _id: 1 } }
    );

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { subCategoryName } = body;
    const userID = await getDataFromToken(req);
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    if (!userID)
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );

    const items = await db
      .collection("item")
      .find({
        subcategory: subCategoryName,
      })
      .toArray();

    return NextResponse.json(items, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

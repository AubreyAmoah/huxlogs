import clientPromise from "@/app/lib/mongodb";
import { hash } from "argon2";
import { NextResponse } from "next/server";

export async function POST(req) {
  const complexPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  function isComplexPassword(word) {
    return complexPasswordRegex.test(word);
  }

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 401 }
    );
  }

  if (!isComplexPassword(password))
    return NextResponse.json({ error: "password too weak" }, { status: 400 });

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    // Check if user already exists
    const existingUser = await db.collection("user").findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password);

    // Insert the new user into the "admin" collection
    const result = await db
      .collection("user")
      .insertOne({ email, hashedPassword });

    return NextResponse.json(
      {
        message: "sign up success",
        userId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "An error occurred while creating the user",
      },
      { status: 500 }
    );
  }
}

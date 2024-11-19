import clientPromise from "@/app/lib/mongodb";
import { hash } from "argon2";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const complexPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  function isComplexPassword(word) {
    return complexPasswordRegex.test(word);
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const body = await req.json();
    const { token, password } = body;

    if (!token) {
      return NextResponse.json({ error: "token required" }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ error: "password required" }, { status: 400 });
    }

    if (!isComplexPassword(password))
      return NextResponse.json({ error: "password too weak" }, { status: 400 });

    if (password.length < 6) {
      return NextResponse.json(
        { error: "password should be six or more characters" },
        { status: 400 }
      );
    }

    const decodedToken = decodeURIComponent(token);

    const user = await db.collection("user").findOne({
      forgotPasswordToken: decodedToken,
      forgotPasswordTokenExpiry: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    const hashedPassword = await hash(password);

    const updatePassword = await db.collection("user").updateOne(
      { _id: new ObjectId(user._id) }, // Find item by ID
      { $set: { hashedPassword: hashedPassword } }
    );
    if (!updatePassword) {
      return NextResponse.json(
        { error: "Could not update password" },
        { status: 400 }
      );
    }

    const res = NextResponse.json(
      {
        message: "Password updated",
        success: true,
      },
      { status: 200 }
    );

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

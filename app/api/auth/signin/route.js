import { NextResponse } from "next/server";
import argon from "argon2";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password)
      return NextResponse.json(
        { error: "Fields must not be empty" },
        { status: 401 }
      );

    const user = await db.collection("user").findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const validPassword = await argon.verify(user.hashedPassword, password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      message: "Login successful",
    });

    res.cookies.set("token", token, {
      httpOnly: true,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

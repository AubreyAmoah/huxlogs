import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    const body = await req.json();
    const { otpToken } = body;

    if (!otpToken)
      return NextResponse.json({ error: "Fields is empty" }, { status: 401 });

    const user = await db.collection("user").findOne({
      otpToken,
      otpTokenExpiry: { $gt: new Date(Date.now()) },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
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

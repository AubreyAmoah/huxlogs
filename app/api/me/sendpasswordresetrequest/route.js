import { sendEmail } from "@/app/helpers/mailer";
import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function validateEmail(word) {
    return emailRegex.test(word);
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "email required" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: "not a valid email" }, { status: 400 });
    }

    const user = await db.collection("user").findOne({
      email,
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    const res = NextResponse.json(
      {
        message: "Reset Request Sent",
        success: true,
      },
      { status: 200 }
    );

    return res;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

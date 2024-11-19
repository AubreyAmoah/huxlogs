import { NextResponse } from "next/server";
import argon, { hash } from "argon2";
import { ObjectId } from "mongodb";
import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import clientPromise from "@/app/lib/mongodb";

export async function PUT(req) {
  const complexPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

  function isComplexPassword(word) {
    return complexPasswordRegex.test(word);
  }
  try {
    const userID = await getDataFromToken(req);
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB);

    if (!userID)
      return NextResponse.json(
        { error: "Authentication error" },
        { status: 401 }
      );

    const body = await req.json();
    const { oldpassword, newpassword, confirmpassword } = body;

    if (!oldpassword)
      return NextResponse.json(
        { error: "Please enter your current password" },
        { status: 401 }
      );

    if (!newpassword)
      return NextResponse.json(
        { error: "Please enter your new password" },
        { status: 401 }
      );

    if (newpassword.length < 6)
      return NextResponse.json(
        { error: "Password should not be less than 6 characters" },
        { status: 401 }
      );

    if (!isComplexPassword(newpassword))
      return NextResponse.json({ error: "password too weak" }, { status: 400 });

    if (!confirmpassword)
      return NextResponse.json(
        { error: "Please confirm your password" },
        { status: 401 }
      );

    if (newpassword !== confirmpassword)
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 401 }
      );

    const user = await db.collection("user").findOne({
      _id: new ObjectId(userID),
    });

    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 401 });
    }

    const validPassword = await argon.verify(user.hashedPassword, oldpassword);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    const updatedPassword = await hash(newpassword);

    const updatedUser = await db
      .collection("user")
      .updateOne(
        { _id: new ObjectId(userID) },
        { $set: { hashedPassword: updatedPassword } }
      );

    if (!updatedUser.matchedCount)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (!updatedUser.modifiedCount)
      return NextResponse.json(
        { error: "User password could not be updated" },
        { status: 403 }
      );

    return NextResponse.json(
      { message: "Password updated succesfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

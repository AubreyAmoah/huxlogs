import nodemailer from "nodemailer";
import { hash } from "argon2";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";

export const sendEmail = async ({ email, userId }) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGO_DB);
  try {
    const hashToken = await hash(userId.toString());
    await db.collection("admin").updateOne(
      {
        _id: new ObjectId(userId),
      },
      {
        $set: {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      }
    );

    const transport = nodemailer.createTransport({
      service: "gmail",
      user: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "login",
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await new Promise((resolve, rejecet) => {
      transport.verify(function (error, success) {
        if (error) {
          console.error(error);
          rejecet(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    await new Promise((resolve, reject) => {
      transport.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });
    const mailOptions = {
      from: "Huxlogs Support Team",
      to: email,
      subject: "Reset your password",
      html: `<p>Click here <a href=${process.env.Domain}/pages/reset/passwordreset?token=${hashToken}>here</a> to reset your password`,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transport.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

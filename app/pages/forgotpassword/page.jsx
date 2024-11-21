"use client";

import React, { useState, useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const { dark } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sendPasswordRequest = async () => {
    if (!email) {
      return toast.error("Please provide an email");
    }
    try {
      setLoading(true);
      await axios.post("/api/me/sendpasswordresetrequest", { email: email });
      toast.success("Request sent, check your mail");
      setMessage("Password reset link sent!!");
    } catch (error) {
      console.error(error.response.data || error);
      return toast.error(error.response.data.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col gap-6 items-center justify-center min-h-screen w-screen px-8 max-[600px]:justify-start max-[364px]:px-1 ${
        dark ? "bg-black text-zinc-50" : "bg-zinc-50 text-black"
      }`}
    >
      <Link href={"/"} className="absolute top-2 left-2">
        {dark ? (
          <Image
            src="/three.png"
            alt="App logo"
            width={120}
            height={0}
            priority
          />
        ) : (
          <Image
            src="/two.png"
            alt="App logo"
            width={120}
            height={0}
            priority
          />
        )}
      </Link>

      <h1
        className={`${
          dark ? "text-violet-600" : "text-blue-400"
        } text-2xl max-[600px]:mt-24`}
      >
        Forgot Your Password?
      </h1>
      <p className="text-center max-w-lg">
        Enter your email address below, and we&apos;ll send you a link to reset
        your password.
      </p>

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-4 rounded-md ${
            dark
              ? "border-violet-700 text-violet-700 caret-violet-700 bg-white"
              : "border-blue-500 text-blue-500 caret-blue-500 bg-slate-100"
          } border-2`}
          placeholder="Enter your email"
          required
        />

        <button
          onClick={sendPasswordRequest}
          className={`w-full rounded-md px-4 py-3 ${
            dark
              ? "border border-violet-600 text-violet-600 bg-transparent hover:bg-violet-600 hover:text-black hover:border-black"
              : "border border-blue-400 text-blue-400 bg-transparent hover:bg-blue-400 hover:text-zinc-50 hover:border-zinc-50"
          }`}
          disabled={loading}
        >
          {loading ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </button>
      </div>

      {message && (
        <p
          className={`mt-4 text-center ${
            dark ? "text-violet-600" : "text-blue-400"
          }`}
        >
          {message}
        </p>
      )}

      <Link
        href="/pages/dashboard"
        className={`mt-4 underline ${
          dark
            ? "text-violet-500 hover:text-violet-600"
            : "text-blue-500 hover:text-blue-600"
        }`}
      >
        Back to Login
      </Link>
    </div>
  );
};

export default ForgotPassword;

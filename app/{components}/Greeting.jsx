"use client";
import React from "react";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Greeting = () => {
  const { user, authError } = React.useContext(AuthContext);
  const { dark } = React.useContext(ThemeContext);
  return (
    <>
      <div
        className={`ml-auto mr-auto mt-20 max-[800px]:mt-24 max-[500px]:mt-28 ${
          dark ? "text-zinc-50" : "text-black"
        }`}
      >
        <h1 className="text-6xl font-bold mb-6 max-[890px]:text-4xl max-[800px]:text-2xl max-[500px]:text-xl">
          <span className={`${dark ? "text-violet-600" : "text-blue-400"}`}>
            Comprehensive Platform
          </span>{" "}
          <br />
          for Secure Bank Logs, Credit Card Management, <br />
          and Financial Insights.
        </h1>
        <p className="mb-6 max-[500px]:text-sm">
          Manage all your financial data in one secure place, with real-time{" "}
          <br />
          tracking, detailed insights, and easy-to-use tools designed for peace
          of mind.
        </p>

        <Link
          className={`${
            dark
              ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
              : "rounded-md border border-blue-400 text-blue-400 bg-transparent px-4 py-3 hover:bg-blue-400 hover:text-zinc-50 hover:border-zinc-50"
          }`}
          href={!user || authError ? `/pages/signin` : `/pages/dashboard`}
        >
          Launch App
        </Link>
      </div>
    </>
  );
};

export default Greeting;

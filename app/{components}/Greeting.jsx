"use client";
import React from "react";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";

const Greeting = () => {
  const { dark } = React.useContext(ThemeContext);
  return (
    <>
      <div
        className={`ml-auto mr-auto mt-20 max-[800px]:mt-24 max-[500px]:mt-28 ${
          dark ? "text-zinc-50" : "text-black"
        }`}
      >
        <h1 className="text-8xl font-bold mb-6 max-[890px]:text-6xl max-[800px]:text-4xl max-[500px]:text-2xl">
          <span className={`${dark ? "text-violet-600" : "text-indigo-400"}`}>
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
          className={`${dark ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black":"rounded-md border border-indigo-400 text-indigo-400 bg-transparent px-4 py-3 hover:bg-indigo-400 hover:text-zinc-50 hover:border-zinc-50"}`}
          href={`/dashboard`}
        >
          Launch App
        </Link>
      </div>
    </>
  );
};

export default Greeting;

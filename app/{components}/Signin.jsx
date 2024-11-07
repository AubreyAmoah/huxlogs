"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";

const Signin = () => {
  const { dark } = React.useContext(ThemeContext);
  return (
    <div className="flex flex-col items-center gap-6 ">
      {dark ? (
        <Image
          className="dark:invert"
          src="/three.svg"
          alt="App logo"
          width={200}
          height={0}
          priority
        />
      ) : (
        <Image
          className="dark:invert"
          src="/two.svg"
          alt="App logo"
          width={200}
          height={0}
          priority
        />
      )}
      <p className={`${dark ? "text-zinc-50" : "text-black"}`}>
        Constant rise of phishing sites impersoninating HUXLOGS is on the rise
        in massive numbers.{" "}
        <Link
          className={`${dark ? "text-violet-600" : "text-blue-400"}`}
          href={""}
        >
          huxlogs.com
        </Link>{" "}
        is our only domain! order logs and clones only from this site to avoid
        being scammed!!
      </p>
      <Link
        className={`${
          dark
            ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
            : "rounded-md border border-blue-400 text-blue-400 bg-transparent px-4 py-3 hover:bg-blue-400 hover:text-zinc-50 hover:border-zinc-50"
        }`}
        href="/api/auth/login?returnTo=/pages/dashboard"
      >
        Login
      </Link>
    </div>
  );
};

export default Signin;

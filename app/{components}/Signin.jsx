"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

const Signin = () => {
  const { dark } = React.useContext(ThemeContext);
  const { onLogin, onSignup } = React.useContext(AuthContext);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = React.useState(false);
  return (
    <div className="flex flex-col items-center gap-6 w-[500px] ml-auto mr-auto text-center p-4 rounded-sm shadow-md max-[600px]:w-full max-[600px]:shadow-none max-[600px]:rounded-none max-[600px]:h-full max-[600px]:p-2 max-[500px]:p-0">
      {dark ? (
        <Image
          src="/three.png"
          alt="App logo"
          width={120}
          height={0}
          priority
        />
      ) : (
        <Image src="/two.png" alt="App logo" width={120} height={0} priority />
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

      <input
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type="email"
        id="email"
        className={`${
          dark
            ? "placeholder-zinc-50 text-white"
            : "placeholder-black/30 text-black"
        } w-full p-3 rounded-lg bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        placeholder="Email..."
        required
      />

      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type="password"
        id="password"
        className={`${
          dark
            ? "placeholder-zinc-50 text-white"
            : "placeholder-black/30 text-black"
        } w-full p-3 rounded-lg bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        placeholder="Password..."
        required
      />
      <button
        onClick={() => {
          isSignup ? onSignup(user) : onLogin(user);
        }}
        className={`${
          dark
            ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
            : "rounded-md border border-blue-400 text-blue-400 bg-transparent px-4 py-3 hover:bg-blue-400 hover:text-zinc-50 hover:border-zinc-50"
        } w-full`}
      >
        {isSignup ? "Create Account" : "Login"}
      </button>

      <div className="flex justify-between items-center w-full max-[360px]:flex-col">
        {isSignup ? (
          <button
            className={`${
              dark ? "text-violet-700" : "text-blue-600"
            } italic text-sm mt-4`}
            onClick={() => setIsSignup(false)}
          >
            Already have an account? Login
          </button>
        ) : (
          <button
            className={`${
              dark ? "text-violet-700" : "text-blue-600"
            } italic text-sm mt-4`}
            onClick={() => setIsSignup(true)}
          >
            Create a new Account
          </button>
        )}

        {isSignup ? (
          ""
        ) : (
          <Link
            className={`${
              dark ? "text-violet-700" : "text-blue-600"
            } italic text-sm mt-4`}
            href={`/pages/reset`}
          >
            forgot password?
          </Link>
        )}
      </div>
    </div>
  );
};

export default Signin;

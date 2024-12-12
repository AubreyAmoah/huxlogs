"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Signin = () => {
  const { dark } = React.useContext(ThemeContext);
  const { onLogin, onSignup, loginLoading, authLoading } =
    React.useContext(AuthContext);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = React.useState(false);

  if (authLoading)
    return (
      <div
        className={`${
          dark ? `bg-black` : `bg-zinc-50`
        } h-screen flex flex-col items-center justify-center`}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className={`${
            dark ? "text-violet-600" : " text-blue-400"
          } animate-spin text-8xl`}
        />
        <span className={`${dark ? "text-violet-600" : " text-blue-400"}`}>
          Loading...
        </span>
      </div>
    );

  if (loginLoading)
    return (
      <div
        className={`${
          dark ? `bg-black` : `bg-zinc-50`
        } h-screen flex flex-col items-center justify-center`}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className={`${
            dark ? "text-violet-600" : " text-blue-400"
          } animate-spin text-8xl`}
        />
        <span className={`${dark ? "text-violet-600" : " text-blue-400"}`}>
          Loading...
        </span>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-6 w-[500px] h-[600px] mt-6 ml-auto mr-auto text-center p-4 rounded-sm shadow-md max-[600px]:mt-2 max-[510px]:w-full max-[510px]:shadow-none max-[510px]:rounded-none max-[510px]:h-full">
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
      <p
        className={`${
          dark ? "text-zinc-50" : "text-black"
        } max-[510px]:text-sm max-[510px]:w-[80%] max-[416px]:text-xs`}
      >
        Constant rise of phishing sites impersoninating HUXLOGS is on the rise
        in massive numbers.{" "}
        <Link
          className={`${dark ? "text-violet-600" : "text-blue-400"}`}
          href={"https://www.huxlogs.com/"}
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
        } w-full p-3 rounded-lg bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 max-[510px]:text-sm max-[510px]:w-[80%] max-[416px]:text-xs`}
        placeholder="Email..."
        required
      />

      <input
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        onKeyDown={(e) =>
          isSignup
            ? e.key === "Enter" && onSignup(user)
            : e.key === "Enter" && onLogin(user)
        }
        type="password"
        id="password"
        className={`${
          dark
            ? "placeholder-zinc-50 text-white"
            : "placeholder-black/30 text-black"
        } w-full p-3 rounded-lg bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400 max-[510px]:text-sm max-[510px]:w-[80%] max-[416px]:text-xs`}
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
        } w-full max-[510px]:text-sm max-[510px]:w-[80%] max-[416px]:text-xs`}
      >
        {isSignup ? "Create Account" : "Login"}
      </button>

      <div className="flex justify-between items-center w-full max-[510px]:text-sm max-[510px]:w-[80%] max-[360px]:flex-col">
        {isSignup ? (
          <button
            className={`${
              dark ? "text-violet-700" : "text-blue-600"
            } italic text-sm mt-4 max-[416px]:`}
            onClick={() => setIsSignup(false)}
          >
            Already have an account? Login
          </button>
        ) : (
          <button
            className={`${
              dark ? "text-violet-700" : "text-blue-600"
            } italic text-sm mt-4 max-[416px]:text-xs`}
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
            } italic text-sm mt-4 max-[416px]:text-xs`}
            href={`/pages/forgotpassword`}
          >
            forgot password?
          </Link>
        )}
      </div>
    </div>
  );
};

export default Signin;

"use client";

import { ThemeContext } from "@/app/context/ThemeContext";
import Signin from "@/app/{components}/Signin";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  const { dark } = React.useContext(ThemeContext);
  return (
    <div
      className={`${
        dark ? `bg-black` : `bg-zinc-50`
      } h-screen flex flex-col items-center justify-center`}
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
      <Signin />
    </div>
  );
};

export default SignIn;

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
      <Signin />
    </div>
  );
};

export default SignIn;

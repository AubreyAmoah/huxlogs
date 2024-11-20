"use client";

import React, { useEffect } from "react";
import Signin from "@/app/{components}/Signin";
import { ThemeContext } from "@/app/context/ThemeContext";
import ThemeToggler from "@/app/{components}/ThemeToggler";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const OTP = () => {
  const { dark } = React.useContext(ThemeContext);
  const { validateLogin, loginLoading } = React.useContext(AuthContext);

  const [input1, setInput1] = React.useState("");
  const [input2, setInput2] = React.useState("");
  const [input3, setInput3] = React.useState("");
  const [input4, setInput4] = React.useState("");

  const [finalInput, setFinalInput] = React.useState("");

  const addInputs = () => {
    const total = input1 + input2 + input3 + input4;
   
    setFinalInput(total);
  };

  const otpValidation = () => {
    addInputs();
    if (finalInput.length >= 4) validateLogin(finalInput);
  };

  return (
    <div
      className={`relative flex flex-col gap-4 items-center justify-center max-[526px]:justify-start min-h-screen w-screen px-8 max-[800px]:px-16 max-[500px]:px-10 ${
        dark ? `bg-black` : `bg-zinc-50`
      }`}
    >
      <ThemeToggler />
      <Link href={"/"} className=" absolute top-2 left-2">
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

      {loginLoading ? (
        <>
          <FontAwesomeIcon
            icon={faSpinner}
            className={`${
              dark ? "text-violet-600" : " text-blue-400"
            } animate-spin text-8xl`}
          />
          <span className={`${dark ? "text-violet-600" : " text-blue-400"}`}>
            Loading...
          </span>
        </>
      ) : (
        <>
          <h1
            className={`${
              dark ? "text-violet-600" : "text-blue-400"
            } text-2xl max-[526px]:mt-20 max-[300px]:text-xl max-[300px]:text-base`}
          >
            ENTER YOUR OTP
          </h1>
          <div className="flex gap-6 max-[300px]:gap-2">
            <input
              onChange={(e) => setInput1(e.target.value)}
              className={`${
                dark
                  ? "border-violet-700 border-2 text-violet-700 caret-violet-700 bg-white"
                  : "border-blue-500 border-2 text-blue-500 caret-blue-500 bg-slate-100"
              } p-4 max-[300px]:p-0 text-8xl max-[526px]:text-4xl max-[310px]:text-sm text-center w-[100px] h-[100px] max-[526px]:w-[50px] max-[526px]:h-[50px] max-[300px]:w-[40px] max-[300px]:h-[40px] rounded-sm shadow-sm`}
              type="text"
              name="input1"
              id="input1"
              maxLength={1}
              required
            />
            <input
              onChange={(e) => setInput2(e.target.value)}
              className={`${
                dark
                  ? "border-violet-700 border-2 text-violet-700 caret-violet-700 bg-white"
                  : "border-blue-500 border-2 text-blue-500 caret-blue-500 bg-slate-100"
              } p-4 max-[300px]:p-0 text-8xl max-[526px]:text-4xl max-[310px]:text-sm text-center w-[100px] h-[100px] max-[526px]:w-[50px] max-[526px]:h-[50px] max-[300px]:w-[40px] max-[300px]:h-[40px] rounded-sm shadow-sm`}
              type="text"
              name="input2"
              id="input2"
              maxLength={1}
              required
            />
            <input
              onChange={(e) => setInput3(e.target.value)}
              className={`${
                dark
                  ? "border-violet-700 border-2 text-violet-700 caret-violet-700 bg-white"
                  : "border-blue-500 border-2 text-blue-500 caret-blue-500 bg-slate-100"
              } p-4 max-[300px]:p-0 text-8xl max-[526px]:text-4xl max-[310px]:text-sm text-center w-[100px] h-[100px] max-[526px]:w-[50px] max-[526px]:h-[50px] max-[300px]:w-[40px] max-[300px]:h-[40px] rounded-sm shadow-sm`}
              type="text"
              name="input3"
              id="input3"
              maxLength={1}
              required
            />
            <input
              onChange={(e) => setInput4(e.target.value)}
              className={`${
                dark
                  ? "border-violet-700 border-2 text-violet-700 caret-violet-700 bg-white"
                  : "border-blue-500 border-2 text-blue-500 caret-blue-500 bg-slate-100"
              } p-4 max-[300px]:p-0 text-8xl max-[526px]:text-4xl max-[310px]:text-sm text-center w-[100px] h-[100px] max-[526px]:w-[50px] max-[526px]:h-[50px] max-[300px]:w-[40px] max-[300px]:h-[40px] rounded-sm shadow-sm`}
              type="text"
              name="input4"
              id="input4"
              maxLength={1}
              required
            />
          </div>

          <p className="mb-6 max-[500px]:text-sm max-[300px]:text-xs text-black">
            Please check your mail for your otp.
          </p>

          <button
            onClick={otpValidation}
            className={`${
              dark
                ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
                : "rounded-md border border-blue-400 text-blue-400 bg-transparent px-4 py-3 hover:bg-blue-400 hover:text-zinc-50 hover:border-zinc-50"
            } w-[500px] max-[500px]:w-full`}
          >
            Validate
          </button>
        </>
      )}
    </div>
  );
};

export default OTP;

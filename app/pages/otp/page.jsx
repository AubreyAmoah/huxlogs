"use client";

import React from "react";
import { useContext, useState, useRef } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const OTP = () => {
  const { dark } = useContext(ThemeContext);
  const { validateLogin, loginLoading } = useContext(AuthContext);

  const [otpInputs, setOtpInputs] = useState(["", "", "", ""]);
  const inputRefs = useRef([]); // To keep track of input refs

  // Handle change for individual inputs
  const handleInputChange = (value, index) => {
    const updatedInputs = [...otpInputs];
    updatedInputs[index] = value.slice(0, 1); // Ensure only 1 character is entered
    setOtpInputs(updatedInputs);

    // Move to next input if a character is entered
    if (value && index < otpInputs.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace for navigating to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpInputs[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 4); // Limit to 4 characters
    const updatedInputs = [...otpInputs];

    for (let i = 0; i < pastedData.length; i++) {
      updatedInputs[i] = pastedData[i];
    }
    setOtpInputs(updatedInputs);

    // Automatically move focus to the next empty input
    const filledIndex = pastedData.length - 1;
    if (filledIndex < otpInputs.length - 1) {
      inputRefs.current[filledIndex + 1]?.focus();
    }
    e.preventDefault(); // Prevent default paste behavior
  };

  // Combine inputs into a single string
  const validateOtp = () => {
    const otp = otpInputs.join("");
    if (otp.length === 4) validateLogin(otp);
  };

  return (
    <div
      className={`relative flex flex-col gap-4 items-center justify-center min-h-screen w-screen px-8 max-[600px]:justify-start ${
        dark ? `bg-black` : `bg-zinc-50`
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

      {loginLoading ? (
        <>
          <FontAwesomeIcon
            icon={faSpinner}
            className={`${
              dark ? "text-violet-600" : " text-blue-400"
            } animate-spin text-7xl max-[600px]:mt-24 max-[600px]:text-2xl`}
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
            } text-2xl max-[600px]:mt-24 max-[600px]:text-xl max-[560px]:text-base max-[420px]:text-sm`}
          >
            ENTER YOUR OTP
          </h1>
          <div className="flex gap-6 max-[280px]:gap-2 max-[230px]:flex-col">
            {otpInputs.map((value, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
                type="number"
                value={value}
                onChange={(e) => handleInputChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : null} // Handle paste only on the first input
                className={`appearance-none ${
                  dark
                    ? "border-violet-700 border-2 text-violet-700 caret-violet-700 bg-white"
                    : "border-blue-500 border-2 text-blue-500 caret-blue-500 bg-slate-100"
                } p-4 text-7xl text-center w-[100px] h-[100px] rounded-sm shadow-sm max-[600px]:w-[80px] max-[600px]:h-[80px] max-[600px]:text-5xl max-[560px]:w-[50px] max-[560px]:h-[50px] max-[560px]:text-2xl max-[420px]:w-[45px] max-[420px]:h-[45px] max-[420px]:text-xs max-[420px]:p-2`}
                maxLength={1}
                required
              />
            ))}
          </div>

          <button
            onClick={validateOtp}
            className={`${
              dark
                ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black"
                : "rounded-md border border-blue-400 text-blue-400 bg-transparent px-4 py-3 hover:bg-blue-400 hover:text-zinc-50"
            } w-[500px] max-[600px]:w-[75%] max-[560px]:px-2 max-[560px]:py-2 max-[560px]:text-sm max-[420px]:text-xs`}
          >
            Validate
          </button>
        </>
      )}
    </div>
  );
};

export default OTP;

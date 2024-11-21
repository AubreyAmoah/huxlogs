"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ThemeContext } from "@/app/context/ThemeContext";
import axios from "axios";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const PasswordResetForm = () => {
  const { dark } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePassword = async () => {
    console.log(token);
    if (!password) {
      return toast.error("Please provide a password");
    }
    try {
      setLoading(true);
      await axios.post("/api/me/resetpassword", { password, token });
      toast.success("Password changed! Log in now.");
      router.push("/pages/dashboard");
    } catch (error) {
      console.error(error.response?.data || error);
      toast.error(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (!urlToken) {
      toast.error("Invalid token. Redirecting...");
      router.push("/");
      return;
    }
    const decodedToken = decodeURIComponent(urlToken).replace(/ /g, "+");
    console.log(decodedToken);
    setToken(decodedToken);
  }, [searchParams, router]);

  return (
    <div
      className={`${
        dark ? "bg-black text-[#e7eaee]" : "bg-[#E7EAEE] text-black"
      } flex flex-col items-center justify-center h-screen`}
    >
      <div className="flex flex-col gap-4 items-center w-[300px] max-[400px]:w-full">
        <label
          htmlFor="password"
          className={`${dark ? "text-violet-700" : "text-blue-600"}`}
        >
          Enter your new password
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          className={`${
            dark
              ? "placeholder-zinc-50 text-white"
              : "placeholder-black/30 text-black"
          } w-full p-3 rounded-lg bg-white/30 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          type="password"
          placeholder="password"
          id="password"
        />
        <button
          onClick={changePassword}
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
            "Reset Password"
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordResetForm;

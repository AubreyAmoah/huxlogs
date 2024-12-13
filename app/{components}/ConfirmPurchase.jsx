"use client";
import React from "react";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faClose,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { handlePurchase } from "../calls/apiCalls";

const ConfirmPurchase = ({
  loading,
  setLoading,
  visible,
  setVisible,
  getCartItems,
}) => {
  const { dark } = React.useContext(ThemeContext);
  const confirmPurchase = async () => {
    await handlePurchase(setLoading);
    setVisible(false);
    getCartItems();
  };
  return (
    <div
      className={`${
        visible
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-h-screen bg-[#00000079] flex flex-col items-center justify-center max-[600px]:justify-start"
          : "hidden"
      }`}
    >
      <div
        className={`${
          dark ? "bg-[#333] text-zinc-50" : "bg-zinc-50 text-black relative"
        } p-6 max-h-[500px] w-[600px] rounded-md shadow-md max-[600px]:w-full max-[600px]:h-screen overflow-auto max-[600px]:rounded-none`}
      >
        <FontAwesomeIcon icon={faCircleQuestion} />
        <p className="max-[600px]:mt-6">
          Scan the QR code or enter the address given manually on any platform
          of your choice to complete transfer of funds. Once transfer completed
          take a screenshot and send to{" "}
          <a
            className={`${dark ? "text-violet-600" : "text-blue-400"}`}
            href="mailto:huxlogs@gmail.com"
            target="_blank"
          >
            huxlogs@gmail.com
          </a>
        </p>

        <p className="text-red-600 font-bold mt-6">
          Beware!!! <br /> Take note of the network before transferring funds
          else you will loose your funds and we will not claim responsibility
          for that
        </p>

        <p className="text-red-600 font-bold mt-6">
          Please pay the exact amount as seen on the site. Over paying
          won&apos;t be refunded. We won&apos;t release your product to you if
          you under pay also
        </p>

        <button
          onClick={confirmPurchase}
          className={`${
            dark
              ? "rounded-md border border-violet-600 text-zinc-50 bg-violet-600 px-4 py-3 hover:bg-violet-800 hover:text-zinc-50"
              : "rounded-md border border-blue-400 text-zinc-50 bg-blue-400 px-4 py-3 hover:bg-blue-600 hover:text-zinc-50"
          } w-full mt-6 text-center`}
        >
          {loading ? (
            <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
          ) : (
            "Click here to confirm purchase"
          )}
        </button>

        <button
          onClick={() => setVisible(false)}
          className={`${
            dark ? "text-zinc-50" : "text-black"
          } absolute top-4 right-8 max-[600px]:top-[80%] max-[600px]:left-1/2 max-[600px]:-translate-x-1/2 text-2xl flex flex-col items-center justify-center`}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
    </div>
  );
};

export default ConfirmPurchase;

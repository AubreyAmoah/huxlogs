"use client";

import { ThemeContext } from "@/app/context/ThemeContext";
import DashboardNav from "@/app/{components}/DashboardNav";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

const Cart = () => {
  const { dark } = React.useContext(ThemeContext);

  const [isBitcoin, setIsBitcoin] = React.useState(true);

  const toggleCurrency = () => {
    setIsBitcoin(!isBitcoin);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b p-6 max-[450px]:p-4 max-[400px]:p-2 max-[320px]:p-0 ${
        dark ? "bg-black text-zinc-50" : "bg-zinc-50 text-black"
      }`}
    >
      {/* Header Navigation */}
      <h1
        className={`${
          dark ? "text-violet-600" : "text-blue-400"
        } mb-8 capitalize text-2xl max-[320px]:text-center max-[320px]:text-xl max-[320px]:pt-4`}
      >
        checkout
      </h1>

      <div className={` flex flex-col lg:flex-row gap-6 max-[320px]:gap-0`}>
        {/* Payment Details Form */}
        <div
          className={`${
            dark ? "bg-[#252525]" : "bg-white"
          } rounded-lg shadow-lg p-6 w-full lg:w-1/2 max-[320px]:rounded-none`}
        >
          <h3 className={`text-lg font-semibold mb-4`}>Payment details</h3>
          <div className="w-full flex flex-col gap-4 items-center">
            {isBitcoin ? (
              <Image
                src="/bitcoin.jpeg"
                alt="App logo"
                width={350}
                height={0}
                priority
              />
            ) : (
              <Image
                src="/litecoin.jpeg"
                alt="App logo"
                width={350}
                height={0}
                priority
              />
            )}
          </div>

          <div className="text-center flex gap-2 items-center w-full mt-4 justify-center max-[450px]:text-sm max-[406px]:text-xs max-[320px]:flex-wrap">
            {isBitcoin ? (
              <span className="">
                bc1qf5s3ykvmsk2dh5ua8rkfacx77097vml05hxwem
              </span>
            ) : (
              <span className="">LX1vGLx3W7ZQPX832tyRystvXVTp8HtrUz</span>
            )}
            <button>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>

        {/* Shopping Cart Summary */}
        <div
          className={`${
            dark ? "bg-[#252525]" : "bg-white"
          } rounded-lg shadow-lg p-6 w-full lg:w-1/2 max-[320px]:rounded-none`}
        >
          <h3 className="text-lg font-semibold mb-4">Shopping cart</h3>
          <div className="flex items-center space-x-4 mb-6">
            <img
              src="/tv-image.png"
              alt="65-inch 4K UHD Smart TV"
              className="w-20 h-20 object-cover"
            />
            <div className="flex-1">
              <p className="font-medium">65-inch 4K UHD Smart TV</p>
              <div className="flex items-center space-x-2 mt-2">
                <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                  -
                </button>
                <span className="px-3 py-1 border rounded"></span>
                <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                  +
                </button>
              </div>
              <p className="text-gray-500 mt-2"> €</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p>Subtotal: €</p>
              <p className="font-bold mt-2">Order Total: €</p>
            </div>
          </div>

          <button
            className={`${
              dark
                ? "rounded-md border border-violet-600 text-zinc-50 bg-violet-600 px-4 py-3 hover:bg-violet-800 hover:text-zinc-50"
                : "rounded-md border border-blue-400 text-zinc-50 bg-blue-400 px-4 py-3 hover:bg-blue-600 hover:text-zinc-50"
            }
            } w-full mt-6`}
          >
            Confirm payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

"use client";

import { ThemeContext } from "@/app/context/ThemeContext";
import { AuthContext } from "@/app/context/AuthContext";
import {
  faBitcoinSign,
  faCopy,
  faFileInvoiceDollar,
  faHome,
  faLitecoinSign,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmPurchase from "@/app/{components}/ConfirmPurchase";

const Cart = () => {
  const { dark } = React.useContext(ThemeContext);

  const [loading, setLoading] = React.useState(false);
  const [isBitcoin, setIsBitcoin] = React.useState(true);
  const [isSolana, setSolana] = React.useState(false);
  const [isLitecoin, setLitecoin] = React.useState(false);
  const [isUsdt, setUsdt] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  const handleCopy = () => {
    const address = isBitcoin
      ? "bc1qf5s3ykvmsk2dh5ua8rkfacx77097vml05hxwem"
      : isSolana
      ? "6pj2bqQHxvs1u5gq9jQ7H4DXvFUjaARougCv726WyLtY"
      : isLitecoin
      ? "LX1vGLx3W7ZQPX832tyRystvXVTp8HtrUz"
      : isUsdt
      ? "TFcFTaGGA5DD8CThXzqyaTYQ9yCoaKpQBE"
      : address;
    navigator.clipboard
      .writeText(address)
      .then(() => {
        toast.success("Address copied");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const toggleCurrency = () => {
    if (isBitcoin) {
      setIsBitcoin(false);
      setSolana(true);
      setLitecoin(false);
      setUsdt(false);
    }

    if (isSolana) {
      setIsBitcoin(false);
      setSolana(false);
      setLitecoin(true);
      setUsdt(false);
    }

    if (isLitecoin) {
      setIsBitcoin(false);
      setSolana(false);
      setLitecoin(false);
      setUsdt(true);
    }

    if (isUsdt) {
      setIsBitcoin(true);
      setSolana(false);
      setLitecoin(false);
      setUsdt(false);
    }
  };

  const fetchCartItems = async () => {
    // Renamed to avoid conflicts
    try {
      setLoading(true);
      const res = await axios.get("/api/products/showcart");
      setCartItems(res.data.cart || []); // Ensure cart is an array, fallback to []
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      setLoading(true);
      const res = await axios.delete("/api/products/deletecartitem", {
        data: { id },
      });
      if (res.status === 200) toast.success("Item removed");
      fetchCartItems();
    } catch (error) {
      console.log(error);
      toast.error("Item could not be removed");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b p-6 max-[450px]:p-4 max-[400px]:p-2 max-[320px]:p-0 ${
        dark ? "bg-[#191F28] text-zinc-50" : "bg-zinc-50 text-black"
      } relative`}
    >
      {/* Header Navigation */}
      <h1
        className={`${
          dark ? "text-violet-600" : "text-blue-400"
        } mb-8 capitalize text-xl max-[320px]:text-center max-[320px]:text-xl max-[320px]:pt-4`}
      >
        <div className="flex gap-4 items-center">
          <Link href={"/pages/dashboard"}>
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link href={"/pages/orders"}>
            <FontAwesomeIcon icon={faFileInvoiceDollar} />
          </Link>
        </div>
      </h1>

      <div className={`flex flex-col lg:flex-row gap-6 max-[320px]:gap-0`}>
        {/* Payment Details Form */}
        <div
          className={`${
            dark ? "bg-[#232c38]" : "bg-white"
          } rounded-lg shadow-lg p-6 w-full lg:w-1/2 max-[320px]:rounded-none`}
        >
          <div className="flex flex-col w-full items-center mb-2 max-[530px]:text-sm">
            <h3
              className={`text-lg font-semibold mb-4 max-[530px]:text-sm max-[430px]:text-xs`}
            >
              Click the button below to switch between payments
            </h3>
            <button
              onClick={toggleCurrency}
              className={`${
                dark
                  ? "rounded-md border border-violet-600 text-zinc-50 bg-violet-600 px-4 py-3 max-[530px]:px-2 max-[530px]:py-2 hover:bg-violet-800 hover:text-zinc-50"
                  : "rounded-md border border-blue-400 text-zinc-50 bg-blue-400 px-4 py-3 max-[530px]:px-2 max-[530px]:py-2 hover:bg-blue-600 hover:text-zinc-50"
              }`}
            >
              change currency
            </button>
            <span>
              current currency:{" "}
              {isBitcoin
                ? "BTC <br /> <p>send only to this address via the Bitcoin network. Sending any other token will result in loss of assets.</p>"
                : isLitecoin
                ? "LTC <br /> <p>send only Litecoin (LTC) to this address. Sending any other token will result in loss of assets.</p>"
                : isSolana
                ? "SOL"
                : isUsdt
                ? "USDT <br /> <p>send only Tether (Tron/TRC 20) to this address via BEP-20 network. Sending any other token will result in loss of assets.</p>"
                : "N/A"}
            </span>
          </div>

          <div className="w-full flex flex-col gap-4 items-center">
            {isBitcoin ? (
              <Image
                src="/bitcoin.jpeg"
                alt="Bitcoin logo"
                width={300}
                height={0}
                priority
              />
            ) : isSolana ? (
              <Image
                src="/solana.jpeg"
                alt="Solana logo"
                width={300}
                height={0}
                priority
              />
            ) : isLitecoin ? (
              <Image
                src="/litecoin.jpeg"
                alt="Litecoin logo"
                width={300}
                height={0}
                priority
              />
            ) : isUsdt ? (
              <Image
                src="/usdt.jpeg"
                alt="Litecoin logo"
                width={300}
                height={0}
                priority
              />
            ) : (
              <Image src="" alt="logo" width={300} height={0} priority />
            )}
          </div>

          <div className="text-center flex gap-2 items-center w-full mt-4 justify-center text-xl max-[406px]:text-base max-[320px]:flex-wrap">
            {isBitcoin ? (
              <span className="overflow-hidden max-[560px]:text-ellipsis whitespace-nowrap w-[240px] max-[560px]:w-[180px]">
                bc1qf5s3ykvmsk2dh5ua8rkfacx77097vml05hxwem
              </span>
            ) : isSolana ? (
              <span className="overflow-hidden max-[560px]:text-ellipsis whitespace-nowrap w-[240px] max-[560px]:w-[180px]">
                6pj2bqQHxvs1u5gq9jQ7H4DXvFUjaARougCv726WyLtY
              </span>
            ) : isLitecoin ? (
              <span className="overflow-hidden max-[560px]:text-ellipsis whitespace-nowrap w-[240px] max-[560px]:w-[180px]">
                LX1vGLx3W7ZQPX832tyRystvXVTp8HtrUz
              </span>
            ) : isUsdt ? (
              <span className="overflow-hidden max-[560px]:text-ellipsis whitespace-nowrap w-[240px] max-[560px]:w-[180px]">
                TFcFTaGGA5DD8CThXzqyaTYQ9yCoaKpQBE
              </span>
            ) : (
              ""
            )}
            <button onClick={handleCopy}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
        </div>

        {/* Shopping Cart Summary */}
        <div
          className={`${
            dark ? "bg-[#232c38]" : "bg-white"
          } rounded-lg shadow-lg p-6 w-full lg:w-1/2 max-[320px]:rounded-none`}
        >
          <h3 className="text-lg font-semibold mb-4">Shopping cart</h3>
          <div className=" overflow-auto h-[45%]">
            {loading ? (
              <FontAwesomeIcon className=" animate-spin" icon={faSpinner} />
            ) : cartItems.length > 0 ? (
              cartItems.map((cartItem) => (
                <div
                  key={cartItem.itemID}
                  className="flex items-center justify-between mb-4"
                >
                  <div className=" w-[70%]">
                    <h4 className="font-bold">{cartItem.name}</h4>
                    <p>{cartItem.description}</p>
                  </div>
                  <div>
                    <p>Price: ${cartItem.price}</p>
                  </div>
                  <button
                    onClick={() => deleteCartItem(cartItem.itemID)}
                    className=" text-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>

          <div className="space-y-4 mt-6">
            <div>
              <p className="font-bold mt-2">
                Order Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {cartItems.length > 0 ? (
            <button
              onClick={() => setVisible(true)}
              className={`${
                dark
                  ? "rounded-md border border-violet-600 text-zinc-50 bg-violet-600 px-4 py-3 hover:bg-violet-800 hover:text-zinc-50"
                  : "rounded-md border border-blue-400 text-zinc-50 bg-blue-400 px-4 py-3 hover:bg-blue-600 hover:text-zinc-50"
              } w-full mt-6`}
            >
              Confirm payment
            </button>
          ) : (
            <p></p>
          )}
          <h1 className="text-xl mt-2 max-[600px]:text-base text-red-600 animate-pulse">
            Manual Payment
          </h1>
          <p className="mt-2 max-[600px]:text-sm">
            You can make a manual payment to cover an outstanding balance.
            <br />
            Contact{" "}
            <a className="text-green-600" href="https://t.me/huxlogs_support">
              admin
            </a>{" "}
            to make a manual payment
          </p>
        </div>
      </div>

      <ConfirmPurchase
        loading={loading}
        setLoading={setLoading}
        visible={visible}
        setVisible={setVisible}
        getCartItems={fetchCartItems}
      />
    </div>
  );
};

export default Cart;

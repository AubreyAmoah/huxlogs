"use client";

import React from "react";
import { ThemeContext } from "@/app/context/ThemeContext";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightFromBracket,
  faShoppingCart,
  faCreditCard,
  faBank,
  faTools,
  faFileInvoiceDollar,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { faCcAmazonPay, faPaypal } from "@fortawesome/free-brands-svg-icons";

const SideNav = ({ setFamily, sidebarOpen, setSidberOpen }) => {
  const { dark } = React.useContext(ThemeContext);
  const { user, onLogout } = React.useContext(AuthContext);
  const menuItems = [
    {
      label: "Home",
      icon: faHome,
      onClick: () => {
        setFamily("");
        setSidberOpen(false);
      },
      link: "/pages/dashboard",
    },
    {
      label: "Bank Logs",
      icon: faBank,
      onClick: () => {
        setFamily("banklogs");
        setSidberOpen(false);
      },
    },
    {
      label: "Cards/Linkables",
      icon: faCreditCard,
      onClick: () => {
        setFamily("creditcards");
        setSidberOpen(false);
      },
    },
    {
      label: "PayPal Logs",
      icon: faPaypal,
      onClick: () => {
        setFamily("paypal");
        setSidberOpen(false);
      },
    },
    {
      label: "CashApp Logs",
      icon: faCcAmazonPay,
      onClick: () => {
        setFamily("cashapp");
        setSidberOpen(false);
      },
    },
    {
      label: "Tools",
      icon: faTools,
      onClick: () => {
        setFamily("tools");
        setSidberOpen(false);
      },
    },
    { label: "Cart", icon: faShoppingCart, link: "/pages/cart" },
    { label: "Orders", icon: faFileInvoiceDollar, link: "/pages/orders" },
    { label: "Logout", icon: faRightFromBracket, onClick: onLogout },
  ];

  return (
    <aside
      className={`${
        sidebarOpen
          ? "w-64 transform translate-x-0 max-[970px]:absolute max-[970px]:inset-0 max-[970px]:top-0 max-[970px]:left-0 max-[970px]:shadow-md max-[970px]:h-full"
          : "w-16 transform max-[700px]:-translate-x-full max-[700px]:hidden"
      } bg-gradient-to-b ${
        dark ? "from-violet-800 to-black" : "from-blue-300 to-blue-600"
      } h-screen overflow-auto transition-all duration-300 ease-in-out flex flex-col items-start py-6 z-40`}
    >
      {/* Logo */}
      <div className="flex items-center px-4 mb-6 mt-4">
        <Image
          src={dark ? "/one.png" : "/two.png"}
          alt="App logo"
          width={sidebarOpen ? 100 : 50}
          height={0}
        />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 w-full">
        {menuItems.map((item) => {
          if (item.label === "Bank Logs") {
            return (
              <div key={item.label} className="w-full">
                {/* Category Dropdown Toggle */}
                <button
                  onClick={item.onClick}
                  className={`flex items-center w-full px-4 py-3 text-lg ${
                    dark ? "text-zinc-50" : "text-white"
                  } hover:bg-opacity-30 hover:bg-black/10`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                  {sidebarOpen && (
                    <span className="flex items-center justify-between w-full">
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          }

          if (item.label === "Cards/Linkables") {
            return (
              <div key={item.label} className="w-full">
                {/* Category Dropdown Toggle */}
                <button
                  onClick={item.onClick}
                  className={`flex items-center w-full px-4 py-3 text-lg ${
                    dark ? "text-zinc-50" : "text-white"
                  } hover:bg-opacity-30 hover:bg-black/10`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                  {sidebarOpen && (
                    <span className="flex items-center justify-between w-full">
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          }

          if (item.label === "PayPal Logs") {
            return (
              <div key={item.label} className="w-full">
                {/* Category Dropdown Toggle */}
                <button
                  onClick={item.onClick}
                  className={`flex items-center w-full px-4 py-3 text-lg ${
                    dark ? "text-zinc-50" : "text-white"
                  } hover:bg-opacity-30 hover:bg-black/10`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                  {sidebarOpen && (
                    <span className="flex items-center justify-between w-full">
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          }

          if (item.label === "CashApp Logs") {
            return (
              <div key={item.label} className="w-full">
                {/* Category Dropdown Toggle */}
                <button
                  onClick={item.onClick}
                  className={`flex items-center w-full px-4 py-3 text-lg ${
                    dark ? "text-zinc-50" : "text-white"
                  } hover:bg-opacity-30 hover:bg-black/10`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                  {sidebarOpen && (
                    <span className="flex items-center justify-between w-full">
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          }

          if (item.label === "Tools") {
            return (
              <div key={item.label} className="w-full">
                {/* Category Dropdown Toggle */}
                <button
                  onClick={item.onClick}
                  className={`flex items-center w-full px-4 py-3 text-lg ${
                    dark ? "text-zinc-50" : "text-white"
                  } hover:bg-opacity-30 hover:bg-black/10`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                  {sidebarOpen && (
                    <span className="flex items-center justify-between w-full">
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            );
          }

          if (item.label === "Logout") {
            return (
              <button
                key={item.label}
                onClick={onLogout}
                className={`flex items-center w-full px-4 py-3 text-lg ${
                  dark ? "text-zinc-50" : "text-white"
                } hover:bg-opacity-30 hover:bg-black/10`}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-3" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          }

          if (item.label === "Home") {
            return (
              <Link
                onClick={item.onClick}
                href={item.link || "#"}
                key={item.label}
                className={`flex items-center w-full px-4 py-3 text-lg ${
                  dark ? "text-zinc-50" : "text-white"
                } hover:bg-opacity-30 hover:bg-black/10`}
              >
                <FontAwesomeIcon icon={item.icon} className="mr-3" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          }

          return (
            <Link
              href={item.link || "#"}
              key={item.label}
              className={`flex items-center w-full px-4 py-3 text-lg ${
                dark ? "text-zinc-50" : "text-white"
              } hover:bg-opacity-30 hover:bg-black/10`}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-3" />
              {sidebarOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideNav;

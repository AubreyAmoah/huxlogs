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
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { faCcAmazonPay, faPaypal } from "@fortawesome/free-brands-svg-icons";

const SideNav = ({ setFamily, sidebarOpen }) => {
  const { dark } = React.useContext(ThemeContext);
  const { user, onLogout } = React.useContext(AuthContext);
  const menuItems = [
    {
      label: "Home",
      icon: faHome,
      onClick: () => setFamily(""),
      link: "/pages/dashboard",
    },
    { label: "Bank Logs", icon: faBank, onClick: () => setFamily("banklogs") },
    {
      label: "Cards/Linkables",
      icon: faCreditCard,
      onClick: () => setFamily("creditcards"),
    },
    {
      label: "Spammed Accounts 1",
      icon: faPaypal,
      onClick: () => setFamily("paypal"),
    },
    {
      label: "Spammed Accounts 2",
      icon: faCcAmazonPay,
      onClick: () => setFamily("cashapp"),
    },
    { label: "Tools", icon: faTools, onClick: () => setFamily("tools") },
    { label: "Cart", icon: faShoppingCart, link: "/pages/cart" },
    { label: "Orders", icon: faCreditCard, link: "/pages/orders" },
    { label: "Logout", icon: faRightFromBracket, onClick: onLogout },
  ];

  return (
    <aside
      className={`${
        sidebarOpen
          ? "w-64 max-[970px]:absolute max-[970px]:top-0 max-[970px]:left-0"
          : "w-16 max-[700px]:hidden"
      } bg-gradient-to-b ${
        dark ? "from-violet-800 to-black" : "from-blue-300 to-blue-600"
      } h-screen overflow-auto transition-all duration-300 flex flex-col items-start py-6`}
    >
      {/* Logo */}
      <div className="flex items-center px-4 mb-6">
        <Image
          src={dark ? "/three.png" : "/two.png"}
          alt="App logo"
          width={sidebarOpen ? 150 : 50}
          height={50}
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

          if (item.label === "Spammed Accounts 1") {
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

          if (item.label === "Spammed Accounts 2") {
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

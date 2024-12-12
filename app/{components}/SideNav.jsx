"use client";

import React, { useEffect, useState } from "react";
import Signin from "@/app/{components}/Signin";
import { ThemeContext } from "@/app/context/ThemeContext";
import ThemeToggler from "@/app/{components}/ThemeToggler";
import DashboardNav from "@/app/{components}/DashboardNav";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRightFromBracket,
  faList,
  faCaretDown,
  faCaretUp,
  faShoppingCart,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const SideNav = ({
  categories,
  subCategories,
  categoryDropdowns,
  subCategoryDropdowns,
  setCategoryDropdowns,
  setSubCategoryDropdowns,
  sidebarOpen,
  setSidebarOpen,
  setActiveCategory,
  setActiveSubCategory,
}) => {
  const { dark } = React.useContext(ThemeContext);
  const { user, onLogout } = React.useContext(AuthContext);
  const menuItems = [
    { label: "Home", icon: faHome, link: "/pages/dashboard" },
    { label: "Bank Logs", icon: faList },
    { label: "Credit Card Logs", icon: faList },
    { label: "Paypal/Cashapp Logs", icon: faList },
    { label: "Tools", icon: faList },
    { label: "Cart", icon: faShoppingCart, link: "/pages/cart" },
    { label: "Orders", icon: faCreditCard, link: "/pages/orders" },
    { label: "Logout", icon: faRightFromBracket, onClick: onLogout },
  ];

  // Toggle a specific category's dropdown
  const toggleCategoryDropdown = (categoryId) => {
    setCategoryDropdowns((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle the specific category dropdown
    }));
  };

  // Toggle a specific subcategory's dropdown
  const toggleSubCategoryDropdown = (categoryId) => {
    setSubCategoryDropdowns((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // Toggle the specific subcategory dropdown
    }));
  };
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
          if (item.label === "Categories") {
            return (
              <div key={item.label} className="w-full">
                {/* Category Dropdown Toggle */}
                <button
                  onClick={() => {
                    toggleCategoryDropdown(item.label);
                    setSidebarOpen(true);
                  }}
                  className={`flex items-center w-full px-4 py-3 text-lg ${
                    dark ? "text-zinc-50" : "text-white"
                  } hover:bg-opacity-30 hover:bg-black/10`}
                >
                  <FontAwesomeIcon icon={item.icon} className="mr-3" />
                  {sidebarOpen && (
                    <span className="flex items-center justify-between w-full">
                      {item.label}
                      <FontAwesomeIcon
                        icon={
                          categoryDropdowns[item.label]
                            ? faCaretUp
                            : faCaretDown
                        }
                      />
                    </span>
                  )}
                </button>

                {/* Categories Dropdown */}
                {categoryDropdowns[item.label] && (
                  <div className="ml-4">
                    {categories.map((category) => (
                      <div
                        key={category._id}
                        onClick={() => setActiveCategory(category.name)}
                        className={`flex items-center w-full px-1 text-sm ${
                          dark ? "text-zinc-50" : "text-white"
                        }`}
                      >
                        <div key={item.label} className="w-full">
                          {/* SubCategory Dropdown Toggle */}
                          <button
                            onClick={() =>
                              toggleSubCategoryDropdown(category._id)
                            }
                            className={`flex items-center w-full px-4 py-3 text-lg ${
                              dark ? "text-zinc-50" : "text-white"
                            } hover:bg-opacity-30 hover:bg-black/10`}
                          >
                            {sidebarOpen && (
                              <span className="flex items-center justify-between w-full">
                                {category.name}
                                <FontAwesomeIcon
                                  icon={
                                    subCategoryDropdowns[category._id]
                                      ? faCaretUp
                                      : faCaretDown
                                  }
                                />
                              </span>
                            )}
                          </button>

                          {/* SubCategories Dropdown */}
                          {subCategoryDropdowns[category._id] && (
                            <div className="ml-4">
                              {subCategories.map((subcategory) => (
                                <button
                                  key={subcategory._id}
                                  onClick={() =>
                                    setActiveSubCategory(subcategory.name)
                                  }
                                  className={`flex items-center w-full px-4 py-2 text-xl ${
                                    dark ? "text-zinc-50" : "text-white"
                                  } hover:bg-opacity-30 hover:bg-black/10`}
                                >
                                  {subcategory.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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

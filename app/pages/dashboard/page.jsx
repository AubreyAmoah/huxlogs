"use client";

import React, { useEffect, useState } from "react";
import Signin from "@/app/{components}/Signin";
import { ThemeContext } from "@/app/context/ThemeContext";
import ThemeToggler from "@/app/{components}/ThemeToggler";
import DashboardNav from "@/app/{components}/DashboardNav";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faWarning,
  faHome,
  faChartBar,
  faCog,
  faBars,
  faRightFromBracket,
  faList,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import {
  getCategories,
  getProducts,
  getSubCategories,
} from "@/app/calls/apiCalls";

const Dashboard = () => {
  const { dark } = React.useContext(ThemeContext);
  const { user, authLoading, authError, onLogout } =
    React.useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [categoryDropdown, setCategoryDropdown] = useState(false); // For toggling category dropdown
  const [subCategoryDropdown, setSubCategoryDropdown] = useState(false); // For toggling subcategory dropdown

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    getCategories(setCategories);
  }, []);

  useEffect(() => {
    if (activeCategory) {
      getSubCategories(activeCategory, setSubCategories);
      setSubCategoryDropdown(false); // Reset subcategory dropdown when new category is selected
    }
  }, [activeCategory]);

  useEffect(() => {
    if (activeSubCategory) {
      getProducts(activeSubCategory, setProducts);
    }
  }, [activeSubCategory]);

  const menuItems = [
    { label: "Home", icon: faHome, link: "/home" },
    { label: "Categories", icon: faList },
    { label: "Settings", icon: faCog, link: "/settings" },
    { label: "Logout", icon: faRightFromBracket, onClick: onLogout },
  ];

  if (authLoading)
    return (
      <div
        className={`${
          dark ? `bg-black` : `bg-zinc-50`
        } h-screen flex flex-col items-center justify-center`}
      >
        <FontAwesomeIcon
          icon={faSpinner}
          className={`${
            dark ? "text-violet-600" : " text-blue-400"
          } animate-spin text-8xl`}
        />
        <span className={`${dark ? "text-violet-600" : " text-blue-400"}`}>
          Loading...
        </span>
      </div>
    );

  return (
    <div
      className={`relative flex min-h-screen max-[700px]:flex-col ${
        dark ? `bg-black` : `bg-zinc-50`
      }`}
    >
      <ThemeToggler />

      {/* Toggle Button */}
      <button
        onClick={() => {
          toggleSidebar();
          setCategoryDropdown(false);
        }}
        className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md w-[40px] h-[40px]"
      >
        <FontAwesomeIcon icon={faBars} className="text-black" />
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64 max-[700px]:w-full" : "w-16 max-[700px]:hidden"
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
                      setCategoryDropdown(!categoryDropdown);
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
                          icon={categoryDropdown ? faCaretUp : faCaretDown}
                        />
                      </span>
                    )}
                  </button>

                  {/* Categories Dropdown */}
                  {categoryDropdown && (
                    <div className="ml-4">
                      {categories.map((category) => (
                        <button
                          key={category._id}
                          onClick={() => setActiveCategory(category.name)}
                          className={`flex items-center w-full px-1 text-sm ${
                            dark ? "text-zinc-50" : "text-white"
                          }`}
                        >
                          <div key={item.label} className="w-full">
                            {/* SubCategory Dropdown Toggle */}
                            <button
                              onClick={() => {
                                setSubCategoryDropdown(!subCategoryDropdown);
                                setSidebarOpen(true);
                              }}
                              className={`flex items-center w-full px-4 py-3 text-lg ${
                                dark ? "text-zinc-50" : "text-white"
                              } hover:bg-opacity-30 hover:bg-black/10`}
                            >
                              {sidebarOpen && (
                                <span className="flex items-center justify-between w-full">
                                  {category.name}
                                  <FontAwesomeIcon
                                    icon={
                                      subCategoryDropdown
                                        ? faCaretUp
                                        : faCaretDown
                                    }
                                  />
                                </span>
                              )}
                            </button>

                            {/* SubCategories Dropdown */}
                            {subCategoryDropdown && (
                              <div className="ml-4">
                                {subCategories.map((subcategory) => (
                                  <button
                                    key={subcategory._id}
                                    onClick={() =>
                                      setActiveCategory(subcategory.name)
                                    }
                                    className={`flex items-center w-full px-4 py-2 text-sm ${
                                      dark ? "text-zinc-50" : "text-white"
                                    } hover:bg-opacity-30 hover:bg-black/10`}
                                  >
                                    {subcategory.name}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </button>
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        <header
          className={`flex justify-between items-center ${
            dark ? "text-zinc-50" : "text-black"
          }`}
        >
          <h1>Dashboard</h1>
        </header>

        <div>
          {/* Content for Products */}
          {activeSubCategory && (
            <div>
              <h2 className="mt-6 text-lg font-bold">Products</h2>
              <ul className="list-disc ml-6">
                {products.map((product) => (
                  <li key={product.id}>{product.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

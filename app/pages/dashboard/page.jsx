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
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

const Dashboard = () => {
  const { dark } = React.useContext(ThemeContext);
  const { user, authLoading, authError, onLogout } =
    React.useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    { label: "Home", icon: faHome, link: "/home" },
    { label: "Analytics", icon: faChartBar, link: "/analytics" },
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
  // if (authError)
  //   return (
  //     <div
  //       className={`${
  //         dark ? `bg-black` : `bg-zinc-50`
  //       } h-screen flex flex-col items-center justify-center`}
  //     >
  //       <FontAwesomeIcon
  //         icon={faWarning}
  //         className="text-red-600 text-8xl animate-pulse"
  //       />
  //       <span className={`${dark ? "text-violet-600" : " text-blue-400"}`}>
  //         {authError.message}
  //       </span>
  //     </div>
  //   );

  if (!user || authError) {
    return (
      <div
        className={`${
          dark ? `bg-black` : `bg-zinc-50`
        } h-screen flex flex-col items-center justify-center`}
      >
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
        <Signin />
      </div>
    );
  }
  return (
    <div
      className={`relative flex min-h-screen ${
        dark ? `bg-black` : `bg-zinc-50`
      }`}
    >
      <ThemeToggler />

      {/* Sidebar */}
      <aside
        className={`${sidebarOpen ? "w-64" : "w-16"} bg-gradient-to-b ${
          dark ? "from-violet-800 to-black" : "from-blue-300 to-blue-600"
        } h-screen transition-all duration-300 flex flex-col items-start py-6`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md w-[40px] h-[40px]"
        >
          <FontAwesomeIcon icon={faBars} className="text-black" />
        </button>

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
                href={item.link}
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
          className={`flex justify-between items-center mb-6 ${
            dark ? "text-zinc-50" : "text-black"
          }`}
        >
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <Link
            href="/profile"
            className={`${
              dark
                ? "bg-violet-700 text-white hover:bg-violet-600"
                : "bg-blue-400 text-white hover:bg-blue-500"
            } px-4 py-2 rounded-md`}
          >
            Profile
          </Link>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className={`p-4 shadow-md rounded-lg ${
              dark ? "bg-zinc-800" : "bg-white"
            }`}
          >
            <h3 className="font-semibold text-lg">Analytics</h3>
            <p>View your performance data.</p>
          </div>
          <div
            className={`p-4 shadow-md rounded-lg ${
              dark ? "bg-zinc-800" : "bg-white"
            }`}
          >
            <h3 className="font-semibold text-lg">Reports</h3>
            <p>Generate and download reports.</p>
          </div>
          <div
            className={`p-4 shadow-md rounded-lg ${
              dark ? "bg-zinc-800" : "bg-white"
            }`}
          >
            <h3 className="font-semibold text-lg">Settings</h3>
            <p>Manage your preferences.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

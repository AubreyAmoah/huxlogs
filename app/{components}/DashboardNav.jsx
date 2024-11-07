"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

const DashboardNav = ({ email, name, image }) => {
  const { dark } = React.useContext(ThemeContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const togglePopupNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {" "}
      <nav
        className={`sticky top-0 left-0 flex justify-between items-center font-bold max-[800px]:hidden ${
          dark ? "text-zinc-50" : "text-black"
        }`}
      >
        {dark ? (
          <Image
            className="dark:invert"
            src="/three.svg"
            alt="App logo"
            width={200}
            height={58}
            priority
          />
        ) : (
          <Image
            className="dark:invert"
            src="/two.svg"
            alt="App logo"
            width={200}
            height={58}
            priority
          />
        )}

        <div className="flex gap-6 items-center">
          <span>EN</span>
          <Link
            className={`${
              dark
                ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
                : "rounded-md border border-blue-400 text-blue-400 bg-transparent px-4 py-3 hover:bg-blue-400 hover:text-zinc-50 hover:border-zinc-50"
            } flex items-center gap-2`}
            href={`/api/auth/logout`}
          >
            <FontAwesomeIcon icon={faDoorOpen} /> Logout
          </Link>
        </div>
      </nav>
      <div className="hidden max-[800px]:block absolute top-6 left-0">
        <button
          onClick={togglePopupNav}
          className="hidden max-[800px]:block w-14 absolute left-6"
        >
          <div
            className={`${
              dark ? "bg-zinc-50" : "bg-black"
            } rounded-md h-2 mb-2 transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-[16px]" : ""
            }`}
          ></div>
          <div
            className={`${
              dark ? "bg-zinc-50" : "bg-black"
            } rounded-md h-2 transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`${
              dark ? "bg-zinc-50" : "bg-black"
            } rounded-md h-2 mt-2 transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[15px]" : ""
            }`}
          ></div>
        </button>

        <div
          className={`${
            isOpen
              ? `mt-12 flex flex-col shadow-md w-screen p-4 ${
                  dark ? "bg-black text-zinc-50" : "bg-zinc-50 text-black"
                }`
              : "hidden"
          }`}
        >
          {dark ? (
            <Image
              className="dark:invert"
              src="/three.svg"
              alt="App logo"
              width={200}
              height={58}
              priority
            />
          ) : (
            <Image
              className="dark:invert"
              src="/two.svg"
              alt="App logo"
              width={200}
              height={58}
              priority
            />
          )}

          <div className="flex gap-6 items-center mt-6">
            <span>EN</span>
            <Link
              className={`${
                dark
                  ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
                  : "rounded-md border border-blue-400 text-blue-400 bg-transparent px-4 py-3 hover:bg-blue-400 hover:text-zinc-50 hover:border-zinc-50"
              } flex items-center gap-2`}
              href={`/api/auth/logout`}
            >
              <FontAwesomeIcon icon={faDoorOpen} /> Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;

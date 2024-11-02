"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ThemeContext } from "../context/ThemeContext";

const Nav = () => {
  const { dark } = React.useContext(ThemeContext);
  const [isOpen, setIsOpen] = React.useState(false);

  const togglePopupNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {" "}
      <nav
        className={`flex justify-between items-center font-bold max-[800px]:hidden ${
          dark ? "text-zinc-50" : "text-black"
        }`}
      >
        <Link href={`/`}>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={38}
            priority
          />
        </Link>

        <div className="flex gap-10 items-center">
          <Link href={`/`}>Home</Link>
          <Link href={`/pages/about`}>About Us</Link>
          <Link href={`https://t.me/huxlogs_support`}>Support</Link>
          <Link href={`/pages/faqs`}>FAQs</Link>
        </div>

        <div className="flex gap-6 items-center">
          <span>EN</span>
          <Link
            className={`${
              dark
                ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
                : "rounded-md border border-indigo-400 text-indigo-400 bg-transparent px-4 py-3 hover:bg-indigo-400 hover:text-zinc-50 hover:border-zinc-50"
            }`}
            href={`/pages/dashboard`}
          >
            Launch App
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
          <Link href={`/`}>
            <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={100}
              height={38}
              priority
            />
          </Link>

          <div className="flex flex-col gap-10 items-center">
            <Link href={`/`}>Home</Link>
            <Link href={`/pages/about`}>About Us</Link>
            <Link href={`https://t.me/huxlogs_support`}>Support</Link>
            <Link href={`/pages/faqs`}>FAQs</Link>
          </div>

          <div className="flex gap-6 items-center mt-6">
            <span>EN</span>
            <Link
              className={`${
                dark
                  ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
                  : "rounded-md border border-indigo-400 text-indigo-400 bg-transparent px-4 py-3 hover:bg-indigo-400 hover:text-zinc-50 hover:border-zinc-50"
              }`}
              href={`/pages/dashboard`}
            >
              Launch App
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;

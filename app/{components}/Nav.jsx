"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Nav = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const togglePopupNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {" "}
      <nav className="flex justify-between items-center font-bold max-[800px]:hidden">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={38}
          priority
        />

        <div className="flex gap-10 items-center">
          <Link href={`/about`}>About Us</Link>
          <Link href={`https://t.me/huxlogs_support`}>Support</Link>
          <Link href={`/faqs`}>FAQs</Link>
        </div>

        <div className="flex gap-6 items-center">
          <span>EN</span>
          <Link
            className="rounded-md border border-indigo-400 text-indigo-400 bg-transparent px-4 py-3 hover:bg-indigo-400 hover:text-zinc-50 hover:border-zinc-50"
            href={`/dashboard`}
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
            className={`bg-black rounded-md h-2 mb-2 transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-[16px]" : ""
            }`}
          ></div>
          <div
            className={`bg-black rounded-md h-2 transition-opacity duration-300 ${
              isOpen ? "opacity-0" : ""
            }`}
          ></div>
          <div
            className={`bg-black rounded-md h-2 mt-2 transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-[15px]" : ""
            }`}
          ></div>
        </button>

        <div
          className={`${
            isOpen
              ? "mt-12 flex flex-col bg-zinc-50 shadow-md w-screen p-4"
              : "hidden"
          }`}
        >
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={38}
            priority
          />

          <div className="flex flex-col gap-10 items-center">
            <Link href={`/about`}>About Us</Link>
            <Link href={`https://t.me/huxlogs_support`}>Support</Link>
            <Link href={`/faqs`}>FAQs</Link>
          </div>

          <div className="flex gap-6 items-center mt-6">
            <span>EN</span>
            <Link
              className="rounded-md border border-indigo-400 text-indigo-400 bg-transparent px-4 py-3 hover:bg-indigo-400 hover:text-zinc-50 hover:border-zinc-50"
              href={`/dashboard`}
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

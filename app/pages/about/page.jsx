"use client";
import { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";
import Link from "next/link";
import Image from "next/image";
import ThemeToggler from "@/app/{components}/ThemeToggler";
import Nav from "@/app/{components}/Nav";

export default function AboutUs() {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`relative min-h-screen w-screen px-20 py-10 max-[800px]:px-16 max-[500px]:px-10 ${
        dark ? "bg-black" : "bg-zinc-50"
      }`}
    >
      <Nav />
      <ThemeToggler />
      <div
        className={`ml-auto mr-auto mt-20 max-[800px]:mt-24 max-[500px]:mt-28 ${
          dark ? "text-zinc-50" : "text-black"
        }`}
      >
        <h1 className="text-6xl font-bold mb-6 max-[890px]:text-5xl max-[800px]:text-4xl max-[500px]:text-2xl">
          About Us
        </h1>
        <p className="mb-6 max-[500px]:text-sm">
          Welcome to our platform, your go-to destination for secure financial
          management. We are a team of passionate professionals committed to
          providing a comprehensive solution for bank logs, credit card
          management, and financial insights. Our platform is built with
          security and simplicity in mind, ensuring you have complete control
          over your financial data.
        </p>

        <h2 className="text-4xl font-semibold mb-4 max-[800px]:text-3xl max-[500px]:text-xl">
          Our Mission
        </h2>
        <p className="mb-6 max-[500px]:text-sm">
          Our mission is to empower individuals and businesses by simplifying
          the management of financial data, providing real-time insights, and
          fostering secure financial transactions. We strive to be a leader in
          financial technology by continuously innovating and enhancing the user
          experience.
        </p>

        <h2 className="text-4xl font-semibold mb-4 max-[800px]:text-3xl max-[500px]:text-xl">
          Why Choose Us
        </h2>
        <div className="mb-20 max-[500px]:text-sm">
          <p>With our platform, you gain access to:</p>
          <ul className="list-disc ml-6">
            <li>Secure and private financial management tools</li>
            <li>Real-time tracking of transactions and logs</li>
            <li>Detailed insights to make informed financial decisions</li>
            <li>
              A user-friendly interface designed for simplicity and efficiency
            </li>
          </ul>
        </div>

        <Link
          className={`${
            dark
              ? "rounded-md border border-violet-600 text-violet-600 bg-transparent px-4 py-3 hover:bg-violet-600 hover:text-black hover:border-black"
              : "rounded-md border border-indigo-400 text-indigo-400 bg-transparent px-4 py-3 hover:bg-indigo-400 hover:text-zinc-50 hover:border-zinc-50"
          }`}
          href={`/pages/dashboard`}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}

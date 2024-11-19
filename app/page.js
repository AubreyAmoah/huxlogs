"use client";
import Nav from "./{components}/Nav";
import Greeting from "./{components}/Greeting";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

export default function Home() {
  const { dark } = useContext(ThemeContext);
  return (
    <div
      className={`relative min-h-screen w-screen px-20 py-10 max-[800px]:px-16 max-[500px]:px-10 ${
        dark ? `bg-black` : `bg-zinc-50`
      }`}
    >
      <Nav />
      <Greeting />
    </div>
  );
}

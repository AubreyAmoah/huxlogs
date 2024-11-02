"use client";
import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";

const ThemeToggler = () => {
  const { dark, toggleTheme } = React.useContext(ThemeContext);
  return (
    <>
      <button
        onClick={toggleTheme}
        className={`${
          dark ? "bg-zinc-50" : "bg-black"
        } rounded-full h-12 w-12 fixed top-20 right-5 shadow-md text-4xl flex justify-center items-center text-center`}
      >
        {dark ? (
          <FontAwesomeIcon className="text-black" icon={faSun} />
        ) : (
          <FontAwesomeIcon className="text-zinc-50" icon={faMoon} />
        )}
      </button>
    </>
  );
};

export default ThemeToggler;

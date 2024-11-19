"use client";

import React, { useEffect } from "react";
import Signin from "@/app/{components}/Signin";
import { ThemeContext } from "@/app/context/ThemeContext";
import ThemeToggler from "@/app/{components}/ThemeToggler";
import DashboardNav from "@/app/{components}/DashboardNav";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faWarning } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const dashboard = () => {
  const { dark } = React.useContext(ThemeContext);
  const { user, authLoading, authError } = React.useContext(AuthContext);

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
  return (
    <div
      className={`relative min-h-screen w-screen px-8 max-[800px]:px-16 max-[500px]:px-10 ${
        dark ? `bg-black` : `bg-zinc-50`
      }`}
    >
      <ThemeToggler />
      {authError ? (
        <Signin />
      ) : (
        <>
          <DashboardNav />
          <h2>{user.email}</h2>
          <p>{user.email}</p>
          <Link href="/api/auth/logout">Logout</Link>
        </>
      )}
    </div>
  );
};

export default dashboard;

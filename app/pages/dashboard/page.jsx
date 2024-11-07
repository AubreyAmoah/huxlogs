"use client";

import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Signin from "@/app/{components}/Signin";
import { ThemeContext } from "@/app/context/ThemeContext";
import ThemeToggler from "@/app/{components}/ThemeToggler";
import DashboardNav from "@/app/{components}/DashboardNav";

const dashboard = () => {
  const { dark } = React.useContext(ThemeContext);
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    <div
      className={`relative min-h-screen w-screen px-8 max-[800px]:px-16 max-[500px]:px-10 ${
        dark ? `bg-black` : `bg-zinc-50`
      }`}
    >
      <ThemeToggler />
      {user ? (
        <>
          <DashboardNav />
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <a href="/api/auth/logout">Logout</a>
        </>
      ) : (
        <Signin />
      )}
    </div>
  );
};

export default dashboard;

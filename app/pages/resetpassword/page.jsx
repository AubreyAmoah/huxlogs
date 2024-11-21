"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const PasswordResetForm = dynamic(
  () => import("../../{components}/PasswordResetForm"),
  {
    ssr: false, // Ensure this component is rendered only on the client side
  }
);

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen bg-[#E7EAEE] text-black">
          <FontAwesomeIcon icon={faSpinner} className="animate-spin text-8xl" />
          <p className="mt-4">Loading...</p>
        </div>
      }
    >
      <PasswordResetForm />
    </Suspense>
  );
};

export default Page;

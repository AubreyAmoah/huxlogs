import Image from "next/image";
import React from "react";

const DashboardWelcome = ({ dark, user }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav
        className={`${
          dark ? "bg-violet-900" : "bg-blue-600"
        } text-white p-4 shadow-md`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">HuxLogs</h1>
          <p className="max-[400px]:hidden">Welcome {user.email}</p>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className={`${
          dark ? "bg-violet-700" : "bg-blue-500"
        } text-white flex-1 flex flex-col justify-center items-center py-20`}
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Huxlogs</h2>

          <p className="text-lg mb-6">
            Purchase your logs with ease! The following categories are
            available.
          </p>
          <div className="space-x-4 max-[570px]:space-y-4">
            <button
              disabled
              className={`${
                dark ? "text-violet-700" : "text-blue-600"
              } px-6 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 max-[800px]:text-sm max-[800px]:px-3`}
            >
              Bank Logs
            </button>
            <button
              disabled
              className={`${
                dark ? "text-violet-700" : "text-blue-600"
              } px-6 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 max-[800px]:text-sm max-[800px]:px-3`}
            >
              PayPal Logs
            </button>
            <button
              disabled
              className={`${
                dark ? "text-violet-700" : "text-blue-600"
              } px-6 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 max-[800px]:text-sm max-[800px]:px-3`}
            >
              CashApp Logs
            </button>
            <button
              disabled
              className={`${
                dark ? "text-violet-700" : "text-blue-600"
              } px-6 py-3 bg-white font-semibold rounded-lg shadow-md hover:bg-gray-100 transition duration-300 max-[800px]:text-sm max-[800px]:px-3`}
            >
              Credit Card Logs
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section
        className={`py-16 ${
          dark ? "bg-[#000] text-gray-100" : "bg-gray-100 text-black"
        }`}
      >
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8">
            Why Choose Our Platform?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div
              className={`${
                dark ? "bg-[#222] text-white" : "bg-white text-gray-700"
              } p-6 rounded-lg shadow-lg`}
            >
              <h4 className="text-2xl font-bold mb-2">Fast & Secure</h4>
              <p className="">
                Your data is secure with us. We ensure fast log purchase and
                secure access.
              </p>
            </div>
            {/* Feature 2 */}
            <div
              className={`${
                dark ? "bg-[#222] text-white" : "bg-white text-gray-700"
              } p-6 rounded-lg shadow-lg`}
            >
              <h4 className="text-2xl font-bold mb-2">Customizable Options</h4>
              <p className="">
                Tailor logs to meet your specific needs, with a variety of
                categories.
              </p>
            </div>
            {/* Feature 3 */}
            <div
              className={`${
                dark ? "bg-[#222] text-white" : "bg-white text-gray-700"
              } p-6 rounded-lg shadow-lg`}
            >
              <h4 className="text-2xl font-bold mb-2">User-Friendly</h4>
              <p className="">
                Enjoy an intuitive dashboard that's easy to navigate and
                operate.
              </p>
            </div>
            {/* Feature 4 */}
            <div
              className={`${
                dark ? "bg-[#222] text-white" : "bg-white text-gray-700"
              } p-6 rounded-lg shadow-lg`}
            >
              <h4 className="text-2xl font-bold mb-2">24/7 Support</h4>
              <p className="">
                Get support anytime you need it with our reliable customer
                service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`${dark ? "bg-violet-900" : "bg-blue-600"} text-white py-4`}
      >
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Huxlogs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DashboardWelcome;

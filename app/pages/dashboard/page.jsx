"use client";

import React, { useEffect, useState } from "react";
import { ThemeContext } from "@/app/context/ThemeContext";
import ThemeToggler from "@/app/{components}/ThemeToggler";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { addToCart } from "@/app/calls/apiCalls";
import OverflowTable from "@/app/{components}/OverflowTable";
import SideNav from "@/app/{components}/SideNav";
import DashboardWelcome from "@/app/{components}/DashboardWelcome";
import axios from "axios";

const Dashboard = () => {
  const { dark } = React.useContext(ThemeContext);
  const { user, authLoading } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [family, setFamily] = useState("");
  const [products, setProducts] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("itemname");
  const [sortProperty, setSortProperty] = useState("createdAt");
  const [order, setOrder] = useState("asc");
  const [headers, setHeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    console.log(family);
    try {
      setLoading(true);
      setProducts([]);
      const res = await axios.post("/api/products/all", { family });
      if (res.data && res.data.length > 0) {
        setProducts(res.data);
      } else {
        setProducts([]); // Set products to an empty array if no data is returned
      }
    } catch (error) {
      console.log(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (family) {
      getProducts();
    }
  }, [family]); // Trigger fetch whenever family changes

  React.useEffect(() => {
    setFilteredData([]); // Clear filtered data when switching families
    setCurrentPage(1); // Reset pagination
  }, [family]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      setHeaders(Object.keys(products[0])); // Dynamically set headers based on first product object keys
      setFilteredData(
        products
          .filter((item) => {
            const value = filter;
            console.log(value);
            if (typeof item[value] === "string") {
              return item[value]
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            }
            return item[value].includes(searchTerm);
          })
          .sort((a, b) => {
            const sortKey = sortProperty;
            // const order = "desc"; // Change to "desc" for descending order

            // Handle sorting for each type of value
            if (sortKey === "createdAt") {
              const dateA = new Date(a[sortKey]);
              const dateB = new Date(b[sortKey]);
              return order === "asc" ? dateA - dateB : dateB - dateA;
            }

            if (
              typeof a[sortKey] === "number" &&
              typeof b[sortKey] === "number"
            ) {
              return order === "asc"
                ? a[sortKey] - b[sortKey]
                : b[sortKey] - a[sortKey];
            }

            return 0; // Default fallback
          })
      );
    } else {
      setFilteredData([]); // Clear filtered data if no products are available
    }
  }, [products, filter, order, sortProperty, searchTerm]);

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

  return (
    <div
      className={`relative flex min-h-screen max-[700px]:flex-col ${
        dark ? `bg-black` : `bg-zinc-50`
      }`}
    >
      <ThemeToggler />

      {/* Toggle Button */}
      <button
        onClick={() => {
          toggleSidebar();
        }}
        className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md w-[40px] h-[40px] z-50"
      >
        {sidebarOpen ? (
          <FontAwesomeIcon icon={faTimes} className="text-black" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="text-black" />
        )}
      </button>

      {/* Sidebar */}
      <SideNav
        getProducts={getProducts}
        setFamily={setFamily}
        sidebarOpen={sidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 p-6 h-screen overflow-auto">
        <header
          className={`flex justify-between items-center ${
            dark ? "text-zinc-50" : "text-black"
          }`}
        ></header>

        <div>
          {/* Content for Products */}
          {family === "" ? (
            <DashboardWelcome dark={dark} user={user} setFamily={setFamily} />
          ) : (
            <div>
              <h1 className=" text-green-800">Welcome {user.email}</h1>
              <h2
                className={`${
                  dark ? "text-zinc-50" : "text-black"
                } mt-6 text-lg font-bold`}
              >
                Products
              </h2>
              <p className=" text-orange-900 font-bold">
                The search box searches as you type, the filter box beside it
                instructs the search box on what to search by. ie name, price
                etc. <br /> By default the filter is set to the product&apos;s
                name
              </p>
              <OverflowTable
                dark={dark}
                data={paginatedData}
                headers={headers}
                loading={loading}
                setLoading={setLoading}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                setFilter={setFilter}
                search={setSearchTerm}
                setSortProperty={setSortProperty}
                setOrder={setOrder}
                onAddToCart={addToCart}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

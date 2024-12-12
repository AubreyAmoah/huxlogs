"use client";

import { ThemeContext } from "@/app/context/ThemeContext";
import { AuthContext } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faCaretDown,
  faHome,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

const Orders = () => {
  const { dark } = React.useContext(ThemeContext);

  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/products/getorders");
      if (res.status === 200) {
        setPendingOrders(res.data.pendingOrders);
        setCompletedOrders(res.data.completedOrders);
      }
    } catch (error) {
      console.error(error);
      setError("Unable to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-b p-6 max-[450px]:p-4 max-[400px]:p-2 ${
        dark ? "bg-black text-zinc-50" : "bg-zinc-50 text-black"
      }`}
    >
      <h1
        className={`text-xl mb-6 ${
          dark ? "text-violet-600" : "text-blue-400"
        } flex gap-2 items-end`}
      >
        <Link href={"/pages/dashboard"}>
          <FontAwesomeIcon icon={faHome} />
        </Link>
        Your Orders
      </h1>

      {loading ? (
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <>
          {/* Pending Orders Section */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4 font-semibold">Pending Orders</h2>
            {pendingOrders.length > 0 ? (
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <div
                    key={order._id}
                    className={`${
                      dark ? "bg-[#252525]" : "bg-white"
                    } p-4 rounded-lg shadow-lg`}
                  >
                    <h3 className="font-bold">Order ID: {order._id}</h3>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.total}</p>
                    <p>Items: {order.items.length}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No pending orders found</p>
            )}
          </div>

          {/* Completed Orders Section */}
          <div>
            <h2 className="text-2xl mb-4 font-semibold">Completed Orders</h2>
            <p className="mb-4">All completed orders are fowarded to your mail</p>
            {completedOrders.length > 0 ? (
              <div className="space-y-4">
                {completedOrders.map((order) => (
                  <div
                    key={order._id}
                    className={`${
                      dark ? "bg-[#252525]" : "bg-white"
                    } p-4 rounded-lg shadow-lg`}
                  >
                    <h3 className="font-bold">Order ID: {order._id}</h3>
                    <p>Status: {order.status}</p>
                    <p>Total: ${order.total}</p>
                    <p>Items: {order.items.length}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No completed orders found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;

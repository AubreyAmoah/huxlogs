import {
  faSpinner,
  faTrash,
  faFilter,
  faShoppingCart,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const OverflowTable = ({
  dark,
  data,
  setFilter,
  headers,
  loading,
  setLoading,
  onAddToCart,
  currentPage,
  totalPages,
  onPageChange,
  search,
  setSortProperty,
  setOrder,
}) => {
  if (loading)
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
          } animate-spin`}
        />
        <span className={`${dark ? "text-violet-600" : " text-blue-400"}`}>
          Loading...
        </span>
      </div>
    );
  return (
    <div
      className={`${
        dark ? "bg-[#283241] text-zinc-50" : "bg-white text-black"
      } w-full overflow-x-auto p-4 shadow rounded-lg relative`}
    >
      {/* Search and Filter Bar */}
      <div className="flex justify-between mb-4 sticky left-1 max-[670px]:flex-col max-[670px]:gap-2">
        <div className="flex space-x-4 max-[500px]:flex-col max-[500px]:space-x-0 max-[500px]:gap-2">
          <input
            onChange={(e) => search(e.target.value)}
            type="text"
            placeholder="Search a product"
            className="w-72 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black max-[500px]:w-full"
          />
          <select
            onChange={(e) => setFilter(e.target.value)}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
          >
            <option value="itemname">Search by</option>
            {headers
              .filter((header) => header !== "_id")
              .filter((header) => header !== "createdAt")
              .filter((header) => header !== "type")
              .filter((header) => header !== "gender")
              .filter((header) => header !== "family")
              .map((header) => (
                <option key={header} value={header}>
                  {header === "itemname"
                    ? "product name"
                    : header === "subcategory"
                    ? "country / category"
                    : header}
                </option>
              ))}
          </select>
        </div>
        <div className="flex space-x-4 max-[500px]:flex-col max-[500px]:space-x-0 max-[500px]:gap-2">
          <select
            onChange={(e) => setSortProperty(e.target.value)}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
          >
            <option value="itemname">Sort by</option>
            {headers
              .filter(
                (header) =>
                  header === "itemname" ||
                  header === "price" ||
                  header === "balance" ||
                  header === "createdAt" ||
                  header === "subcategory" ||
                  header === "gender"
              )
              .map((header) => (
                <option key={header} value={header}>
                  {header === "createdAt"
                    ? "date added"
                    : header === "subcategory"
                    ? "country / category"
                    : header === "itemname"
                    ? "product name"
                    : header}
                </option>
              ))}
          </select>
          <select
            onChange={(e) => setOrder(e.target.value)}
            className={`bg-blue-500 text-white px-4 py-2 rounded-md`}
          >
            <option value="">Order By</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p>No products available.</p>
        </div>
      ) : (
        <table className="table-auto min-w-full overflow-auto text-left">
          <thead
            className={`bg-gradient-to-r ${
              dark ? "from-violet-800 to-black" : "from-blue-300 to-blue-600"
            } capitalize`}
          >
            <tr>
              {headers
                .filter((header) => header !== "_id")
                .filter((header) => header !== "createdAt")
                .filter((header) => header !== "type")
                .filter((header) => header !== "subcategory")
                .filter((header) => header !== "gender")
                .filter((header) => header !== "family")
                .filter((header) => header !== "updatedAt")
                .map((header) => (
                  <th
                    key={header}
                    className={`px-4 py-2 text-white font-semibold border-b border-gray-200 max-[600px]:px-2 max-[600px]:text-sm ${
                      header === "price" || header === "balance"
                        ? "min-w-[120px] max-[600px]:min-w-[80px] "
                        : header === "itemname"
                        ? "min-w-[120px] max-[600px]:min-w-[100px]"
                        : "min-w-[200px] max-[600px]:min-w-[150px]"
                    }`}
                  >
                    {header === "itemname"
                      ? "Product"
                      : header === "subcategory"
                      ? "Category"
                      : header}
                  </th>
                ))}
              <th className="px-4 py-2 text-white font-semibold border-b border-gray-200 min-w-[50px] max-[600px]:px-2 max-[600px]:text-sm">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-b border-gray-200">
                {headers
                  .filter((header) => header !== "_id")
                  .filter((header) => header !== "createdAt")
                  .filter((header) => header !== "type")
                  .filter((header) => header !== "subcategory")
                  .filter((header) => header !== "gender")
                  .filter((header) => header !== "family")
                  .filter((header) => header !== "updatedAt")
                  .map((header) => (
                    <td
                      key={`${item._id}-${header}`}
                      className={`px-4 py-2 overflow-auto max-[600px]:text-xs max-[600px]:px-2 ${
                        header === "price" || header === "balance"
                          ? "max-[600px]:min-w-[80px]"
                          : header === "itemname"
                          ? "min-w-[200px] max-[600px]:min-w-[100px] capitalize"
                          : header === "description"
                          ? " lowercase"
                          : "min-w-[200px] max-[600px]:min-w-[100px]"
                      }`}
                    >
                      {header === "balance" || header === "price"
                        ? `$ ${item[header]}`
                        : item[header]}
                    </td>
                  ))}
                {/* Stock availability with color indicators */}
                {/* <td className="px-4 py-2">
                <span
                  className={`${
                    item.available <= 10 ? "text-red-600" : "text-green-600"
                  } font-bold`}
                >
                  {item.available} pcs.
                </span>
              </td> */}
                <td className="px-4 py-2 text-left max-[600px]:px-2 max-[600px]:text-xs">
                  <button
                    onClick={() => onAddToCart(item._id, setLoading)}
                    className="px-2 py-1 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 max-[600px]:text-center"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 sticky left-1 max-[350px]:flex-col max-[350px]:item-center max-[350px]:gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "opacity-50" : ""
          } px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 max-[350px]:w-full`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages ? "opacity-50" : ""
          } px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 max-[350px]:w-full`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OverflowTable;

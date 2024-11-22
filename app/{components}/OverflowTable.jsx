import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const OverflowTable = ({
  dark,
  data,
  headers,
  loading,
  onAddToCart,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="w-full overflow-x-auto mb-4 shadow-md">
      {loading ? (
        <FontAwesomeIcon
          icon={faSpinner}
          className={`text-8xl animate-spin text-center ml-auto mr-auto ${
            dark ? "text-violet-700" : "text-blue-500"
          }`}
        />
      ) : (
        <>
          <table
            className={`min-w-full table-auto border-collapse ${
              dark
                ? "text-zinc-50 bg-black border-zinc-50"
                : "text-black bg-white border-black"
            }`}
          >
            <thead>
              <tr>
                {headers.map((header) => (
                  <th
                    key={header}
                    className={`border px-4 py-2 ${
                      dark ? "border-zinc-50" : "border-black"
                    }`}
                  >
                    {header}
                  </th>
                ))}
                <th
                  className={`border px-4 py-2 ${
                    dark ? "border-zinc-50" : "border-black"
                  }`}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id}>
                    {headers.map((header) => (
                      <td
                        key={`${item._id}-${header}`}
                        className={`border px-4 py-2 ${
                          dark ? "border-zinc-50" : "border-black"
                        }`}
                      >
                        <Link href={`/pages/dashboard/items/${item._id}`}>
                          {item[header]}
                        </Link>
                      </td>
                    ))}
                    <td className="p-3">
                      <button
                        onClick={() => onAddToCart(item._id)}
                        className="text-green-500 hover:text-green-700"
                      >
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length + 1} className="p-3 text-center">
                    Nothing to display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1 ? "opacity-50" : ""
          } px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600`}
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
          } px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OverflowTable;

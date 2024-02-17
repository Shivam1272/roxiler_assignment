import React from "react";

const TransactionsTable = ({ transaction }) => {
  if (!Array.isArray(transaction)) return <div>No transactions yet</div>;
  return (
    <div className="overflow-x-auto mt-6 mx-2">
      <table className="min-w-full table-auto">
        <thead className="border-2 border-black">
          <tr>
            <th className=" items-center px-5 py-3 border-2 border-black bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className=" items-center px-5 py-3 border-2 border-black bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Title
            </th>
            <th className=" items-center px-5 py-3 border-2 border-black bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Description
            </th>
            <th className=" items-center px-5 py-3 border-2 border-black bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Price
            </th>
            <th className=" items-center px-5 py-3 border-2 border-black bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Category
            </th>
            <th className=" items-center px-5 py-3 border-2 border-black bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Sold
            </th>
            <th className=" items-center px-5 py-3 border-2 border-black bg-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Image Preview
            </th>
          </tr>
        </thead>
        <tbody>
          {transaction?.map((transaction, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
            >
              <td className="px-5 py-2 border-2  border-black">
                {transaction.id}
              </td>
              <td className="px-5 py-2 border-2  border-black">
                {transaction.title}
              </td>
              <td className="px-5 py-2 border-2  border-black">
                {transaction.description}
              </td>
              <td className="px-5 py-2 border-2  border-black">
                {Math.round(transaction.price)}
              </td>
              <td className="px-5 py-2 border-2 border-black">
                {transaction.category}
              </td>
              <td className="px-5 py-2 border-2 border-black">
                {transaction.sold.toString()}
              </td>
              <td className="px-5 py-2 border-2 border-black">
                <img
                  src={transaction.image}
                  alt="product"
                  className="w-[150px] h-[150px] object-contain"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;

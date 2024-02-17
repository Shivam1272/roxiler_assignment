import ProductTransaction from "../model/product.model.js";

export async function getTransactions({ month, page, perPage, search }) {
  const monthNumber = parseInt(month, 10); // Assuming month is "1" for January, "2" for February, etc.
  let searchRegex = new RegExp(search, "i");

  const transactions = await ProductTransaction.aggregate([
    {
      $addFields: {
        monthOfSale: { $month: "$dateOfSale" },
      },
    },
    {
      $match: {
        monthOfSale: monthNumber,
        ...(search && {
          $or: [
            { title: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
            ...(isNaN(parseFloat(search))
              ? []
              : [{ price: parseFloat(search) }]),
          ],
        }),
      },
    },
    {
      $skip: (page - 1) * perPage,
    },
    {
      $limit: perPage,
    },
  ]);

  const totalCount = await ProductTransaction.aggregate([
    {
      $addFields: {
        monthOfSale: { $month: "$dateOfSale" },
      },
    },
    {
      $match: {
        monthOfSale: monthNumber,
        ...(search && {
          $or: [
            { title: { $regex: searchRegex } },
            { description: { $regex: searchRegex } },
            ...(isNaN(parseFloat(search))
              ? []
              : [{ price: parseFloat(search) }]),
          ],
        }),
      },
    },
    {
      $count: "totalCount",
    },
  ]);

  return {
    data: transactions,
    currentPage: parseInt(page, 10),
    totalPages: totalCount[0]
      ? Math.ceil(totalCount[0].totalCount / perPage)
      : 0,
    totalCount: totalCount[0] ? totalCount[0].totalCount : 0,
  };
}

// Function to get statistics
export async function getStatistics(month) {
  const monthNumber = parseInt(month, 10); // Ensure month is a number

  const stats = await ProductTransaction.aggregate([
    {
      $addFields: {
        monthOfSale: { $month: "$dateOfSale" },
      },
    },
    {
      $match: {
        monthOfSale: monthNumber,
      },
    },
    {
      $group: {
        _id: null, // Group all documents together
        totalSaleAmount: {
          $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] },
        }, // Sum up the price for all items
        totalNumberOfSoldItems: {
          $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] },
        }, // Count sold items
        totalNumberOfNotSoldItems: {
          $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] },
        }, // Count not sold items
      },
    },
    {
      $project: {
        _id: 0, // Exclude the _id field
        totalSaleAmount: 1,
        totalNumberOfSoldItems: 1,
        totalNumberOfNotSoldItems: 1,
      },
    },
  ]);

  // Check if the stats array is empty, which means no matching documents were found
  if (stats.length === 0) {
    return {
      totalSaleAmount: 0,
      totalNumberOfSoldItems: 0,
      totalNumberOfNotSoldItems: 0,
    };
  }

  return {
    totalSaleAmount: stats[0].totalSaleAmount,
    totalNumberOfSoldItems: stats[0].totalNumberOfSoldItems,
    totalNumberOfNotSoldItems: stats[0].totalNumberOfNotSoldItems,
  };
}

// Function to get data for bar chart
export async function getBarChartData(monthNumber) {
  const results = await ProductTransaction.aggregate([
    {
      $addFields: {
        month: { $month: "$dateOfSale" },
      },
    },
    {
      $match: {
        month: monthNumber,
      },
    },
    {
      $bucket: {
        groupBy: "$price",
        boundaries: [0, 101, 201, 301, 401, 501, 601, 701, 801, 901],
        default: "901-above",
        output: {
          count: { $sum: 1 },
        },
      },
    },
  ]);

  // Convert results to expected format
  return results.map((bucket) => {
    const label =
      bucket._id === "901-above"
        ? "901-above"
        : `${bucket._id}-${bucket._id + 99}`;
    return { priceRange: label, itemCount: bucket.count };
  });
}

// Function to get data for pie chart
export async function getPieChartData(monthNumber) {
  const results = await ProductTransaction.aggregate([
    {
      $addFields: {
        month: { $month: "$dateOfSale" },
      },
    },
    {
      $match: {
        month: monthNumber,
      },
    },
    {
      $group: {
        _id: "$category",
        itemCount: { $sum: 1 },
      },
    },
    {
      $project: {
        category: "$_id",
        itemCount: 1,
        _id: 0,
      },
    },
  ]);

  return results;
}

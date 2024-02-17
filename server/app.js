import express from "express";
import cors from "cors";
import axios from "axios";
import ProductTransaction from "./model/product.model.js";
import {
  getBarChartData,
  getPieChartData,
  getStatistics,
  getTransactions,
} from "./controller/product.controller.js";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.get("/health", (req, res) => {
  const status = "OK";
  return res.status(200).send({ status });
});

app.get("/api/initialize-db", async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;
    await ProductTransaction.insertMany(transactions);
    res.status(200).send("Database initialized with seed data.");
  } catch (error) {
    console.error("Error initializing the database: ", error);
    res.status(500).send("Failed to initialize the database.");
  }
});

app.get("/api/combinedData", async (req, res) => {
  const { month, page = 1, perPage = 10, search = "" } = req.query;

  try {
    if (!month || isNaN(Date.parse(`1 ${month} 2000`))) {
      return res
        .status(400)
        .send({ error: "A valid month is required as a query parameter." });
    }

    const monthNumber = new Date(`1 ${month} 2000`).getMonth() + 1;

    const transactionsPromise = await getTransactions({
      month: monthNumber,
      page,
      perPage,
      search,
    });
    const statisticsPromise = getStatistics(monthNumber);
    const barChartDataPromise = getBarChartData(monthNumber);
    const pieChartDataPromise = getPieChartData(monthNumber);

    const [transactions, statistics, barChartData, pieChartData] =
      await Promise.all([
        transactionsPromise,
        statisticsPromise,
        barChartDataPromise,
        pieChartDataPromise,
      ]);

    const combinedData = {
      transactions,
      statistics,
      barChartData,
      pieChartData,
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Failed to fetch combined data:", error);
    res.status(500).send({ error: "Failed to fetch combined data." });
  }
});

export { app };

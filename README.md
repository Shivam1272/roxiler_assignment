# Product DashBoard

This project is designed as a coding challenge for a MERN (MongoDB, Express.js, React.js, Node.js) stack application. It consists of a backend service that interacts with a third-party API to fetch, store, and serve product transaction data through various endpoints, and a frontend application that consumes these APIs to display transactions, statistics, and charts.

## Backend Task

### Data Source

- **THIRD PARTY API URL**: 
  ``` url
      https://s3.amazonaws.com/r.com/product_transaction.json
  ```
- **REQUEST METHOD**: `GET`
- **RESPONSE FORMAT**: `JSON`

### Features

1. **Initialize Database API**: Fetches JSON from the third-party API and initializes the database with seed data.
2. **Transactions Listing API**: Lists all transactions with support for search and pagination.
3. **Statistics API**: Provides total sale amount, total number of sold and not sold items for a selected month.
4. **Bar Chart Data API**: Returns price range data for items sold in a selected month.
5. **Pie Chart Data API**: Finds unique categories and the number of items from each category for a selected month.
6. **Combined Data API**: Combines data from the transactions, statistics, bar chart, and pie chart APIs into a single response.

### Setup Instructions

1. Clone the repository and navigate to the backend directory.
2. Install dependencies: 
  ```js 
      npm install
  ```
3. Set up your `.env` file with necessary environment variables, including your MongoDB URI you can check `.env.sample` file.
4. Start the server: `npm run dev`

## Frontend Task

### Features

1. **Transactions Table**: Displays transactions for a selected month. Supports pagination and a search functionality.
2. **Transactions Statistics**: Shows total sale amount, total sold, and not sold items for the selected month.
3. **Transactions Bar Chart**: Visualizes the price range distribution of sold items for the selected month.
4. **Transactions Pie Chart**: Displays the distribution of items across different categories for the selected month.

### Setup Instructions

1. Navigate to the frontend directory within the project.
2. Install dependencies: 
    ```js
        npm install
    ```
3. Ensure the backend server is running and the frontend is configured to communicate with it.
4. Start the frontend application: 
    ``` js
        npm run start
    ```

## API Endpoints

Below are the API endpoints implemented in the backend:

- **Initialize Database**: 
  ``` js
      api GET /api/initialize-db
  ```
- **Not in Final Project**: I removed all this endpoint there is only one endpoint `combinedData` in final project
  ``` js
  List Transactions: GET /api/transactions?month=<month>&page=<page>&perPage=<perPage>&search=<search>,
  Get Statistics: GET /api/statistics?month=<month>,
  Get Bar Chart Data: GET /api/bar-chart?month=<month>,
  Get Pie Chart Data: GET /api/pie-chart?month=<month>,
  ```
- **Get Combined Data**:
  ```js
  GET /api/combinedData?month=<month>&search=<search>&page=<page>
  ```


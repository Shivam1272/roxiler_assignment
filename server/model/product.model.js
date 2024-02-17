import { Schema, model } from "mongoose";

const productTransactionSchema = new Schema(
  {
    id: Number,
    title: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    dateOfSale: Date,
    sold: Boolean,
  },
  { timestamps: true }
);

const ProductTransaction = model(
  "ProductTransaction",
  productTransactionSchema
);

export default ProductTransaction;

import { Schema } from "mongoose";
import * as mongoose from "mongoose";
const productSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  images: {
    type: Object,
    required: true,
  },
});
let ProductModel = mongoose.model("Product", productSchema);
export { ProductModel };

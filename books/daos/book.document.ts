import mongoose from "mongoose";
import { BorrowDocument } from "../../borrows/daos/borrow.document";

interface BookDocument extends mongoose.Document {
  title: String;
  authors: String;
  releasedAt: Date;
  description: String;
  coverImage?: String;
  pages: Number;
  languageCode: String;
  isbn: String;
  inStock: Number;
  borrows?: BorrowDocument[];
}

export { BookDocument };

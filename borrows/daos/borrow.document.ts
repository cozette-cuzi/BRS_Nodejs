import mongoose from "mongoose";
import { BookDocument } from "../../books/daos/book.document";
import { UserDocument } from "../../users/daos/user.document";

interface BorrowDocument extends mongoose.Document {
  readerId: UserDocument;
  bookId: BookDocument;
  status: String;
  requestProcessedAt?: Date;
  requestManagedBy?: UserDocument;
  deadline?: Date;
  returnedAt?: Date;
  returnManagedBy?: UserDocument;
}

export { BorrowDocument };

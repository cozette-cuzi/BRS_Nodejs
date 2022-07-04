import { ObjectId } from "mongoose";

export interface CreateBorrowDto {
  readerId: ObjectId;
  bookId: ObjectId;
  status: String;
  requestProcessedAt?: Date;
  requestManagedBy?: ObjectId;
  deadline?: Date;
  returnedAt?: Date;
  returnManagedBy?: ObjectId;
}

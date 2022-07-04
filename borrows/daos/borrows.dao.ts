import debug from "debug";
import shortid from "shortid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateBorrowDto } from "../dto/create.borrow.dto";
import { PatchBorrowDto } from "../dto/patch.borrow.dto";
import { PutBorrowDto } from "../dto/put.borrow.dto";
import { BorrowDocument } from "./borrow.document";

const log: debug.IDebugger = debug("app:borrows-dao");

class BorrowsDao {
  Schema = mongooseService.getMongoose().Schema;
  mongoose = mongooseService.getMongoose();

  borrowSchema = new this.Schema(
    {
      _id: String,
      readerId: { type: this.Schema.Types.ObjectId, ref: "Users" },
      bookId: { type: this.Schema.Types.ObjectId, ref: "Books" },
      status: String,
      requestProcessedAt: Date,
      requestManagedBy: { type: this.Schema.Types.ObjectId, ref: "Users" },
      deadline: Date,
      returnedAt: Date,
      returnManagedBy: { type: this.Schema.Types.ObjectId, ref: "Users" },
    },
    { id: false }
  );
  Borrow = mongooseService
    .getMongoose()
    .model<BorrowDocument>("Borrows", this.borrowSchema);

  constructor() {
    log("Created new instance of BorrowsDao");
  }

  async addBorrow(borrowFields: CreateBorrowDto) {
    const borrowId = new this.mongoose.Types.ObjectId();
    const borrow = new this.Borrow({
      _id: borrowId,
      ...borrowFields,
      status: "PENDING",
    });
    // const borrow = new this.Borrow();
    // borrow._id = new this.mongoose.Types.ObjectId();
    // borrow.status = "PENDING";
    // borrow.readerId.push(borrowFields.readerId);
    // borrow.bookId.push(borrowFields.bookId);

    await borrow.save();
    return borrowId;
  }

  async getBorrowsByReaderId(readerId: String, limit = 25, page = 0) {
    return this.Borrow.find({ readerId: readerId })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getBorrowsByStatus(status: String, limit = 25, page = 0) {
    return this.Borrow.find({ status: status })
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async getBorrows(limit = 25, page = 0) {
    return this.Borrow.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateBorrowById(
    borrowId: string,
    borrowFields: PatchBorrowDto | PutBorrowDto
  ) {
    const existingBorrow = await this.Borrow.findOneAndUpdate(
      { _id: borrowId },
      { $set: borrowFields },
      { new: true }
    ).exec();

    return existingBorrow;
  }

  async getBorrowById(borrowId: string) {
    return this.Borrow.findOne({ _id: borrowId }).populate("Borrow").exec();
  }

  async removeBorrowById(borrowId: string) {
    return this.Borrow.deleteOne({ _id: borrowId }).exec();
  }

  async getBorrowByData(query: Object) {
    return this.Borrow.findOne(query).populate("Borrow").exec();
  }
}
export default new BorrowsDao();

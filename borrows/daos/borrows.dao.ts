import debug from "debug";
import shortid from "shortid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateBorrowDto } from "../dto/create.borrow.dto";
import { PatchBorrowDto } from "../dto/patch.borrow.dto";
import { PutBorrowDto } from "../dto/put.borrow.dto";

const log: debug.IDebugger = debug("app:borrows-dao");

class BorrowsDao {
  Schema = mongooseService.getMongoose().Schema;

  borrowSchema = new this.Schema(
    {
      _id: String,
      readerId: String,
      bookId: String,
      status: String,
      requestProcessedAt: Date,
      requestManagedBy: String,
      deadline: Date,
      returnedAt: Date,
      returnManagedBy: String,
    },
    { id: false }
  );

  Borrow = mongooseService.getMongoose().model("Borrows", this.borrowSchema);

  constructor() {
    log("Created new instance of BorrowsDao");
  }

  async addBorrow(borrowFields: CreateBorrowDto) {
    const borrowId = shortid.generate();
    const borrow = new this.Borrow({
      _id: borrowId,
      ...borrowFields,
      status: "PENDING",
    });
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
}
export default new BorrowsDao();

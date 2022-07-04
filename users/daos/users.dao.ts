import mongooseService from "../../common/services/mongoose.service";
import shortid from "shortid";
import debug from "debug";
import { CreateUserDto } from "../dto/create.user.dto";
import { PatchUserDto } from "../dto/patch.user.dto";
import { PutUserDto } from "../dto/put.user.dto";
import { UserDocument } from "./user.document";

const log: debug.IDebugger = debug("app:users-dao");

class UsersDao {
  Schema = mongooseService.getMongoose().Schema;

  mongoose = mongooseService.getMongoose();

  userSchema = new this.Schema(
    {
      _id: String,
      email: String,
      password: { type: String, select: false },
      name: String,
      isLibrarian: Boolean,
      borrows: [{ type: this.Schema.Types.ObjectId, ref: "Borrows" }],
    },
    { id: false }
  );

  User = mongooseService
    .getMongoose()
    .model<UserDocument>("Users", this.userSchema);

  constructor() {
    log("Created new instance of UsersDao");
  }

  async addUser(userFields: CreateUserDto) {
    const userId = new this.mongoose.Types.ObjectId();
    const user = new this.User({
      _id: userId,
      ...userFields,
      isLibrarian: false,
    });
    await user.save();
    return userId;
  }

  async getUserByEmail(email: string) {
    return this.User.findOne({ email: email }).exec();
  }

  async getUserByEmailWithPassword(email: string) {
    return this.User.findOne({ email: email })
      .select("_id email isLibrarian +password")
      .exec();
  }

  async removeUserById(userId: string) {
    return this.User.deleteOne({ _id: userId }).exec();
  }

  async getUserById(userId: string) {
    return this.User.findOne({ _id: userId })
      .populate("User", "borrows")
      .exec();
  }

  async getUsers(limit = 25, page = 0) {
    return this.User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  async updateUserById(userId: string, userFields: PatchUserDto | PutUserDto) {
    const existingUser = await this.User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }
}

export default new UsersDao();

import mongoose from "mongoose";
import { BorrowDocument } from "../../borrows/daos/borrow.document";

interface UserDocument extends mongoose.Document {
    [x: string]: any;
    email: String,
    password: { type: String, select: false },
    name: String,
    isLibrarian: Boolean,
    borrows?: BorrowDocument[]
}

export { UserDocument };

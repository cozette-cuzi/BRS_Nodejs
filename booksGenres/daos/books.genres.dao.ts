import debug from "debug";
import shortid from "shortid";
import mongooseService from "../../common/services/mongoose.service";
import { CreateBookGenreDto } from "../dto/create.book.genre";

const log: debug.IDebugger = debug("app:books-genres-dao");

class BooksDao {
  Schema = mongooseService.getMongoose().Schema;
  bookGenreSchema = new this.Schema(
    {
      _id: String,
      bookId: String,
      genreId: String,
    },
    { id: false }
  );

  BookGenre = mongooseService
    .getMongoose()
    .model("BooksGenres", this.bookGenreSchema);

  constructor() {
    log("Created new instance of BooksGenresDao");
  }

  async addBookGenre(bookGenreFields: CreateBookGenreDto) {
    const bookGenreId = shortid.generate();
    const bookGenre = new this.BookGenre({
      _id: bookGenreId,
      ...bookGenreFields,
    });
    await bookGenre.save();
    return bookGenreId;
  }

  async removeBookGenreById(bookGenreId: string) {
    return this.BookGenre.deleteOne({ _id: bookGenreId }).exec();
  }

  async getByQuery(query: Object, limit = 25, page = 0) {
    return this.BookGenre.find(query)
      .limit(limit)
      .skip(limit * page)
      .exec();
  }
}

export default new BooksDao();

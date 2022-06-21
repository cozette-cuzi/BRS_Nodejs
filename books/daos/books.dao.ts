import debug from 'debug';
import shortid from 'shortid';
import mongooseService from '../../common/services/mongoose.service';
import { CreateBookDto } from '../dto/create.book.dto';
import { PatchBookDto } from '../dto/patch.book.dto';
import { PutBookDto } from '../dto/put.book.dto';

const log: debug.IDebugger = debug('app:books-dao');

class BooksDao {
    Schema = mongooseService.getMongoose().Schema;

    bookSchema = new this.Schema({
        _id: String,
        title: String,
        authors: String,
        releasedAt: Date,
        description: String,
        coverImage: String,
        pages: Number,
        languageCode: String,
        isbn: String,
        inStock: Number,
    }, { id: false });

    Book = mongooseService.getMongoose().model('Books', this.bookSchema);

    constructor() {
        log('Created new instance of BookDao');
    }

    async addBook(bookFields: CreateBookDto) {
        const bookId = shortid.generate();
        const book = new this.Book({
            _id: bookId,
            ...bookFields,
        });
        await book.save();
        return bookId;
    }

    async getBooks(limit = 25, page = 0) {
        return this.Book.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async updateBookById(
        bookId: string,
        bookFields: PatchBookDto | PutBookDto
    ) {
        const existingBook = await this.Book.findOneAndUpdate(
            { _id: bookId },
            { $set: bookFields },
            { new: true }
        ).exec();

        return existingBook;
    }

    async getBookById(bookId: string) {
        return this.Book.findOne({ _id: bookId }).populate('Book').exec();
    }

    async removeBookById(bookId: string) {
        return this.Book.deleteOne({ _id: bookId }).exec();
    }

    async getBookByIsbn(isbn: string) {
        return this.Book.findOne({ isbn: isbn }).exec();
    }
}

export default new BooksDao();
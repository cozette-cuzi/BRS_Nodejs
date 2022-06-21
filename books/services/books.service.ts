import { CRUD } from "../../common/interfaces/crud.interface";
import BooksDao from '../daos/books.dao';

import { CreateBookDto } from "../dto/create.book.dto";
import { PatchBookDto } from "../dto/patch.book.dto";
import { PutBookDto } from "../dto/put.book.dto";

class BooksService implements CRUD {
    async list(limit: number, page: number) {
        return BooksDao.getBooks(limit, page);
    }

    async create(resource: CreateBookDto) {
        return BooksDao.addBook(resource);
    }


    async putById(id: string, resource: PutBookDto): Promise<any> {
        return BooksDao.updateBookById(id, resource);
    }

    async readById(id: string) {
        return BooksDao.getBookById(id);
    }

    async deleteById(id: string) {
        return BooksDao.removeBookById(id);
    }
    
    async patchById(id: string, resource: PatchBookDto): Promise<any> {
        return BooksDao.updateBookById(id, resource);
    }
    
    async getBookByIsbn(isbn: string) {
        return BooksDao.getBookByIsbn(isbn);
    }
}

export default new BooksService();

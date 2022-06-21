import express from 'express';
import booksService from '../services/books.service';

class BooksMiddleware {
    async validateSameIsbnDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const user = await booksService.getBookByIsbn(req.body.isbn);
        if (user) {
            res.status(400).send({ errors: ['Book ISBN already exists'] });
        } else {
            next();
        }
    }

    async extractBookId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.bookId;
        next();
    }

    async validateBookExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const book = await booksService.readById(req.params.bookId);
        if (book) {
            res.locals.book = book;
            next();
        } else {
            res.status(404).send({
                errors: [`Book ${req.params.bookId} not found`],
            });
        }
    }
}

export default new BooksMiddleware();
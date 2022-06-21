import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import commonIsLibrarianPermission from "../common/middleware/common.is.librarian.permission";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import booksController from "./controllers/books.controller";
import { body } from "express-validator";
import booksMiddleware from "./middleware/books.middleware";


export class BooksRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'BooksRoutes');
    }
    configureRoutes(): Application {

        this.app
            .route(`/books`)
            .get(
                jwtMiddleware.validJWTNeeded,
                booksController.listBooks
            )
            .post(
                body('title').notEmpty(),
                body('authors').notEmpty(),
                body('isbn', 'Invalid ISBN').notEmpty().escape().isLength({min: 13, max:13})
                .matches(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/i),
                body('releasedAt', 'Date cannot be in future').notEmpty().isBefore(new Date().toString()),
                body('pages').notEmpty().isLength({min: 1}),
                body('inStock').notEmpty().isInt({ min:0,}),
                bodyValidationMiddleware.verifyBodyFieldsErrors,
                booksMiddleware.validateSameIsbnDoesntExist,
                jwtMiddleware.validJWTNeeded,
                commonIsLibrarianPermission.onlyLibrarian,
                booksController.createBook
            );

            this.app.param(`bookId`, booksMiddleware.extractBookId);
            this.app
            .route(`/books/:bookId`)
            .all(
                booksMiddleware.validateBookExists,
                jwtMiddleware.validJWTNeeded,
            )
            .get(booksController.getBookById)
            .delete(booksController.removeBook);
        return this.app;
    }
}
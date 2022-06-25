import { Application } from "express";
import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import borrowsController from "./controllers/borrows.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import borrowsMiddleware from "./middleware/borrows.middleware";
import borrowsService from "./services/borrows.service";
import booksMiddleware from "../books/middleware/books.middleware";
import commonIsLibrarianPermission from "../common/middleware/common.is.librarian.permission";

export class BorrowsRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "BorrowsRoutes");
  }

  configureRoutes(): Application {
    this.app
      .route(`/borrow/:bookId`)
      .post(
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        jwtMiddleware.validJWTNeeded,
        booksMiddleware.validateBookExists,
        borrowsMiddleware.validateBookNotAlreadyBorrowed,
        borrowsController.createBorrow
      );

    this.app
      .route(`/borrows/:borrowId`)
      .all(borrowsMiddleware.validateBorrowExists, jwtMiddleware.validJWTNeeded)
      .get(borrowsController.getBorrowById)
      .delete(borrowsController.removeBorrow);

    this.app.put(`/borrows/:borrowId`, [
      body(
        "status",
        `Status is required in ACCEPTED, REJECTED, PENDING, RETURNED.`
      )
        .notEmpty()
        .matches(/\b(?:ACCEPTED|REJECTED|PENDING|RETURNED)\b/),
      bodyValidationMiddleware.verifyBodyFieldsErrors,
      commonIsLibrarianPermission.onlyLibrarian,
      borrowsMiddleware.validateStatus,
      borrowsController.patchStatus,
    ]);

    return this.app;
  }
}

import { Application } from "express";
import express from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import borrowsController from "./controllers/borrows.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import borrowsMiddleware from "./middleware/borrows.middleware";

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
        borrowsController.createBorrow
      );

    this.app
      .route(`/borrows/:borrowId`)
      .all(borrowsMiddleware.validateBorrowExists, jwtMiddleware.validJWTNeeded)
      .get(borrowsController.getBorrowById)
      .delete(borrowsController.removeBorrow);
    return this.app;
  }
}

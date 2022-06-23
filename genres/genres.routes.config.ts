import { Application } from "express";
import { CommonRoutesConfig } from "../common/common.routes.config";
import express from "express";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import commonIsLibrarianPermission from "../common/middleware/common.is.librarian.permission";
import genresController from "./controllers/genres.controller";
import { body } from "express-validator";
import bodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import genresMiddleware from "./middleware/genres.middleware";

export class GenresRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "GenresRoutes");
  }

  configureRoutes(): Application {
    this.app
      .route(`/genres`)
      .get(jwtMiddleware.validJWTNeeded, genresController.listGenres)
      .post(
        body("name", "Name is required."),
        body(
          "style",
          `Style is required in primary, secondary, success, danger, warning, info, light, dark.`
        ).matches(
          /\b(?:primary|secondary|success|danger|warning|info|light|dark,)\b/
        ),
        bodyValidationMiddleware.verifyBodyFieldsErrors,
        jwtMiddleware.validJWTNeeded,
        commonIsLibrarianPermission.onlyLibrarian,
        genresController.createGenre
      );

    this.app
      .route(`/genres/:genreId`)
      .all(genresMiddleware.validateGenreExists, jwtMiddleware.validJWTNeeded)
      .get(genresController.getGenreById)
      .delete(
        commonIsLibrarianPermission.onlyLibrarian,
        genresController.removeGenre
      );

    return this.app;
  }
}

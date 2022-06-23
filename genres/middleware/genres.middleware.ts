import express from "express";
import genresService from "../services/genres.service";

class GenresMiddleware {
  async validateGenreExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const genre = await genresService.readById(req.params.genreId);
    if (genre) {
      res.locals.genre = genre;
      next();
    } else {
      res.status(404).send({
        errors: [`Genre ${req.params.genreId} not found`],
      });
    }
  }
}

export default new GenresMiddleware();

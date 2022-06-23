import debug from "debug";
import express from "express";
import genresService from "../services/genres.service";

const log: debug.IDebugger = debug("app:genres-controller");
class GenresController {
  async listGenres(req: express.Request, res: express.Response) {
    const genres = await genresService.list(100, 0);
    res.status(200).send(genres);
  }

  async getGenreById(req: express.Request, res: express.Response) {
    const user = await genresService.readById(req.params.genreId);
    res.status(200).send(user);
  }

  async createGenre(req: express.Request, res: express.Response) {
    const genreId = await genresService.create(req.body);
    res.status(201).send({ id: genreId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await genresService.patchById(req.params.genreId, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await genresService.putById(req.params.genreId, req.body));
    res.status(204).send();
  }

  async removeGenre(req: express.Request, res: express.Response) {
    log(await genresService.deleteById(req.params.genreId));
    res.status(204).send();
  }
}

export default new GenresController();

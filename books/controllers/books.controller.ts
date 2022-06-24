import express from "express";
import debug from "debug";
import booksService from "../services/books.service";
const log: debug.IDebugger = debug("app:books-controller");
class BooksController {
  async listBooks(req: express.Request, res: express.Response) {
    const books = await booksService.list(100, 0);
    res.status(200).send(books);
  }

  async getBookById(req: express.Request, res: express.Response) {
    const book = await booksService.readById(req.body.id);
    res.status(200).send(book);
  }

  async createBook(req: express.Request, res: express.Response) {
    const bookId = await booksService.create(req.body);
    res.status(201).send({ id: bookId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await booksService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await booksService.putById(req.body.id, req.body));
    res.status(204).send();
  }

  async removeBook(req: express.Request, res: express.Response) {
    log(await booksService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new BooksController();

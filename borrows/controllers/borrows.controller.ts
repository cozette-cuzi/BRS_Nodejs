import debug from "debug";
import express from "express";
import borrowsService from "../services/borrows.service";

const log: debug.IDebugger = debug("app:borrows-controller");
class BorrowsController {
  async listBorrows(req: express.Request, res: express.Response) {
    let borrows: any;
    if (req.body.status) {
      borrows = await borrowsService.listByStatus(req.body.status, 100, 0);
    } else if (req.body.readerId) {
      borrows = await borrowsService.listByReaderId(req.body.readerId, 100, 0);
    } else {
      borrows = await borrowsService.list(100, 0);
    }
    res.status(200).send(borrows);
  }

  async getBorrowById(req: express.Request, res: express.Response) {
    const borrow = await borrowsService.readById(req.body.id);
    res.status(200).send(borrow);
  }

  async createBorrow(req: express.Request, res: express.Response) {
    req.body.readerId = res.locals.jwt.userId;
    req.body.bookId = req.params.bookId;
    const borrowId = await borrowsService.create(req.body);
    res.status(201).send({ id: borrowId });
  }

  async patch(req: express.Request, res: express.Response) {
    log(await borrowsService.patchById(req.params.id, req.body));
    res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    log(await borrowsService.putById(req.params.id, req.body));
    res.status(204).send();
  }

  async removeBorrow(req: express.Request, res: express.Response) {
    log(await borrowsService.deleteById(req.params.id));
    res.status(204).send();
  }
}

export default new BorrowsController();

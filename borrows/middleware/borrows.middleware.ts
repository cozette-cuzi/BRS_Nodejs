import express from "express";
import borrowsService from "../services/borrows.service";

class BorrowsMiddleware {
  async validateBorrowExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const borrow = await borrowsService.readById(req.params.borrowId);
    if (borrow) {
      res.locals.borrow = borrow;
      next();
    } else {
      res.status(404).send({
        errors: [`Borrow ${req.params.bookId} not found`],
      });
    }
  }
}

export default new BorrowsMiddleware();

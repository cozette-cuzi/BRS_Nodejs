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

  async validateBookNotAlreadyBorrowed(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const borrow = await borrowsService.getByIds(
      res.locals.jwt.userId,
      req.params.bookId
    );

    if (borrow) {
      console.log(borrow);
      res.status(400).send({
        errors: [`Book ${req.params.bookId} is already borrowed`],
      });
    } else {
      next();
    }
  }
}

export default new BorrowsMiddleware();

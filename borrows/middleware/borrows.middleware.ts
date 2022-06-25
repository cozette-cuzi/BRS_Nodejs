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
        errors: [`Borrow ${req.params.borrowId} not found`],
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
      res.status(400).send({
        errors: [`Book ${req.params.bookId} is already borrowed`],
      });
    } else {
      next();
    }
  }

  async validateStatus(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const borrow = await borrowsService.readById(req.params.borrowId);
    let newStatus = req.body.status;
    let oldStatus = borrow.status;
    let isValidStatus =
      (newStatus == "PENDING" && ["PENDING"].includes(oldStatus)) ||
      (newStatus == "ACCEPTED" &&
        ["ACCEPTED", "PENDING"].includes(oldStatus)) ||
      (newStatus == "RETURNED" &&
        ["RETURNED", "ACCEPTED"].includes(oldStatus)) ||
      (newStatus == "REJECTED" && ["REJECTED", "PENDING"].includes(oldStatus));
    if (isValidStatus) {
      next();
    } else {
      res.status(400).send({
        errors: [
          `You cannot change status from ${borrow.status} to ${req.body.status}`,
        ],
      });
    }
  }

  isValidStatus = (oldStatus: string, newStatus: string): Boolean => {
    return (
      (newStatus == "PENDING" && ["PENDING"].includes(oldStatus)) ||
      (newStatus == "ACCEPTED" &&
        ["ACCEPTED", "PENDING"].includes(oldStatus)) ||
      (newStatus == "RETURNED" &&
        ["RETURNED", "ACCEPTED"].includes(oldStatus)) ||
      (newStatus == "REJECTED" && ["REJECTED", "PENDING"].includes(oldStatus))
    );
  };
}

export default new BorrowsMiddleware();

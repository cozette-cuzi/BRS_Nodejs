import { CRUD } from "../../common/interfaces/crud.interface";
import borrowsDao from "../daos/borrows.dao";
import { CreateBorrowDto } from "../dto/create.borrow.dto";
import { PatchBorrowDto } from "../dto/patch.borrow.dto";
import { PutBorrowDto } from "../dto/put.borrow.dto";

class BorrowsService implements CRUD {
  async list(limit: number, page: number) {
    return borrowsDao.getBorrows(limit, page);
  }

  async listByStatus(status: String, limit: number, page: number) {
    return borrowsDao.getBorrowsByStatus(status, limit, page);
  }

  async listByReaderId(readerId: String, limit: number, page: number) {
    return borrowsDao.getBorrowsByReaderId(readerId, limit, page);
  }

  async create(resource: CreateBorrowDto) {
    return borrowsDao.addBorrow(resource);
  }
  async putById(id: string, resource: PutBorrowDto) {
    return borrowsDao.updateBorrowById(id, resource);
  }

  async readById(id: string) {
    return borrowsDao.getBorrowById(id);
  }

  async deleteById(id: string) {
    return borrowsDao.removeBorrowById(id);
  }

  async patchById(id: string, resource: PatchBorrowDto) {
    return borrowsDao.updateBorrowById(id, resource);
  }

  async getByIds(readerId: string, bookId: string) {
    return borrowsDao.getBorrowByData({ readerId: readerId, bookId: bookId });
  }
}

export default new BorrowsService();

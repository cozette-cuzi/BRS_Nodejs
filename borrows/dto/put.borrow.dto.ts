export interface PutBorrowDto {
  readerId?: String;
  bookId?: String;
  status?: String;
  requestProcessedAt?: Date;
  requestManagedBy?: String;
  deadline?: Date;
  returnedAt?: Date;
  returnManagedBy?: String;
}

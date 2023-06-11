import { Book } from "./Book";
import { User } from "./User";
export interface Loan {
  id: number;
  borrowDate: Date;
  returnDate: Date;
  isReturned: boolean;
  book: Book;
  user: User;
}

export interface CreateLoanDTO {
  bookId: number;
  userId: number;
  borrowDate: Date;
}

export interface EndLoanDTO {
  loanId: number;
  returnDate: Date;
}
import { Category } from "../../categories/types";

export type Transaction = {
  id?: string;
  name: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  date: string;
  category: Category;
};

export type TransactionType = {
  _id: string;
  name: string;
};

export type CreateTransactionDTO = {
  data: {
    name: string;
    amount: number;
    type: "EXPENSE" | "INCOME";
    date: Date;
    category: string;
  };
};

export type EditTransactionDTO = {
  name: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  date: Date;
  category: string;
};

export type UpdateTransactionDTO = {
  id: string | undefined;
  transaction: EditTransactionDTO;
};

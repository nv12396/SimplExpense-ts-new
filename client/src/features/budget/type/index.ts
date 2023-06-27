import { Category } from "../../categories/types";

export type BudgetDTO = {
  id: string;
  name: string;
  category: Category;
  limit: number;
  amount: number;
};

export type AddBudgetDTO = {
  name: string;
  category: Category;
  limit: number;
};

export type CreateBudgetDTO = {
  data: {
    name: string;
    category: string;
    limit: number;
  };
};

export type UpdateBudgetDTO = {
  id: string;
  data: {
    limit: number;
  };
};

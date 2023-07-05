export type TotalAmountDTO = {
  id: string;
  amount: number;
} | null;

export type CreateTotalAmountDTO = {
  data: {
    amount: number;
  };
};

export type UpdateTotalAmountDTO = {
  data: {
    amount: number;
  };
  id: string;
};

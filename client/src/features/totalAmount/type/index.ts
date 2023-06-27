export type TotalAmountDTO = {
  id: string;
  amount: number;
};

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

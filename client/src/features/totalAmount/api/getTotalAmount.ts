import { TRANSACTION_KEYS } from "./../../transactions/api/getTransactions";
import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { ExtractFnReturnType, QueryConfig } from "../../../lib/react-query";

import { TotalAmountDTO } from "../type";

export const TOTAL_AMOUNT_KEYS = {
  fetchTotalAmount: () => ["transactions", "transactions", "totalAmount"],
};

export const getTotalAmount = (): Promise<TotalAmountDTO> => {
  return axios.get("/total-amount");
};

type QueryFnType = typeof getTotalAmount;

type UseTotalAmountOptions = {
  config?: QueryConfig<QueryFnType>;
  sortBy?: string;
};

export const useGetTotalAmount = ({ config }: UseTotalAmountOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [TRANSACTION_KEYS.fetchTransactions(), TRANSACTION_KEYS.sortBy()],
    queryFn: () => getTotalAmount(),
  });
};

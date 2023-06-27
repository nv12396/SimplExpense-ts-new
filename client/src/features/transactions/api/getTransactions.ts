import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { QueryConfig } from "../../../lib/react-query";
import { ExtractFnReturnType } from "../../../lib/react-query";
import { Transaction } from "../types";

export const TRANSACTION_KEYS = {
  fetchTransactions: () => ["transactions", "transaction"],
  sortBy: () => ["newest", "oldest"],
};

export const getTransactions = (sortBy = "newest"): Promise<Transaction[]> => {
  return axios.get(`transactions/get-transactions/${sortBy}`);
};

type QueryFnType = typeof getTransactions;

type UseTransactionsOptions = {
  config?: QueryConfig<QueryFnType>;
  sortBy?: string;
};

export const useGetTransactions = ({
  config,
  sortBy,
}: UseTransactionsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [
      TRANSACTION_KEYS.fetchTransactions(),
      TRANSACTION_KEYS.sortBy(),
      sortBy,
    ],
    queryFn: () => getTransactions(sortBy),
  });
};

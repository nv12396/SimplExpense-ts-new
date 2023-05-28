import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { QueryConfig } from "../../../lib/react-query";
import { ExtractFnReturnType } from "../../../lib/react-query";
import { Transaction } from "../types";

export const TRANSACTION_KEYS = {
  fetchTransactions: () => ["transactions", "transaction"],
};

export const getTransactions = (): Promise<Transaction[]> => {
  return axios.get("transactions");
};

type QueryFnType = typeof getTransactions;

type UseTransactionsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetTransactions = ({ config }: UseTransactionsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: TRANSACTION_KEYS.fetchTransactions(),
    queryFn: () => getTransactions(),
  });
};

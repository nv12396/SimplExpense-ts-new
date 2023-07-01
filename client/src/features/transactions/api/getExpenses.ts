import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { QueryConfig } from "../../../lib/react-query";
import { ExtractFnReturnType } from "../../../lib/react-query";
import { TRANSACTION_KEYS } from "./getTransactions";

export const getExpenses = (): Promise<number> => {
  return axios.get(`transactions/expenses`);
};

type QueryFnType = typeof getExpenses;

type UseGetExpenses = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetExpenses = ({ config }: UseGetExpenses = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [
      TRANSACTION_KEYS.fetchTransactions(),
      TRANSACTION_KEYS.sortBy(),
      "EXPENSE",
    ],
    queryFn: getExpenses,
  });
};

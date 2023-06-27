import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { QueryConfig } from "../../../lib/react-query";
import { ExtractFnReturnType } from "../../../lib/react-query";
import { TRANSACTION_KEYS } from "./getTransactions";

export const getIncome = (): Promise<number> => {
  return axios.get(`transactions/income`);
};

type QueryFnType = typeof getIncome;

type UseGetIncomeOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const UseGetIncome = ({ config }: UseGetIncomeOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [
      TRANSACTION_KEYS.fetchTransactions(),
      TRANSACTION_KEYS.sortBy(),
      "INCOME",
    ],
    queryFn: getIncome,
  });
};

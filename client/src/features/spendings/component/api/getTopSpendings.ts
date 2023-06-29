import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../../lib/axios";

import { ExtractFnReturnType, QueryConfig } from "../../../../lib/react-query";
import { TRANSACTION_KEYS } from "../../../transactions/api/getTransactions";

import { SpendingsDTO } from "../../type";

export const getTopSpendings = (): Promise<SpendingsDTO> => {
  return axios.get("/transactions/spendings");
};

type QueryFnType = typeof getTopSpendings;

type UseTopSpendingsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetTopSpendings = ({ config }: UseTopSpendingsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [
      TRANSACTION_KEYS.fetchTransactions(),
      TRANSACTION_KEYS.sortBy(),
      "spendings",
    ],
    queryFn: () => getTopSpendings(),
  });
};

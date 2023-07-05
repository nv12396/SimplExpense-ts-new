import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { QueryConfig } from "../../../lib/react-query";
import { ExtractFnReturnType } from "../../../lib/react-query";
import { TRANSACTION_KEYS } from "./getTransactions";

import { ChartDataDTO } from "../types";

export const getChartData = (): Promise<ChartDataDTO[]> => {
  return axios.get(`transactions/chart-data`);
};

type QueryFnType = typeof getChartData;

type UseGetChartData = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetChartData = ({ config }: UseGetChartData = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [
      TRANSACTION_KEYS.fetchTransactions(),
      TRANSACTION_KEYS.sortBy(),
      "chart",
    ],
    queryFn: getChartData,
  });
};

import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { ExtractFnReturnType, QueryConfig } from "../../../lib/react-query";

import { BudgetDTO } from "../type";

export const BUDGET_KEYS = {
  fetchBudget: () => ["budget"],
};

export const getBudgets = (): Promise<BudgetDTO[]> => {
  return axios.get("/budget");
};

type QueryFnType = typeof getBudgets;

type UseGetBudgetOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetBudget = ({ config }: UseGetBudgetOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: BUDGET_KEYS.fetchBudget(),
    queryFn: () => getBudgets(),
  });
};

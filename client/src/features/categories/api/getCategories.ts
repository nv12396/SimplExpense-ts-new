import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { ExtractFnReturnType, QueryConfig } from "../../../lib/react-query";
import { Category } from "../types";

export const getCategories = (): Promise<Category[]> => {
  return axios.get("/categories");
};

type QueryFnType = typeof getCategories;

type UseCategoriesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useGetCategories = ({ config }: UseCategoriesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

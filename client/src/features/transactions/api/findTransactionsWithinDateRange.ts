import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { QueryConfig } from "../../../lib/react-query";
import { ExtractFnReturnType } from "../../../lib/react-query";
import { Transaction, TransactionDateDTO } from "../types";
import { TRANSACTION_KEYS } from "./getTransactions";
import { useDateRangeFilterStore } from "../../../stores/date-range-filter";

export const findTransactionsWithinDateRange = (
  dates: TransactionDateDTO
): Promise<Transaction[] | undefined> => {
  const {
    startDateYear,
    startDateMonth,
    startDateDay,
    endDateYear,
    endDateMonth,
    endDateDay,
  } = dates;
  return axios.get(
    `transactions/dateRange/${startDateYear}/${startDateMonth}/${startDateDay}/${endDateYear}/${endDateMonth}/${endDateDay}`
  );
};

type QueryFnType = typeof findTransactionsWithinDateRange;

type UsefindTransactionsWithinDateRangeOptions = {
  config?: QueryConfig<QueryFnType>;
  startDate?: Date;
  endDate?: Date;
};

// export const useFindTransactionsWithinDateRange = ({
//   config,
//   startDate,
//   endDate,
// }: UsefindTransactionsWithinDateRangeOptions = {}) => {
//   const { startFilterDate, endFilterDate } = useDateRangeFilterStore();

//   return useQuery<ExtractFnReturnType<QueryFnType>>({
//     ...config,
//     queryKey: [
//       TRANSACTION_KEYS.fetchTransactions(),
//       TRANSACTION_KEYS.sortBy(),
//       startFilterDate,
//       endFilterDate,
//     ],
//     queryFn: () => findTransactionsWithinDateRange(startDate, endDate),
//   });
// };

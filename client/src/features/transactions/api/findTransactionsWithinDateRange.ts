import { axios } from "../../../lib/axios";

import { Transaction, TransactionDateDTO } from "../types";

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

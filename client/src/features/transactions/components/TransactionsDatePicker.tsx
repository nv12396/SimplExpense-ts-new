import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./CustomCalendar.css";
import { useDateRangeStore } from "../../../stores/date-range";
import { useDateRangeFilterStore } from "../../../stores/date-range-filter";

export const TransactionsDatePicker = () => {
  const { setStartDate, setEndDate } = useDateRangeStore();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const { setStartFilterDate, setEndFilterDate } = useDateRangeFilterStore();

  const handleSelect = (ranges: any) => {
    setDateRange([ranges.selection]);
    setStartDate(ranges.selection.startDate);
    setStartFilterDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
    setEndFilterDate(ranges.selection.endDate);
  };

  return (
    <div className="flex items-center justify-center w-full h-full mb-20 md:mb-0">
      <DateRangePicker
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        onChange={handleSelect}
        className="date-range-picker"
      />
    </div>
  );
};

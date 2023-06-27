import { create } from "zustand";

type DateRangeStore = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
};

export const useDateRangeStore = create<DateRangeStore>()((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (date) => set((state) => ({ ...state, startDate: date })),
  setEndDate: (date) => set((state) => ({ ...state, endDate: date })),
}));

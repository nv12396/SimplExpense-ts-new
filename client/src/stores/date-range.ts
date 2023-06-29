import { create } from "zustand";

type DateRangeStore = {
  startDate: Date;
  endDate: Date;
  setStartDate: (startDate: Date) => void;
  setEndDate: (endDate: Date) => void;
};

export const useDateRangeStore = create<DateRangeStore>()((set) => ({
  startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  setStartDate: (date) => set((state) => ({ ...state, startDate: date })),
  setEndDate: (date) => set((state) => ({ ...state, endDate: date })),
}));

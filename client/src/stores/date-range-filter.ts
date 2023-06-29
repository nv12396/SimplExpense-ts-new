import { create } from "zustand";

type DateRangeStore = {
  startFilterDate: Date | undefined;
  endFilterDate: Date | undefined;
  setStartFilterDate: (startDate: Date) => void;
  setEndFilterDate: (endDate: Date) => void;
};

export const useDateRangeFilterStore = create<DateRangeStore>()((set) => ({
  startFilterDate: undefined,
  endFilterDate: undefined,
  setStartFilterDate: (date) => set((state) => ({ ...state, startDate: date })),
  setEndFilterDate: (date) => set((state) => ({ ...state, endDate: date })),
}));

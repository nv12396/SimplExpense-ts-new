import { create } from "zustand";

type MonthStore = {
  month: string;
  selectedMonth: (month: string) => void;
};

export const useMonthStore = create<MonthStore>()((set) => ({
  month: new Date().toLocaleString("default", { month: "short" }),
  selectedMonth: (month) => set((state) => ({ ...state, month: month })),
}));

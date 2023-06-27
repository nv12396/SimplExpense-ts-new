import { create } from "zustand";

type TModal = {
  addBudgetModalIsOpen: boolean;
  addBudgetOpenModal: () => void;
  addBudgetCloseModal: () => void;
};

export const useAddBudgetModal = create<TModal>((set) => ({
  addBudgetModalIsOpen: false,
  addBudgetOpenModal: () => set({ addBudgetModalIsOpen: true }),
  addBudgetCloseModal: () => set({ addBudgetModalIsOpen: false }),
}));

import { create } from "zustand";

type TModal = {
  addTransactionModalIsOpen: boolean;
  addTransactionOpenModal: () => void;
  addTransactionCloseModal: () => void;
};

export const useAddTransactionModal = create<TModal>((set) => ({
  addTransactionModalIsOpen: false,
  addTransactionOpenModal: () => set({ addTransactionModalIsOpen: true }),
  addTransactionCloseModal: () => set({ addTransactionModalIsOpen: false }),
}));

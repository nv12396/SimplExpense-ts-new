import { create } from "zustand";

type TModal = {
  addTotalAmountModalIsOpen: boolean;
  addTotalAmountOpenModal: () => void;
  addTotalAmountCloseModal: () => void;
};

export const useAddTotalAmountModal = create<TModal>((set) => ({
  addTotalAmountModalIsOpen: false,
  addTotalAmountOpenModal: () => set({ addTotalAmountModalIsOpen: true }),
  addTotalAmountCloseModal: () => set({ addTotalAmountModalIsOpen: false }),
}));

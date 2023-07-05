import { create } from "zustand";
import { EditBudgetDTO } from "../features/budget/type";

type TModal = {
  addBudgetModalIsOpen: boolean;
  budgetToEdit: EditBudgetDTO;
  addBudgetToEdit: (budget: EditBudgetDTO) => void;
  addBudgetOpenModal: () => void;
  addBudgetCloseModal: () => void;
};

export const useAddBudgetModal = create<TModal>((set) => ({
  addBudgetModalIsOpen: false,
  budgetToEdit: null,
  addBudgetToEdit: (budget) => set({ budgetToEdit: budget }),
  addBudgetOpenModal: () => set({ addBudgetModalIsOpen: true }),
  addBudgetCloseModal: () => set({ addBudgetModalIsOpen: false }),
}));

// const [budgetToEdit, setBudgetToEdit] = useState<BudgetDTO | null>(null);

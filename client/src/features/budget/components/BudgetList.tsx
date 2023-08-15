import { useGetBudget } from "../api/getBudget";
import BudgetCard from "./BudgetCard";
import { AddBudgetModal } from "./AddBudgetModal";
import { useAddBudgetModal } from "../../../stores/budgetModal";
import { Spinner } from "../../../components/Elements/Spinner/Spinner";

import { BudgetDTO } from "../type";

export const BudgetList = () => {
  // const [budgetToEdit, setBudgetToEdit] = useState<BudgetDTO | null>(null);

  const { data: budgets, isLoading } = useGetBudget();

  const {
    addBudgetModalIsOpen,
    addBudgetCloseModal,
    budgetToEdit,
    addBudgetToEdit,
  } = useAddBudgetModal();

  console.log("budgetToEdit", budgetToEdit);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!budgets?.length) {
    return (
      <div className="mt-28 text-lg text-gray-500 mx-auto">
        <p>Please add budget.</p>
      </div>
    );
  }

  return (
    <div className="mt-20 px-6 md:px-0 md:grid md:grid-cols-3 gap-6 flex flex-col md:gap-8 overflow-y-scroll min-h-[50vh] max-h-[50vh]">
      {budgets?.map((budget: BudgetDTO) => (
        <div onClick={() => addBudgetToEdit(budget)} key={budget.id}>
          <BudgetCard
            id={budget.id}
            name={budget.name}
            limit={budget.limit}
            amount={budget.amount}
            category={budget.category}
          />
        </div>
      ))}
      <AddBudgetModal
        addBudgetToEdit={addBudgetToEdit}
        AddBudgetCloseModal={addBudgetCloseModal}
        addBudgetModalIsOpen={addBudgetModalIsOpen}
        existingBudget={budgetToEdit}
      />
    </div>
  );
};

import { useState } from "react";

import ContentLayout from "../../../components/Layout/ContentLayout";
import { AddBudgetModal } from "../components/AddBudgetModal";
import { BudgetDTO } from "../type";
import { useAddBudgetModal } from "../../../stores/budgetModal";
import { useGetBudget } from "../api/getBudget";
import BudgetCard from "../components/BudgetCard";

export const Budget = () => {
  const [budgetToEdit, setBudgetToEdit] = useState<BudgetDTO | null>(null);

  const { addBudgetModalIsOpen, addBudgetCloseModal, addBudgetOpenModal } =
    useAddBudgetModal();

  const { data: budgets } = useGetBudget();
  return (
    <ContentLayout title="Budget">
      <div className="flex flex-col container md:mx-auto gap-6 md:w-[75vw] h-[75vh]">
        {(budgets ?? []).length > 0 && (
          <div className="mt-20 px-6 md:px-0 md:grid md:grid-cols-3 md:gap-8 flex flex-col gap-4 overflow-y-scroll min-h-[55vh] max-h-[55vh]">
            {budgets?.map((budget: BudgetDTO) => (
              <div onClick={() => setBudgetToEdit(budget)}>
                <BudgetCard
                  id={budget.id}
                  name={budget.name}
                  limit={budget.limit}
                  amount={budget.amount}
                  category={budget.category}
                />
              </div>
            ))}
          </div>
        )}
        {(budgets ?? []).length < 1 && (
          <div className="mt-28 text-lg text-gray-500 mx-auto">
            <p>Please add budget.</p>
          </div>
        )}
        <div
          className="hidden md:block btn w-32 border-blue-400 text-blue-400 hover:bg-[#eff6ff] hover:border-blue-400 bg-white mx-auto"
          onClick={() => {
            setBudgetToEdit(null);
            addBudgetOpenModal();
          }}
        >
          <p className="mt-4">Add Budget</p>
        </div>
      </div>
      <AddBudgetModal
        setBudgetToEdit={setBudgetToEdit}
        AddBudgetCloseModal={addBudgetCloseModal}
        addBudgetModalIsOpen={addBudgetModalIsOpen}
        existingBudget={budgetToEdit}
      />
    </ContentLayout>
  );
};

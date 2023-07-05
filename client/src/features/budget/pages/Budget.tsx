import ContentLayout from "../../../components/Layout/ContentLayout";
import { useAddBudgetModal } from "../../../stores/budgetModal";
import { BudgetList } from "../components/BudgetList";

export const Budget = () => {
  const { addBudgetOpenModal, addBudgetToEdit } = useAddBudgetModal();

  return (
    <ContentLayout title="Budget">
      <div className="flex flex-col container md:mx-auto gap-6 md:w-[70vw] h-[75vh]">
        <BudgetList />
        <div
          className="hidden md:block btn w-32 border-blue-400 text-blue-400 hover:bg-[#eff6ff] hover:border-blue-400 bg-white mx-auto"
          onClick={() => {
            addBudgetToEdit(null);
            addBudgetOpenModal();
          }}
        >
          <p className="mt-4">Add Budget</p>
        </div>
      </div>
    </ContentLayout>
  );
};

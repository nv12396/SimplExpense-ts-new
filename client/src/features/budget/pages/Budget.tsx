import ContentLayout from "../../../components/Layout/ContentLayout";
import Button from "../../../components/ui/Button";
import { useAddBudgetModal } from "../../../stores/budgetModal";
import { BudgetList } from "../components/BudgetList";

export const Budget = () => {
  const { addBudgetOpenModal, addBudgetToEdit } = useAddBudgetModal();

  return (
    <ContentLayout title="Budget">
      <div className="flex flex-col gap-6 h-[75vh]">
        <BudgetList />
        <Button
          className="hidden md:flex w-[150px] mx-auto items-center justify-center"
          onClick={() => {
            addBudgetToEdit(null);
            addBudgetOpenModal();
          }}
        >
          <p>Add Budget</p>
        </Button>
      </div>
    </ContentLayout>
  );
};

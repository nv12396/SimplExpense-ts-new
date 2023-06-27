import ContentLayout from "../../../components/Layout/ContentLayout";
import { TransactionTable } from "../components/TransactionTable";
import { TransactionsDatePicker } from "../components/TransactionsDatePicker";

export const Transactions = () => {
  return (
    <ContentLayout title="Transactions">
      <div className="flex container mx-auto gap-6 flex-col md:flex-row">
        <div className="basis-1/2">
          <TransactionTable className="min-h-[480px] h-[480px] max-h-[480px] " />
        </div>
        <div className="basis-1/2">
          <TransactionsDatePicker />
        </div>
      </div>
    </ContentLayout>
  );
};

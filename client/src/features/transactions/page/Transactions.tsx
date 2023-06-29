import ContentLayout from "../../../components/Layout/ContentLayout";
import { TransactionTable } from "../components/TransactionTable";
import { TransactionTableFilter } from "../components/TransactionTableFilter";
import { TransactionsDatePicker } from "../components/TransactionsDatePicker";

export const Transactions = () => {
  return (
    <ContentLayout title="Transactions">
      <div className="flex container mx-auto flex-col md:flex-row max-w-55vw]">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] gap-12 mx-auto">
          <div className="basis-1/2 md:ml-[50px]">
            <TransactionTableFilter className="min-h-[480px] h-[480px] max-h-[480px]" />
          </div>
          <div className="md:mr-[50px] basis-1/4 w-full">
            <p className="text-gray-700 text-center text-xl mb-4">
              Filter by date range
            </p>
            <TransactionsDatePicker />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

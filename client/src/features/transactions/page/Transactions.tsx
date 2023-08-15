import ContentLayout from "../../../components/Layout/ContentLayout";
import { TransactionTableFilter } from "../components/TransactionTableFilter";
import { TransactionsDatePicker } from "../components/TransactionsDatePicker";

export const Transactions = () => {
  return (
    <ContentLayout title="Transactions">
      <div className="flex container mx-auto flex-col md:flex-row max-w-55vw]">
        <div className="flex flex-col md:flex-row items-center justify-center w-[90%] gap-12 mx-auto">
          <div className="">
            <TransactionTableFilter className="min-h-[45vh] h-[45vh] max-h-[45vh]" />
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

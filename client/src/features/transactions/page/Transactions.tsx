import ContentLayout from "../../../components/Layout/ContentLayout";
import { TransactionTableFilter } from "../components/TransactionTableFilter";
import { TransactionsDatePicker } from "../components/TransactionsDatePicker";

export const Transactions = () => {
  return (
    <ContentLayout title="Transactions">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 mx-auto">
        <TransactionTableFilter className="min-h-[500px] h-[500px] max-h-[500px] md:h-[45vh] md:max-h-[45vh] 3xl:min-h-[58vh] 3xl:h-[58vh] 3xl:max-h-[58vh]" />
        <div className="md:mr-[100px] 3xl:mr-[200px] basis-1/4 w-full">
          <p className="text-gray-700 text-center text-xl mb-4">
            Filter by date range
          </p>
          <TransactionsDatePicker />
        </div>
      </div>
    </ContentLayout>
  );
};

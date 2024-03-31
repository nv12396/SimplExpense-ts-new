import { Transaction } from "../types/index";
import { formatDate } from "../../../utils/format-date";
type TransactionTableDemoProps = {
  transactions: Transaction[] | undefined;
};
const TransactionTableDemo = ({ transactions }: TransactionTableDemoProps) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="bg-white">Name</th>
              <th className="bg-white">Category</th>
              <th className="bg-white">Amount</th>
              <th className="bg-white">Status</th>
              <th className="bg-white">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white shadow-lg">
            {transactions?.map((transaction) => (
              <tr className="text-black px-4 shadow-lg">
                <th className="bg-white border-b-1 border-gray-200">
                  {transaction?.name}
                </th>
                <td className="bg-white border-b-1 border-gray-200">
                  {transaction?.category.name}
                </td>
                <td className="bg-white border-b-1 border-gray-200">
                  {transaction?.amount}
                </td>
                <td className="bg-white border-b-1 border-gray-200">
                  <div
                    className={
                      transaction.type === "INCOME"
                        ? "px-4 py-2 text-[#49c5b6] bg-green-200 text-sm rounded-full"
                        : "px-4 py-2 text-red-600 bg-rose-200 text-sm rounded-full"
                    }
                  >
                    {transaction?.type.toLocaleLowerCase()}
                  </div>
                </td>
                <td className="bg-white border-b-1 border-gray-200">
                  {formatDate(transaction?.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionTableDemo;

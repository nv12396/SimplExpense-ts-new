import * as z from "zod";
import Modal from "react-modal";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import { SelectField } from "../../../components/Form/SelectField";
import { useGetCategories } from "../../categories/api/getCategories";
import { useCreateTransaction } from "../api/createTransaction";
import { useDeleteTransaction } from "../api/deleteTransaction";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Category } from "../../categories/types";
import { CreateTransactionDTO } from "../types";
import { UseEditTransaction } from "../api/editTransaction";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    border: "none",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#1f1f2c",
  },
};
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Name is required"),
  amount: z.number().min(1, "Please enter amount"),
  category: z.string().min(1, "Category is required"),
  date: z.date({ required_error: "Date is required" }),
});

export type AddTransactionsValues = {
  id?: string | undefined;
  name: string;
  amount: number;
  category: Category;
  date: string;
};

type AddTransactionModalPropsType = {
  addTransactionModalIsOpen: boolean;
  AddTransactionCloseModal: () => void;
  existingTransaction?: AddTransactionsValues | null;
};

export const AddTransactionModal = ({
  addTransactionModalIsOpen,
  AddTransactionCloseModal,
  existingTransaction,
}: AddTransactionModalPropsType) => {
  const { data: categories } = useGetCategories();

  const createTransactionMutation = useCreateTransaction();

  const { mutateAsync: deleteTransaction } = useDeleteTransaction();

  const { mutateAsync: editTransaction } = UseEditTransaction();

  const transactionType = [
    {
      _id: "1",
      name: "EXPENSE",
    },
    {
      _id: "2",
      name: "INCOME",
    },
  ];

  return (
    <Modal
      isOpen={addTransactionModalIsOpen}
      onRequestClose={AddTransactionCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center mb-4 border-round">
        {existingTransaction ? <p>Edit Transaction</p> : <p>Add Transaction</p>}
        <div className="w-5 cursor-pointer" onClick={AddTransactionCloseModal}>
          <XMarkIcon />
        </div>
      </div>
      <div>
        <Form<CreateTransactionDTO["data"], typeof schema>
          onSubmit={async (values) => {
            if (!existingTransaction) {
              await createTransactionMutation.mutateAsync({ data: values });
            } else {
              await editTransaction({
                id: existingTransaction.id,
                transaction: values,
              });
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <div className="flex flex-col gap-4">
              <InputField
                type="text"
                placeholder="Please enter transaction name"
                className="w-full"
                registration={register("name")}
                error={formState.errors["name"]}
                defaultValue={existingTransaction?.name}
              />

              <div className="flex justify-between w-full min-w-full gap-4 items-center">
                <div className="basis-1/2">
                  <SelectField
                    options={categories}
                    placeholder="Category"
                    error={formState.errors["category"]}
                    registration={register("category")}
                    className="mb-3 h-[45px] basis-1/2"
                    type="CATEGORY"
                    defaultValue={existingTransaction?.category.name}
                  />
                </div>
                <div className="basis-1/2">
                  <SelectField
                    options={transactionType}
                    placeholder="Type"
                    error={formState.errors["type"]}
                    registration={register("type")}
                    className="mb-3 h-[45px] basis-1/2"
                    type="TYPE"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="basis-1/2">
                  <InputField
                    type="tel"
                    placeholder="Amount"
                    className="w-full"
                    registration={register("amount", { valueAsNumber: true })}
                    error={formState.errors["amount"]}
                    defaultValue={existingTransaction?.amount}
                  />
                </div>
                <div className="basis-1/2">
                  <InputField
                    type="date"
                    placeholder="Date"
                    className="w-full"
                    registration={register("date", { valueAsDate: true })}
                    error={formState.errors["date"]}
                    defaultValue={existingTransaction?.date?.slice(1, 10)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-around gap-4">
                <button
                  className="btn bg-secondaryGreen text-black hover:bg-green-400 my-4 basis-2/5"
                  type="submit"
                >
                  {existingTransaction ? (
                    <p>Edit Transaction</p>
                  ) : (
                    <p>Add Transaction</p>
                  )}
                </button>
                {existingTransaction && (
                  <button
                    className="btn bg-[red] text-black hover:bg-green-400 my-4 basis-2/5"
                    onClick={() =>
                      deleteTransaction({
                        transactionId: existingTransaction.id,
                      })
                    }
                  >
                    Delete TRANSACTION
                  </button>
                )}
              </div>
            </div>
          )}
        </Form>
      </div>
    </Modal>
  );
};

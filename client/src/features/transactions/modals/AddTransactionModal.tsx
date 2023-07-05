import * as z from "zod";
import Modal from "react-modal";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import { SelectField } from "../../../components/Form/SelectField";
import { useGetCategories } from "../../categories/api/getCategories";
import { useCreateTransaction } from "../api/createTransaction";
import { useDeleteTransaction } from "../api/deleteTransaction";
import { UseEditTransaction } from "../api/editTransaction";

import { CreateTransactionDTO, ExistingTransactionDTO } from "../types";
import moment from "moment";
import { useUpdateTotalAmount } from "../../totalAmount/api/updateTotalAmount";
import { useGetTotalAmount } from "../../totalAmount/api/getTotalAmount";

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
    backgroundColor: "#f7f7f7",
    borderRadius: "10px",
    maxWidth: "450px",
  },
};

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  amount: z.number().min(1, "Please enter amount"),
  category: z.string().min(1, "Category is required"),
  date: z.date({ required_error: "Date is required" }),
});

type AddTransactionModalPropsType = {
  addTransactionModalIsOpen: boolean;
  AddTransactionCloseModal: () => void;
  existingTransaction?: ExistingTransactionDTO | null;
};

export const AddTransactionModal = ({
  addTransactionModalIsOpen,
  AddTransactionCloseModal,
  existingTransaction,
}: AddTransactionModalPropsType) => {
  const { data: categories } = useGetCategories();

  const { data: totalAmount } = useGetTotalAmount();

  const createTransactionMutation = useCreateTransaction();

  const { mutateAsync: deleteTransaction } = useDeleteTransaction();

  const { mutateAsync: editTransaction } = UseEditTransaction();

  const { mutateAsync: editTotalAmount } = useUpdateTotalAmount();

  const transactionType = [
    {
      _id: "EXPENSE",
      name: "EXPENSE",
      icon: "",
    },
    {
      _id: "INCOME",
      name: "INCOME",
      icon: "",
    },
  ];

  return (
    <Modal
      isOpen={addTransactionModalIsOpen}
      onRequestClose={AddTransactionCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center mb-4 border-round text-black">
        {existingTransaction ? <p>Edit Transaction</p> : <p>Add Transaction</p>}
        <div
          className="w-2 cursor-pointer text-black mr-8"
          onClick={AddTransactionCloseModal}
        >
          <button className="btn btn-square text-black bg-[#f7f7f7] border-none border-thin] hover:bg-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
        <Form<CreateTransactionDTO["data"], typeof schema>
          onSubmit={async (values) => {
            if (!existingTransaction) {
              await createTransactionMutation.mutateAsync({ data: values });

              if (values.type === "EXPENSE" && totalAmount) {
                await editTotalAmount({
                  id: totalAmount?.id,
                  data: { amount: totalAmount.amount - values.amount },
                });
              }
              if (values.type === "INCOME" && totalAmount) {
                await editTotalAmount({
                  id: totalAmount?.id,
                  data: { amount: totalAmount.amount + values.amount },
                });
              }
              AddTransactionCloseModal();
            } else {
              await editTransaction({
                id: existingTransaction.id,
                transaction: values,
              });
              AddTransactionCloseModal();
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <div className="flex flex-col gap-6">
              <InputField
                type="text"
                placeholder="Please enter transaction name"
                className="w-full"
                registration={register("name")}
                error={formState.errors["name"]}
                defaultValue={existingTransaction?.name}
                iconClass="fa-sharp fa-solid fa-file-signature left-5"
              />

              <div className="flex justify-between w-full min-w-full gap-4 items-center">
                <div className="basis-1/2">
                  <SelectField
                    options={categories}
                    placeholder="Category"
                    error={formState.errors["category"]}
                    registration={register("category")}
                    className="mb-3 h-[45px] basis-1/2 bg-blue-400 text-white"
                    type="CATEGORY"
                    defaultValue={existingTransaction?.category.name}
                    errorClass="bottom-[-28px]"
                  />
                </div>
                <div className="basis-1/2">
                  <SelectField
                    options={transactionType}
                    placeholder="Type"
                    error={formState.errors["type"]}
                    registration={register("type")}
                    className="mb-3 h-[45px] basis-1/2 bg-blue-400 text-white"
                    type="TYPE"
                    defaultValue={existingTransaction?.type}
                    errorClass="bottom-[-28px]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 justify-between items-center gap-4">
                <div className="basis-1/2 col-span-1">
                  <InputField
                    type="tel"
                    placeholder="Amount"
                    className="w-full"
                    registration={register("amount", { valueAsNumber: true })}
                    error={formState.errors["amount"]}
                    defaultValue={existingTransaction?.amount}
                    iconClass="fa-solid fa-coins left-5"
                    errorClass="bottom-[-35px]"
                  />
                </div>

                <div className="basis-1/2 col-span-1">
                  <InputField
                    type="date"
                    placeholder="Date"
                    className="w-full pl-2 text-center"
                    registration={register("date", { valueAsDate: true })}
                    error={formState.errors["date"]}
                    defaultValue={
                      existingTransaction?.date.slice(0, 10) ||
                      moment(new Date()).format("YYYY-MM-DD")
                    }
                    iconClass="fa-regular fa-calendar right-5"
                  />
                </div>
              </div>

              <div className="flex items-center justify-around gap-4">
                <button
                  className="btn bg-blue-400 text-white hover:bg-blue-500 my-4 basis-2/5 border-blue-400 hover:border-blue-400"
                  type="submit"
                >
                  {existingTransaction ? <p>Edit</p> : <p>Add</p>}
                </button>
                {existingTransaction && (
                  <button
                    type="button"
                    className="btn bg-red-400 border-red-400 hover:bg-red-500 my-4 basis-2/5 text-white hover:border-red-400"
                    onClick={() => {
                      deleteTransaction({
                        transactionId: existingTransaction.id,
                        amount: existingTransaction.amount,
                        type: existingTransaction.type,
                        categoryId: existingTransaction.category._id,
                      });
                      AddTransactionCloseModal();
                    }}
                  >
                    DELETE
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

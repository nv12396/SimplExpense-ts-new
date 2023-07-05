import * as z from "zod";
import Modal from "react-modal";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import { useCreateTotalAmount } from "../api/createTotalAmount";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { CreateTotalAmountDTO, TotalAmountDTO } from "../type";
import { useUpdateTotalAmount } from "../api/updateTotalAmount";

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
  },
};
const schema = z.object({
  amount: z.number().min(1, "Please enter amount"),
});

type AddTotalAmountPropsType = {
  addTotalAmountModalIsOpen: boolean;
  AddTotalAmountCloseModal: () => void;
  existingTotalAmount?: TotalAmountDTO;
};

export const AddTotalAmount = ({
  addTotalAmountModalIsOpen,
  AddTotalAmountCloseModal,
  existingTotalAmount,
}: AddTotalAmountPropsType) => {
  const createTotalAmountMutation = useCreateTotalAmount();

  const { mutateAsync: updateTotalAmountMutation } = useUpdateTotalAmount();
  console.log(
    "from mobile, total amount to edit je",
    existingTotalAmount?.amount
  );
  return (
    <Modal
      isOpen={addTotalAmountModalIsOpen}
      onRequestClose={AddTotalAmountCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center mb-4 border-round text-black">
        {existingTotalAmount ? (
          <p className="mb-4">Edit Total Amount</p>
        ) : (
          <p className="mb-4">Add Total Amount</p>
        )}
        <div
          className="w-5 cursor-pointer text-black mb-4"
          onClick={AddTotalAmountCloseModal}
        >
          <XMarkIcon />
        </div>
      </div>
      <div>
        <Form<CreateTotalAmountDTO["data"], typeof schema>
          onSubmit={async (values) => {
            if (!existingTotalAmount) {
              await createTotalAmountMutation.mutateAsync({ data: values });
              AddTotalAmountCloseModal();
            } else {
              await updateTotalAmountMutation({
                id: existingTotalAmount.id,
                data: values,
              });
              AddTotalAmountCloseModal();
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center gap-4">
                <div className="">
                  <InputField
                    type="tel"
                    placeholder="Amount"
                    className="w-full"
                    registration={register("amount", { valueAsNumber: true })}
                    error={formState.errors["amount"]}
                    defaultValue={existingTotalAmount?.amount}
                    iconClass="fa-solid fa-coins left-5"
                  />
                </div>
              </div>

              <div className="flex items-center justify-around gap-4">
                <button
                  className="btn bg-blue-400 text-white hover:bg-blue-500 my-2 basis-2/5 border-blue-400 hover:border-blue-400"
                  type="submit"
                >
                  {existingTotalAmount ? <p>Edit</p> : <p>Add</p>}
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </Modal>
  );
};

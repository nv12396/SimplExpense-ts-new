import * as z from "zod";
import Modal from "react-modal";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";

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
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be 8 characters long"),
});

type AddTransactionsValues = {
  email: string;
  password: string;
};

type AddTransactionModalPropsType = {
  addTransactionModalIsOpen: boolean;
  AddTransactionCloseModal: () => void;
};

export const AddTransactionModal = ({
  addTransactionModalIsOpen,
  AddTransactionCloseModal,
}: AddTransactionModalPropsType) => {
  return (
    <Modal
      isOpen={addTransactionModalIsOpen}
      onRequestClose={AddTransactionCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <button onClick={AddTransactionCloseModal}>close</button>
      <div>I am a modal</div>
      <div>
        <Form<AddTransactionsValues, typeof schema>
          onSubmit={() => console.log("")}
          schema={schema}
        >
          {({ register, formState }) => (
            <div className="flex flex-col gap-4">
              <InputField
                type="text"
                placeholder="Please enter your email"
                className="w-full max-w-xs"
                registration={register("email")}
                error={formState.errors["email"]}
              />
              <InputField
                type="password"
                placeholder="Please enter your password"
                className="w-full max-w-xs"
                registration={register("password")}
                error={formState.errors["password"]}
              />
              <p className="text-end text-sm font-bold text-secondaryGreen mt-2 cursor-pointer">
                Forgot password?
              </p>
              <div>
                <button className="btn w-full bg-secondaryGreen text-black hover:bg-green-400 my-4">
                  LOG IN
                </button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </Modal>
  );
};

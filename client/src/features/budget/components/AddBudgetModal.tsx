import * as z from "zod";
import Modal from "react-modal";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import { SelectField } from "../../../components/Form/SelectField";
import { useGetCategories } from "../../categories/api/getCategories";

import { BudgetDTO, CreateBudgetDTO, EditBudgetDTO } from "../type";
import { useCreateBudget } from "../api/createBudget";
import { useUpdateBudget } from "../api/updateBudget";
import { useDeleteBudget } from "../api/deleteBudget";
import Button from "../../../components/ui/Button";

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
    backgroundColor: "#f5f7fd",
  },
};
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  limit: z.number().min(1, "Please enter maximum limit"),
  category: z.string().min(1, "Category is required"),
});

type AddBudgetModalPropsType = {
  addBudgetModalIsOpen: boolean;
  AddBudgetCloseModal: () => void;
  existingBudget?: BudgetDTO | null;
  addBudgetToEdit: (budget: EditBudgetDTO) => void;
};

export const AddBudgetModal = ({
  addBudgetModalIsOpen,
  AddBudgetCloseModal,
  existingBudget,
  addBudgetToEdit,
}: AddBudgetModalPropsType) => {
  const { data: categories } = useGetCategories();

  const { mutateAsync: createBudget } = useCreateBudget();

  const { mutateAsync: editBudget } = useUpdateBudget();

  const { mutateAsync: deleteBudget } = useDeleteBudget();

  return (
    <Modal
      isOpen={addBudgetModalIsOpen}
      onRequestClose={AddBudgetCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="flex justify-between items-center mb-4 border-round text-gray-500">
        {existingBudget ? <p>Edit Budget</p> : <p>Add Budget</p>}
        <div
          className="cursor-pointer text-gray-500 p-2 rounded-xl bg-[#f7f7f7] border-none hover:bg-gray-200"
          onClick={AddBudgetCloseModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
        </div>
      </div>
      <div>
        <Form<CreateBudgetDTO["data"], typeof schema>
          onSubmit={async (values) => {
            if (!existingBudget) {
              await createBudget({
                data: {
                  name: values.name,
                  limit: values.limit,
                  category: values.category,
                },
              });
              AddBudgetCloseModal();
              addBudgetToEdit(null);
            } else {
              await editBudget({
                id: existingBudget.id,
                data: {
                  limit: values.limit,
                  category: values.category,
                },
              });
              AddBudgetCloseModal();
            }
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <div className="flex flex-col gap-6">
              <InputField
                type="text"
                placeholder="Please enter budget name"
                className="w-full"
                registration={register("name")}
                error={formState.errors["name"]}
                defaultValue={existingBudget?.name}
                iconClass="fa-sharp fa-solid fa-file-signature left-5"
              />

              <div className="flex justify-between w-full min-w-full gap-4 items-center">
                <div className="basis-1/2">
                  <SelectField
                    options={categories}
                    placeholder="Category"
                    error={formState.errors["category"]}
                    registration={register("category")}
                    className="text-sm md:text-md mb-3 h-[45px] basis-1/2 text-white"
                    type="CATEGORY"
                    defaultValue={existingBudget?.category.name}
                    errorClass="bottom-[-30px]"
                  />
                </div>
                <div className="basis-1/2">
                  <InputField
                    type="tel"
                    placeholder="Limit"
                    className="w-full top-0"
                    registration={register("limit", {
                      valueAsNumber: true,
                    })}
                    error={formState.errors["limit"]}
                    defaultValue={existingBudget?.limit}
                    iconClass="fa-solid fa-coins left-5"
                    errorClass="bottom-[-35px]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-around gap-4">
                <Button className="basis-2/5" type="submit">
                  {existingBudget ? <p>Edit</p> : <p>Add</p>}
                </Button>
                {existingBudget && (
                  <Button
                    className="basis-2/5"
                    variant="destructive"
                    onClick={() =>
                      deleteBudget(
                        {
                          budgetId: existingBudget.id,
                        },
                        { onSuccess: () => AddBudgetCloseModal() }
                      )
                    }
                  >
                    DELETE
                  </Button>
                )}
              </div>
            </div>
          )}
        </Form>
      </div>
    </Modal>
  );
};

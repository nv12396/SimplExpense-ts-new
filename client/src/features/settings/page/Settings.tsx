import { z } from "zod";

import ContentLayout from "../../../components/Layout/ContentLayout";
import { Form } from "../../../components/Form/Form";
import { CreateBudgetDTO } from "../../budget/type";
import { InputField } from "../../../components/Form/InputField";

export const Settings = () => {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    currency: z.string().min(1, "Category is required"),
  });

  return (
    <ContentLayout title="Settings">
      <div className="flex flex-col container mx-auto px-12 w-[90%]">
        <h1 className="text-2xl text-black py-6">Settings</h1>
        <Form<CreateBudgetDTO["data"], typeof schema>
          onSubmit={() => console.log()}
          schema={schema}
        >
          {({ register, formState }) => (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-black">Your name</p>
                <InputField
                  type="text"
                  placeholder="Please enter your name"
                  className="w-96"
                  registration={register("name")}
                  error={formState.errors["name"]}
                  // defaultValue={existingBudget?.name}
                  defaultValue="Nebojsa"
                  iconClass="fa-solid fa-user left-5"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-black">Chosen currency</p>
                <InputField
                  type="text"
                  placeholder="Please enter currency"
                  className="w-96"
                  registration={register("limit")}
                  error={formState.errors["limit"]}
                  defaultValue="$"
                  // defaultValue={existingBudget?.limit}
                  iconClass="fa-solid fa-coins left-5"
                  errorClass="bottom-[-35px]"
                />
              </div>

              <button
                className="btn bg-blue-400 text-white hover:bg-blue-500 my-4 w-16 border-blue-400 hover:border-blue-400"
                type="submit"
              >
                Edit
              </button>
            </div>
          )}
        </Form>
      </div>
    </ContentLayout>
  );
};

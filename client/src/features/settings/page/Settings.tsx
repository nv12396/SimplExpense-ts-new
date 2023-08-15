import { z } from "zod";

import ContentLayout from "../../../components/Layout/ContentLayout";
import { Form } from "../../../components/Form/Form";
import { CreateBudgetDTO } from "../../budget/type";
import { InputField } from "../../../components/Form/InputField";
import Button from "../../../components/ui/Button";

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

              <Button type="submit" className="w-28">
                Edit
              </Button>
            </div>
          )}
        </Form>
      </div>
    </ContentLayout>
  );
};

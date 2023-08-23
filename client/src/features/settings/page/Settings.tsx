import { z } from "zod";

import ContentLayout from "../../../components/Layout/ContentLayout";
import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import Button from "../../../components/ui/Button";
import { SettingsDTO } from "../types";
import storage from "../../../utils/storage";
import { SelectField } from "../../../components/Form/SelectField";
import { useUpdateSettings } from "../api/updateSettings";
import { toast } from "react-toastify";

const currencies = [
  {
    _id: "USD",
    name: "USD",
  },
  {
    _id: "EUR",
    name: "EUR",
  },
];

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required"),
  currency: z.string().min(1, "Currency is required"),
});

export const Settings = () => {
  const { mutateAsync: updateSettings } = useUpdateSettings();

  return (
    <ContentLayout title="Settings">
      <div className="flex flex-col container mx-auto px-4 md:px-12 md:w-[90%] h-screen pt-12 md:pt-2 md:mt-2 mt-[16vh]">
        <h1 className="text-2xl text-black py-6 font-bold">Settings</h1>
        <Form<SettingsDTO["data"], typeof schema>
          onSubmit={(values) => {
            updateSettings(
              {
                id: storage.getUser().id,
                data: {
                  name: values.name,
                  email: values.email,
                  currency: values.currency,
                },
              },
              {
                onSuccess: () => {
                  toast.success("Successfuly updated user settins", {
                    position: toast.POSITION.BOTTOM_CENTER,
                  });
                  const user = {
                    id: storage.getUser().id,
                    name: values.name,
                    email: values.email,
                    currency: values.currency,
                  };
                  storage.setUser(user);
                },
              }
            );
            console.log(values);
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div>
                  <p className="text-black">Your name</p>
                  <InputField
                    type="text"
                    placeholder="Please enter your name"
                    className="w-96"
                    registration={register("name")}
                    error={formState.errors["name"]}
                    defaultValue={storage.getUser()?.name}
                    iconClass="fa-solid fa-user left-5"
                  />
                </div>
                <div>
                  <p className="text-black">Your email</p>
                  <InputField
                    type="text"
                    placeholder="Please enter your email"
                    className="w-96"
                    registration={register("email")}
                    error={formState.errors["email"]}
                    defaultValue={storage.getUser()?.email}
                    iconClass="fa-solid fa-user left-5"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-black">Change currency</p>
                <SelectField
                  options={currencies}
                  placeholder="Category"
                  error={formState.errors["currency"]}
                  registration={register("currency")}
                  className="text-white w-full md:max-w-96 md:w-96"
                  type="currency"
                  errorClass="bottom-[-30px]"
                />
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Button type="submit" className="w-28 mt-3">
                  Edit
                </Button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </ContentLayout>
  );
};

import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import Button from "../../../components/ui/Button";
import { SelectField } from "../../../components/Form/SelectField";
import { useRegister } from "../hooks/auth";
import Logo from "../../../assets/logo1.png";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email(),
  currency: z.string().min(1, "Currency is required"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be 8 characters long"),
});

export type Currency = {
  _id: string;
  name: string;
};

type RegisterValues = {
  name: string;
  email: string;
  currency: string;
  password: string;
};

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

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutate: register } = useRegister();

  return (
    <div>
      <div className="flex flex-col w-full md:items-center md:justify-center">
        <div className="md:hidden h-[20vh] bg-[#013736] flex items-center w-full">
          <div
            className="w-72 ml-12 mt-4 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} alt="" />
          </div>
        </div>
        <div className="px-6 mt-16 md:mt-20">
          <div className="text-black flex flex-col gap-2">
            <h1 className="font-bold text-3xl text-center">Create Account</h1>
            <p>Start managing your finance faster and better!</p>
          </div>
          <div className="flex flex-col gap-4 mt-12">
            <Form<RegisterValues, typeof schema>
              onSubmit={(values) => {
                register(values, {
                  onSuccess: () => {
                    navigate("/");
                    toast.success("Successfuly registred", {
                      position: toast.POSITION.BOTTOM_CENTER,
                    });
                  },
                });
              }}
              schema={schema}
            >
              {({ register, formState }) => (
                <div className="flex flex-col gap-4 text-black">
                  <InputField
                    type="text"
                    placeholder="Please enter your name"
                    className="w-full"
                    registration={register("name")}
                    error={formState.errors["name"]}
                    iconClass="fa-solid fa-user left-5 text-gray-400"
                  />
                  <InputField
                    type="text"
                    placeholder="Please enter your email"
                    className="w-full"
                    registration={register("email")}
                    error={formState.errors["email"]}
                    iconClass="fa-solid fa-envelope left-5 text-gray-400"
                  />
                  <InputField
                    type="password"
                    placeholder="Please enter your password"
                    className="w-full"
                    registration={register("password")}
                    error={formState.errors["password"]}
                    iconClass="fa-solid fa-unlock-keyhole left-5 text-gray-400"
                  />
                  <SelectField
                    options={currencies}
                    placeholder="Currency"
                    error={formState.errors["currency"]}
                    registration={register("currency")}
                    className="mb-3 h-[45px] basis-1/2 text-white"
                    defaultValue="Please chose currency"
                    errorClass="bottom-[-30px]"
                  />

                  <p
                    onClick={() => navigate("/auth/login")}
                    className="text-end text-sm font-bold text-primaryGreen mt-2 cursor-pointer"
                  >
                    Already have an account?<span> Log in</span>
                  </p>
                  <div className="mx-auto">
                    <Button type="submit">REGISTER</Button>
                  </div>
                </div>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { toast } from "react-toastify";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import { useRegister } from "../hooks/auth";
import Button from "../../../components/ui/Button";
import { SelectField } from "../../../components/Form/SelectField";

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
      <div className="flex flex-col">
        <div className=" flex flex-col gap">
          <div className="text-secondaryGreen flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Hi there!</h1>
            <p className="font-thin">
              Start managing your finance faster and better
            </p>
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
                <div className="flex flex-col gap-4">
                  <InputField
                    type="text"
                    placeholder="Please enter your name"
                    className="w-full max-w-xs"
                    registration={register("name")}
                    error={formState.errors["name"]}
                  />
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
                    className="text-end text-sm font-bold text-secondaryGreen mt-2 cursor-pointer"
                  >
                    Already have an account?<span> Log in</span>
                  </p>
                  <div>
                    <Button type="submit">REGISTER</Button>
                  </div>
                </div>
              )}
            </Form>

            <div className="divider my-4">OR</div>
            <div className="flex gap-4 w-full justify-around">
              <div className="btn flex gap-2 w-[140px]">
                <div className="text-lg">
                  <FcGoogle />
                </div>
                <p>Google</p>
              </div>
              <div className="btn flex gap-2 w-[140px]">
                <div className="text-sky-600">
                  <GrFacebook />
                </div>
                <p>Facebook</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";
import { toast } from "react-toastify";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import { useLogin } from "../hooks/auth";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../../components/ui/Button";

const schema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be 8 characters long"),
});

type LoginValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate: login } = useLogin();
  return (
    <div>
      <div className="flex flex-col">
        <div className=" flex flex-col gap">
          <div className="text-secondaryGreen flex flex-col gap-2">
            <h1 className="font-bold text-3xl">Welcome back!</h1>
            <p className="font-thin">
              Start managing your finance faster and better
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-12">
            <Form<LoginValues, typeof schema>
              onSubmit={(values) => {
                login(values, {
                  onSuccess: () => {
                    navigate("/");
                    toast.success("Successfuly login", {
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
                    placeholder="Please enter your email"
                    className="w-full max-w-xs"
                    registration={register("email")}
                    error={formState.errors["email"]}
                    iconClass="fa-solid fa-user left-5"
                  />
                  <InputField
                    type="password"
                    placeholder="Please enter your password"
                    className="w-full max-w-xs"
                    registration={register("password")}
                    error={formState.errors["password"]}
                    iconClass="fa-solid fa-unlock-keyhole left-5"
                  />
                  <p className="text-end text-sm font-bold text-secondaryGreen mt-2 cursor-pointer">
                    Forgot password?
                  </p>
                  <div>
                    <Button type="submit">LOG IN</Button>
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

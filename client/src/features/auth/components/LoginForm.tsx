import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Form } from "../../../components/Form/Form";
import { InputField } from "../../../components/Form/InputField";
import { useLogin } from "../hooks/auth";
import Button from "../../../components/ui/Button";
import Logo from "../../../assets/logo1.png";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="flex flex-col w-full">
      <div className="md:hidden h-[20vh] bg-[#013736] flex items-center w-full">
        <div className="w-72 ml-12 mt-4">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="flex flex-col gap px-6 mt-16 md:mx-auto md:mt-44">
        <div className="text-black flex flex-col gap-2">
          <h1 className="font-bold text-3xl">Welcome back!</h1>
          <p className="text-md">
            Start managing your finance faster and better!
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
                  className="w-full"
                  registration={register("email")}
                  error={formState.errors["email"]}
                  iconClass="fa-solid fa-user left-5"
                />
                <InputField
                  type="password"
                  placeholder="Please enter your password"
                  className="w-full"
                  registration={register("password")}
                  error={formState.errors["password"]}
                  iconClass="fa-solid fa-unlock-keyhole left-5"
                />
                <div onClick={() => navigate("/auth/register")}>
                  <p className="text-end text-sm font-bold text-primaryGreen mt-2 cursor-pointer">
                    Do not have account? Register here!
                  </p>
                </div>
                <div className="mx-auto">
                  <Button type="submit">LOG IN</Button>
                </div>
              </div>
            )}
          </Form>

          {/* <div className="divider my-4">OR</div>
            <div className="flex gap-4 w-full justify-around">
              <div className="btn flex gap-2 w-[140px] border-none bg-gray-100 hover:bg-white">
                <div className="text-lg">
                  <FcGoogle />
                </div>
                <p className="text-black font-semibold">Google</p>
              </div>
              <div className="btn flex gap-2 w-[140px]">
                <div className="text-sky-600">
                  <GrFacebook />
                </div>
                <p>Facebook</p>
              </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};

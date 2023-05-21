import { LoginForm } from "../../auth/components/LoginForm.jsx";

export const Login = () => {
  return (
    <div className="flex min-w-screen h-full">
      <div className="hidden md:block basis-1/3 bg-primary w-full text-white min-h-screen"></div>
      <div className="md:basis-2/3 bg-secondary w-full min-h-screen">
        <div className="flex justify-center m-auto items-center w-full h-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

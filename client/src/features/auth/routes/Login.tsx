import { LoginForm } from "../../auth/components/LoginForm.jsx";
import Logo from "./../../../assets/logo_transparent.png";
import Demo from "../../../assets/demo.png";

export const Login = () => {
  return (
    <div className="flex min-w-screen h-full">
      <div className="hidden md:block basis-1/2 bg-[#013736] w-full text-white min-h-screen">
        <div className="flex flex-col relative">
          <img src={Logo} alt="" className="w-80 mx-auto absolute left-[25%]" />
          <div>
            <h1 className="text-center text-2xl mt-52 font-semibold">
              Start managing your finance faster and better!
            </h1>
          </div>
          <div>
            <img
              src={Demo}
              alt="demo"
              className="w-[80%] mx-auto mt-12 border border-black shadow-xl"
            />
          </div>
        </div>
      </div>
      <div className="md:p-6 md:basis-1/2 md:bg-[#013736]">
        <div className="bg-[#f5f7fd] md:w-full md:h-full md:rounded-2xl h-screen w-screen md:pt-36">
          <div className="flex h-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

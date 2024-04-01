import Logo from "./../../assets/logo1.png";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const LandingHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[15vh] w-full min-w-full  flex justify-end bg-secondaryGreen items-center">
      <img
        src={Logo}
        onClick={() => navigate("/")}
        alt=""
        className="cursor-pointer md:w-56 w-48 mx-auto absolute left-0 ml-4 md:ml-12"
      />
      <div className="flex gap-4 mr-12">
        <Button
          onClick={() => navigate("/auth/login")}
          className="md:w-28 w-24"
        >
          Log in
        </Button>
        <Button
          onClick={() => navigate("/auth/register")}
          className="hidden md:block w-28 text-center -pl-4"
        >
          Register
        </Button>
      </div>
    </div>
  );
};

export default LandingHeader;

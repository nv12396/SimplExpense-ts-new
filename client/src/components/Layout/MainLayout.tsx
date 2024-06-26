import { MobileNavbar } from "../Navbar/MobileNavbar";
import Container from "../ui/Container";
import { MobileTotalBalance } from "../../features/totalAmount/components/MobileTotalBalance";
import { SidebarDemo } from "../Navbar/SidebarDemo";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-6 bg-[#f5f7fd] min-h-screen h-screen overflow-y-scroll">
      {/* <div className="col-span-1 hidden md:block"> */}
      <div className="col-span-1 hidden md:block">
        {/* <Sidebar /> */}
        <SidebarDemo />
      </div>
      <div className="md:hidden block">
        <MobileTotalBalance />
      </div>
      <div className="md:col-span-5 col-span-6 bg-[#f5f7fd]">
        <Container>{children}</Container>
      </div>
      <MobileNavbar />
    </div>
  );
};

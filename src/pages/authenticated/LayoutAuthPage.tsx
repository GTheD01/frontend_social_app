import { Outlet } from "react-router-dom";
import NavBar from "../../components/pagecomponents/NavBar";

const LayoutAuthPage = () => {
  return (
    <div className="flex w-full h-screen">
      <NavBar />
      <div className="w-section mt-8 ml-80">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutAuthPage;

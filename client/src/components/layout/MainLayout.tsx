import ThemeProvider from "@/provider/ThemeProvider";
import Header from "../Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <ThemeProvider>
      <Header />
      <div>
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;

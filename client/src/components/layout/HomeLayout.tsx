import ThemeProvider from "@/provider/ThemeProvider";
import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";
import Header from "../Header";
import Banner from "../Banner";

const HomeLayout = () => {
  return (
    <ThemeProvider>
      <div className="relative ">
        <img
          src="/nils-nedel-ONpGBpns3cs-unsplash.jpg"
          alt="@background"
          className="w-full relative   object-cover"
        />
      </div>
      <div className="absolute top-0">
        <Header />
        <Banner />
      </div>
      <main className="flex flex-grow w-full justify-center  dark:bg-neutral-950">
        <Outlet />
        <Toaster />
      </main>
    </ThemeProvider>
  );
};

export default HomeLayout;

import ThemeSwitcher from "./ThemeSwitcher";
import Logo from "./Logo";
import UserButton from "./UserButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { NavLink } from "react-router-dom";
const hotelComponents: { id: number; title: string; to: string }[] = [
  {
    id: 1,
    title: "Commercial Hotel",
    to: "/hotels/commercial",
  },
  {
    id: 2,
    title: "Resort Hotel",
    to: "/hotels/resort",
  },
  {
    id: 3,
    title: "Hostel",
    to: "/hotels/hostel",
  },
  {
    id: 4,
    title: "Services Apartment",
    to: "/hotels/services-apartment",
  },
];
const flightComponents: { id: number; title: string; to: string }[] = [
  {
    id: 1,
    title: "VietNameAirLines",
    to: "flights/vietname-airlines",
  },
  {
    id: 2,
    title: "Bambo Air Ways",
    to: "flights/bambo-airways ",
  },
  {
    id: 3,
    title: "Vietjet Air",
    to: "flights/vietjet-air",
  },
];
export default function NavBar() {
  return (
    <header className="flex w-full items-center justify-between h-[60px] p-4 px-8 mx-2">
      <Logo />

      <NavigationMenu>
        <NavigationMenuList className="flex gap-6 text-[1.1rem]">
          <NavigationMenuItem>
            <NavLink to="/home" >
              {({ isActive }) => (
                <span
                  className={`${
                    isActive
                      ? "bg-neutral-600 text-white font-normal dark:bg-slate-100 dark:text-black"
                      : ""
                  } rounded-md px-3 py-1 font-light hover:bg-neutral-700 hover:text-white hover:dark:bg-slate-200 hover:dark:text-black`}
                >
                  Home
                </span>
              )}
            </NavLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavLink to="/hotels">
                {({ isActive }) => (
                  <span
                    className={`${
                      isActive
                        ? "bg-neutral-600 text-white font-normal dark:bg-slate-100 dark:text-black"
                        : ""
                    } rounded-md px-3 py-1 font-light hover:bg-neutral-700 hover:text-white hover:dark:bg-slate-200 hover:dark:text-black`}
                  >
                    Hotel
                  </span>
                )}
              </NavLink>{" "}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px]   p-3  md:w-[500px] md:grid-cols-2 lg:w-[500px]">
                {hotelComponents.map((hotel) => (
                  <NavLink key={hotel.id} to={hotel.to} className={"font-light hover:bg-neutral-700 hover:text-white hover:dark:bg-slate-200 hover:dark:text-black w-fit p-2 rounded hover:font-normal"}>
                    {hotel.title}
                  </NavLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavLink to="flights">
                {({ isActive }) => (
                  <span
                    className={`${
                      isActive
                        ? "bg-neutral-600 text-white font-normal dark:bg-slate-100 dark:text-black"
                        : ""
                    } rounded-md px-3 py-1 font-light hover:bg-neutral-700 hover:text-white hover:dark:bg-slate-200 hover:dark:text-black`}
                  >
                    Flights
                  </span>
                )}
              </NavLink>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px]  p-3 md:w-[400px] md:grid-cols-3 lg:w-[500px]">
                {flightComponents.map((flight) => (
                  <NavLink to={flight.to} key={flight.id} className={"font-light hover:bg-neutral-700 hover:text-white hover:dark:bg-slate-200 hover:dark:text-black w-fit p-2 rounded hover:font-normal"}>
                    {flight.title}
                  </NavLink>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavLink to="/transports">
                {({ isActive }) => (
                  <span
                    className={`${
                      isActive
                        ? "bg-neutral-600 text-white font-normal dark:bg-slate-100 dark:text-black"
                        : ""
                    } rounded-md px-3 py-1 font-light hover:bg-neutral-700 hover:text-white hover:dark:bg-slate-200 hover:dark:text-black`}
                  >
                    Transports
                  </span>
                )}
              </NavLink>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavLink to="/tours">
                {({ isActive }) => (
                  <span
                    className={`${
                      isActive
                        ? "bg-neutral-600 text-white font-normal dark:bg-slate-100 dark:text-black"
                        : ""
                    } rounded-md px-3 py-1 font-light hover:bg-neutral-700 hover:text-white hover:dark:bg-slate-200 hover:dark:text-black`}
                  >
                    Tours
                  </span>
                )}
              </NavLink>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavLink to="/coupons">
                {({ isActive }) => (
                  <span
                    className={`${
                      isActive
                        ? "bg-neutral-600 text-white font-normal dark:bg-slate-100 dark:text-black"
                        : ""
                    } rounded-md px-3 py-1 font-light hover:bg-neutral-700 hover:text-white hover:dark:bg-slate-200 hover:dark:text-black`}
                  >
                    Coupons
                  </span>
                )}
              </NavLink>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex gap-3 ">
        <ThemeSwitcher />
        <UserButton />
      </div>
    </header>
  );
}

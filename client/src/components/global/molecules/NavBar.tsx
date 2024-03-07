// import React from "react";

// import { NavLink } from "react-router-dom";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "./ui/navigation-menu";
// import { cn } from "@/lib/utils";

// const hotelComponents: { id: number; title: string; to: string }[] = [
//   {
//     id: 1,
//     title: "Commercial Hotel",
//     to: "/hotels/commercial",
//   },
//   {
//     id: 2,
//     title: "Resort Hotel",
//     to: "/hotels/resort",
//   },
//   {
//     id: 3,
//     title: "Hostel",
//     to: "/hotels/hostel",
//   },
//   {
//     id: 4,
//     title: "Services Apartment",
//     to: "/hotels/services-apartment",
//   },
// ];
// const flightComponents: { id: number; title: string; to: string }[] = [
//   {
//     id: 1,
//     title: "VietNameAirLines",
//     to: "flights/vietname-airlines",
//   },
//   {
//     id: 2,
//     title: "Bambo Air Ways",
//     to: "flights/bambo-airways ",
//   },
//   {
//     id: 3,
//     title: "Vietjet Air",
//     to: "flights/vietjet-air",
//   },
// ];

// const NavBar: React.FC = () => {
//   return (

//     <NavigationMenu >
//       <NavigationMenuList>
//         <NavigationMenuItem>
//         <NavigationMenuLink className={navigationMenuTriggerStyle()}>

//           {/* <NavigationMenuTrigger> */}
//             <NavLink to={"/home"}>Home</NavLink>
//           {/* </NavigationMenuTrigger> */}
//         </NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>
//             <NavLink to={"/hotels"}>Hotels</NavLink>
//           </NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-3 p-4 lg:w-[400px] ">
//               {hotelComponents.map((hotel, index) => (
//                 <ListItem to={hotel.to} key={index}>{hotel.title}</ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>
//             <NavLink to={"/flights"}>Flights</NavLink>
//           </NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-3 p-4 lg:w-[400px] ">
//               {flightComponents.map((flight, index) => (
//                 <ListItem to={flight.to} key={index}>{flight.title}</ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//           {/* <NavigationMenuTrigger> */}
//             <NavLink to={"/homestays"}>Homestays</NavLink>
//           {/* </NavigationMenuTrigger> */}
//         </NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//           {/* <NavigationMenuTrigger> */}
//             <NavLink to={"/transports"}>Transports</NavLink>
//           {/* </NavigationMenuTrigger> */}
//         </NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//           {/* <NavigationMenuTrigger> */}
//             <NavLink to={"/tours"}>Tours</NavLink>
//           {/* </NavigationMenuTrigger> */}
//         </NavigationMenuLink>
//         </NavigationMenuItem>
//         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//           {/* <NavigationMenuTrigger> */}
//             <NavLink to={"/coupons"}>Coupons</NavLink>
//           {/* </NavigationMenuTrigger> */}
//         </NavigationMenuLink>
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// };

// export default NavBar;
// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a"> & { to: string }
// >(({ className, title, children, to, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <NavLink
//           to={to}
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </NavLink>
//       </NavigationMenuLink>
//     </li>
//   );
// });
// ListItem.displayName = "ListItem";

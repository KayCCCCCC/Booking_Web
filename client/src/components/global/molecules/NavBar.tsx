import { cn } from "@/lib/utils/cn"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
interface ItemProps {
  label: string
  key: string
}
const navList: ItemProps[] = [
  {
    label: "Home",
    key: "/home"
  },
  {
    label: "Destinations",
    key: "/destinations"
  },
  {
    label: "Stays",
    key: "/stays"
  },

  {
    label: "Coupons",
    key: "/coupons"
  },
  {
    label: "Blogs",
    key: "/blogs"
  }
]
const NavBar = () => {
  const activePath = useLocation()
  const [activeItem, setActiveItem] = useState<string>(activePath.pathname)

  return (
    <div className="flex gap-4">
      {navList.map((item) => (
        <Link
          key={item.key}
          to={item.key}
          className={cn(
            "flex cursor-pointer items-center justify-center rounded-lg px-4 py-2  text-white/95 hover:translate-x-[0.5px] hover:bg-rose-600/90 hover:text-white",
            item.key === activeItem && "bg-rose-600 text-white"
          )}
          onClick={() => setActiveItem(item.label)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default NavBar

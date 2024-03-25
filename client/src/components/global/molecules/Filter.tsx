import { ListFilter } from "lucide-react"

const Filter = () => {
  return (
    <div className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-50 p-4 shadow-sm ">
      <p>Filter</p>
      <ListFilter />
    </div>
  )
}

export default Filter

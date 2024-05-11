import { cn } from "@/lib/utils/cn"
import { COLORS } from "@/constants/Colors"

const TagType = ({ index, content, isActive }: { index: number; content: string; isActive: boolean }) => {
  return (
    <div
      className={cn(
        "mb-2 flex w-fit cursor-pointer items-center justify-center whitespace-nowrap rounded-[1.5rem] border border-gray-100 px-3 py-1 text-center hover:translate-x-0.5 hover:shadow-sm dark:bg-slate-800",
        !isActive ? "border-gray-100" : "font-medium"
      )}
      style={{ borderColor: isActive ? COLORS[index] : "rgb(243 244 246)", color: isActive ? COLORS[index] : "" }}
    >
      {content}
    </div>
  )
}

export default TagType

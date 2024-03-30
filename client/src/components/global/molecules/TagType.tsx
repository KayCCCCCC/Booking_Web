import { cn } from "@/lib/utils/cn"

const TagType = ({ content, isActive }: { content: string; isActive: boolean }) => {
  return (
    <div
      className={cn(
        "mb-2 flex w-fit cursor-pointer items-center justify-center rounded-[1.5rem] border border-gray-100 px-3 py-1 text-center hover:translate-x-0.5 hover:shadow-sm dark:bg-slate-800",
        isActive && "border-red-400 bg-red-200"
      )}
    >
      {content}
    </div>
  )
}

export default TagType

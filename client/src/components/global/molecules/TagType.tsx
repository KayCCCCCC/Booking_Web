const TagType = ({ content }: { content: string }) => {
  return (
    <div className="mb-2 flex w-fit cursor-pointer items-center justify-center rounded-[1.5rem] border border-gray-100 px-3 py-1 text-center hover:translate-x-0.5 hover:shadow-sm dark:bg-stone-400">
      {content}
    </div>
  )
}

export default TagType

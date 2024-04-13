const useArrangeImage = ({ length, index }: { length: number; index: number }): string => {
  let classContent = "col-span-6"
  if (length === 2) return "col-span-3"
  if (length === 3) {
    return index === 0 ? "col-span-4 row-span-2" : "col-span-2"
  }
  if (length === 4) {
    return index === 0 ? "col-span-6 row-span-1" : "col-span-2"
  }
  if (length === 5) {
    return index < 2 ? "col-span-3 row-span-1" : "col-span-2"
  }

  return classContent
}

export default useArrangeImage

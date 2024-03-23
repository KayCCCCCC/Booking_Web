import { useMemo } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  siblingCount?: number
}
const range = (start: number, end: number) => {
  let length = end - start + 1

  return Array.from({ length }, (_, idx) => idx + start)
}
export const usePagination = ({ currentPage, totalPages, siblingCount = 1 }: PaginationProps) => {
  console.log(currentPage, totalPages, siblingCount)

  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5
    if (totalPageNumbers >= totalPages) return range(1, totalPages)

    const leftSiblingIdx = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIdx = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIdx > 2
    const shouldShowRightDots = rightSiblingIdx < totalPages - 2

    const firstPageIdx = 1
    const lastPageIdx = totalPages

    if (shouldShowRightDots && !shouldShowLeftDots) {
      let leftItemCount = 3 + 2 * siblingCount
      let leftRange = range(1, leftItemCount)

      return [...leftRange, 0, totalPages]
    }

    if (!shouldShowRightDots && shouldShowLeftDots) {
      let rightItemCount = 3 + 2 * siblingCount
      let rightRange = range(totalPages - rightItemCount + 1, totalPages)

      return [firstPageIdx, 0, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIdx, rightSiblingIdx)
      return [firstPageIdx, 0, ...middleRange, 0, lastPageIdx]
    }
  }, [currentPage, totalPages, siblingCount])

  return paginationRange
}

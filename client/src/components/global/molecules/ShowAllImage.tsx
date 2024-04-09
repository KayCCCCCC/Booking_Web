import { Menu } from "lucide-react"
import { Button } from "../atoms/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../atoms/sheet"

export const ShowAllImage = ({ urls }: { urls: string[] }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="border-1 absolute bottom-3 right-4 flex cursor-pointer gap-2 rounded border-red-500 bg-slate-50 px-2 py-1 text-base text-blue-950"
        >
          <Menu color="red" />
          View More
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="flex h-fit flex-col items-center justify-center bg-white ">
        <SheetHeader className="flex w-full max-w-full justify-start pl-10 text-start ">
          <SheetTitle>Total: {urls.length} images</SheetTitle>
        </SheetHeader>
        <div className=" flex w-[90%] gap-4  overflow-x-auto py-4">
          {urls.map((url, index) => (
            <img src={url} alt={`image-${index + 1}`} key={index} className="w-96 rounded-md" />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

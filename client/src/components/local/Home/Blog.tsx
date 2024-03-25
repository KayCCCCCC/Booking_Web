import { Button } from "@/components/global/atoms/button"

const Blog = () => {
  return (
    <div className="grid w-full grid-cols-4 items-center gap-8">
      <div className="flex flex-col gap-1 md:col-span-1">
        <div>Our blogs</div>
        <div className="text-4xl font-semibold uppercase leading-snug tracking-wider">
          Discover the fascinating universe
        </div>
        <div className="mt-2">
          <Button className="w-fit rounded-lg border border-stone-200 bg-transparent px-3 hover:bg-slate-100 ">
            View more
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:col-span-3 md:auto-cols-[30rem]">
        {[0, 1].map((blog, idx) => (
          <div key={idx} className="rounded-lg border border-slate-300 md:col-span-1 dark:border-slate-900 hover:translate-x-1 duration-200">
            <img src="/mainBG.jpg" className="h-[19rem] w-full rounded-t-lg object-cover" />
            <div className=" flex h-[11rem] flex-col gap-2 rounded-lg rounded-t-none  bg-slate-100 p-4 dark:bg-slate-800">
              <div className="truncate text-[0.8rem] text-slate-500/80 ">Nov 28 2022</div>
              <div className="line-clamp-2 min-h-12 text-ellipsis font-semibold">
                Exploring the World: A Journey of Discovery {idx === 1 && "Embracing Nature's Wonders"}
              </div>
              <div className="line-clamp-3 w-full justify-end overflow-hidden text-ellipsis text-sm text-slate-400/90">
                Traveling isn't just about sightseeing; it's an opportunity to immerse yourself in the culture and
                lifestyle of the locals. From vibrant traditional festivals to sampling the unique cuisine of each
                region, every destination has its own fascinating stories to tell.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog

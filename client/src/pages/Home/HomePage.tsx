import Blog from "@/components/local/Home/Blog"
import Location from "@/components/local/Home/Location"
import Modal from "@/components/local/Home/Modal"
// import Tour from "@/components/local/Home/Tour"

const HomePage = () => {
  return (
    <div className="mx-20 flex flex-col justify-center gap-y-10 px-10 *:w-full *:rounded-md *:border-none *:bg-slate-50/80 *:px-10 *:py-10 *:dark:bg-slate-800/60">
      <div className="mt-10">
        <Location />
      </div>
      <div>
        <Modal />
      </div>
      {/* <div>
        <Tour />
      </div> */}
      <div className="mb-10">
        <Blog />
      </div>
    </div>
  )
}

export default HomePage

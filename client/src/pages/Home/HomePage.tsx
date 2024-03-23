import Blog from "@/components/local/Home/Blog"
import ContentHome from "@/components/local/Home/ContentHome"
import Location from "@/components/local/Home/Location"
import Modal from "@/components/local/Home/Modal"
import Tour from "@/components/local/Home/Tour"

const HomePage = () => {
  return (
    <div className="mx-20">
      <div>
        <Location />
      </div>
      <div>
        <Modal />
      </div>
      <div>
        <Tour />
      </div>
      <div>
        <Blog />
      </div>
    </div>
  )
}

export default HomePage

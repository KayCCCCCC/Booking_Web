import { createBrowserRouter, Navigate } from "react-router-dom"
import RouterEndPoint from "./constants/RouterEndPoint"
import SignInPage from "./pages/SignIn/SignInPage"
import NotFoundPage from "./pages/NotFound/NotFoundPage"
import SignUpPage from "./pages/SignUp/SignUpPage"
import HomePage from "./pages/Home/HomePage"
import MainLayout from "./components/global/templates/MainLayout"
import DestinationPage from "./pages/Destination/DestinationPage"
import HomeLayout from "./components/global/templates/HomeLayout"
import HotelsPage from "./pages/Hotels/HotelsPage"
import BlogsPage from "./pages/Blogs/BlogsPage"
import DestinationDetailPage from "./pages/DestinationDetail/DestinationDetailPage"
import HotelDetailPage from "./pages/HotelDetailPage/HotelDetailPage"
import BlogDetailPage from "./pages/BlogDetail/BlogDetailPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RouterEndPoint.Home} />
      },
      {
        path: "/home",
        element: <HomePage />
      }
    ]
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: RouterEndPoint.Destinations,
        element: <DestinationPage />
      },
      {
        path: RouterEndPoint.DestinationDetail,
        element: <DestinationDetailPage />
      },
      {
        path: RouterEndPoint.Stays,
        element: <HotelsPage />
      },
      {
        path: RouterEndPoint.StayDetail,
        element: <HotelDetailPage />
      },
      {
        path: RouterEndPoint.Blogs,
        element: <BlogsPage />
      },
      {
        path: RouterEndPoint.BlogDetail,
        element: <BlogDetailPage />
      }
    ]
  },
  {
    path: RouterEndPoint.SignIn,
    element: <SignInPage />
  },
  {
    path: RouterEndPoint.SignUp,
    element: <SignUpPage />
  },
  { path: "*", element: <NotFoundPage /> }
])

export default router

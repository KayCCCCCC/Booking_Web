import { createBrowserRouter, Navigate } from "react-router-dom";
import HomeLayout from "./components/layout/HomeLayout";
import HomePage from "./pages/HomePage";
import ModelsPage from "./pages/customer/ModelsPage";
import VoucherPage from "./pages/manager/VoucherPage";
import ToursPage from "./pages/ToursPage";
import RouterEndPoint from "./contants/RouterEndPoint";
import SignInPage from "./pages/SignInPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from './pages/SignUpPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={RouterEndPoint.Home} />,
      },
      {
        path: RouterEndPoint.Home,
        element: <HomePage />,
      },
      {
        path: "/hotels",
        element: <ModelsPage />,
      },
      {
        path: "/flights",
        element: <ModelsPage />,
      },
      {
        path: "/coupons",
        element: <VoucherPage />,
      },
      {
        path: "/hotels/:type",
        element: <ModelsPage />,
      },
      {
        path: "/flights/:type",
        element: <ModelsPage />,
      },
      {
        path: "tours",
        element: <ToursPage />,
      },
    ],
  },
  {
    path: RouterEndPoint.SignIn,
    element: <SignInPage />,
  },
  {
    path: RouterEndPoint.SignUp,
    element: <SignUpPage />,
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;

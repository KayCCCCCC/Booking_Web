import {createBrowserRouter, Navigate} from "react-router-dom"
import DefaultLayout from "./components/layout/DefaultLayout"
import HomePage from "./pages/HomePage"
import ModelsPage from "./pages/customer/ModelsPage"
import VoucherPage from "./pages/manager/VoucherPage"
import ToursPage from "./pages/ToursPage"

const router = createBrowserRouter([
{
    path: "/",
    element: <DefaultLayout/>,
    children: [
        {
            index: true,
            element: <Navigate to={"/home"} />,
        },
        {
            path: '/home',
            element: <HomePage />
        },
        {
            path: '/hotels',
            element: <ModelsPage />
        },
        {
            path: '/flights',
            element: <ModelsPage />
        },
        {
            path: '/coupons',
            element: <VoucherPage />
        },
        {
            path: '/hotels/:type',
            element: <ModelsPage />
        },
        {
            path: '/flights/:type',
            element: <ModelsPage />
        },
        {
            path: 'tours',
            element: <ToursPage/>
        }
        
    ]
}
])

export default router
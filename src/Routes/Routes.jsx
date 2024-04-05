import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Checkout from "../pages/Checkout/Checkout";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <SignUp></SignUp>
            },
            {
                path: "/checkout/:id",
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>,
                loader: ({ params }) => fetch(`https://car-doctor-server-eight-delta.vercel.app/services/${params.id}`)
            },
            {
                path: "/bookings",
                element: <PrivateRoute><Bookings></Bookings></PrivateRoute>
            }
        ]
    },
]);


export default router;
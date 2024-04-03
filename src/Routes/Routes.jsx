import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage/Home/Home";
import MainLayout from "../Layout/MainLayout";
import Login from "../pages/Login/Login";

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
            }
        ]
    },
]);


export default router;
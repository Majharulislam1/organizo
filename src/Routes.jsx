import { createBrowserRouter } from "react-router-dom";
import Root from "./Components/Root";
import Registration from "./Components/Registration";
import Login from "./Components/Login";
import Sidebar from "./Components/Sidebar";
import PrivateRoute from "./Components/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
              path:'/',
              element: <PrivateRoute> <Sidebar></Sidebar></PrivateRoute>
            },
            {
                path:'/registration',
                element:<Registration></Registration>
            },
            {
                path:'/login',
                element:<Login></Login>
            }
        ]
    },
]);

export default router;


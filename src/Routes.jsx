import { createBrowserRouter } from "react-router-dom";
import Root from "./Components/Root";
import Registration from "./Components/Registration";
import Login from "./Components/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                path:'/',
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


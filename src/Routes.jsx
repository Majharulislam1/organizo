import { createBrowserRouter } from "react-router-dom";
import Root from "./Components/Root";
import Registration from "./Components/Registration";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                path:'/',
                element:<Registration></Registration>
            }
        ]
    },
]);

export default router;


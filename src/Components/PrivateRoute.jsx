import { useContext } from "react";
import { AuthContext } from "./Authentication";
import { Navigate, useLocation } from "react-router-dom";
 



const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
     
    if(loading){
        return  (
            <div className="flex justify-center py-8">
                  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
            </div>
        )
      }
    if (user && user?.email) {
        return children;
    }
    return <Navigate  to={"/login"}></Navigate>;
};

 


export default PrivateRoute;
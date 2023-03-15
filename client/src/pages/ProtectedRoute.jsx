import { Navigate } from "react-router-dom";

import authStore from "../store";



const ProtectedRoute = (
  
  {


  
    redirectPath = '/Login',
    children,
  }) => {
    if (!authStore((state)=>state.token)) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return children;
  };

  export default ProtectedRoute
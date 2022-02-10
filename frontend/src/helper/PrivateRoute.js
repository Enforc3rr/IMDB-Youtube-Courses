import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "./LoginContext";

function PrivateRoute() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;

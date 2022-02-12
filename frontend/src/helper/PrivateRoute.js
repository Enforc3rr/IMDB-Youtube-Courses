import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

export default function PrivateRoute(props) {
  const { isUserLoggedIn, doneloading } = useContext(LoginContext);
  if (!isUserLoggedIn && doneloading) return <Navigate to="/signin" />;
  if (doneloading) return props.children;
  return null;
}

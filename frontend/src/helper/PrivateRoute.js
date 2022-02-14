import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoginContext } from "./LoginContext";

const PrivateRoute = (props) => {
  console.log(props);
  const { isUserLoggedIn, doneloading } = useContext(LoginContext);
  if ((props.reversed ? isUserLoggedIn : !isUserLoggedIn) && doneloading)
    return <Navigate to={props.to ?? "/"} />; // ?? basically means if value is null then assign it the value on right of " ?? "
  if (doneloading) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return <React.Fragment></React.Fragment>;
};

export default PrivateRoute;

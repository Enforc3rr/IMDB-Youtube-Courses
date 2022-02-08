import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../helper/LoginContext";

function Logout() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Came HERE");
  }, []);
  const logoutHandle = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("tokenYoutubeIMDB");
    navigate("/");
  };
  return (
    <div>
      <button onClick={logoutHandle}>logout</button>
    </div>
  );
}

export default Logout;

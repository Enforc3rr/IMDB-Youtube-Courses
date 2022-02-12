import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../helper/LoginContext";

function UserProfile() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);
  const [loggedInUser, setLoggedInUser] = useState("");
  let { username } = useParams();

  const [user, setUser] = useState("Code016");

  useEffect(() => {
    if (localStorage.getItem("tokenYoutubeIMDB") && isUserLoggedIn) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
        },
      };
      Axios.get("http://localhost:8000/api/v1/user/userdetails", config)
        .then((res) => {
          setLoggedInUser(res.data.username);
        })
        .catch((error) => {
          console.log(error);
          setIsUserLoggedIn(false);
        });
    }
  }, [isUserLoggedIn]);

  return (
    <>
      {loggedInUser === user ? (
        <>
          Welcome To Your Dashboard <button>Logout</button>{" "}
        </>
      ) : (
        <>User Profile </>
      )}
    </>
  );
}

export default UserProfile;

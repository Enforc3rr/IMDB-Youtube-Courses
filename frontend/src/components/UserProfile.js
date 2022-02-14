import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext } from "../helper/LoginContext";
import "../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

function UserProfile() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);
  const [loggedInUser, setLoggedInUser] = useState("");
  let { username } = useParams();

  const [user, setUser] = useState(username);

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
      <Navbar login={{ isUserLoggedIn, setIsUserLoggedIn }} />
      <div className="containerUser" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center flex-column p-5">
              <img
                src="https://picsum.photos/300/300"
                style={{ width: "250px", height: "250px" }}
                alt=""
                className="img-fluid rounded-circle shadow-lg mb-2"
              />
              <h1
                className="display-3 mt-2 mb-4"
                style={{
                  color: "beige",
                  textDecoration: "underline",
                  textDecorationColor: "#800",
                }}
              >
                {username}
              </h1>
              <button className="btn btn-outline-danger mt-1">Logout</button>
            </div>
            <div className="col-sm-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-12 text-center">
                  <h3 className="mt-1 mb-4" style={{ color: "beige" }}>
                    Last Three Posts
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;

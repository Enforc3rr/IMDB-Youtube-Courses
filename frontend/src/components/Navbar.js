import Axios from "axios";
import React, { useEffect, useState } from "react";

function Navbar(props) {
  const [usernameOfLoggedInUser, setUsernameOfLoggedInUser] = useState("");
  useEffect(() => {
    if (
      props.login.isUserLoggedIn &&
      JSON.stringify(localStorage.getItem("tokenYoutubeIMDB"))
    ) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
        },
      };
      Axios.get("http://localhost:8000/api/v1/user/userdetails", config)
        .then((res) => {
          setUsernameOfLoggedInUser(res.data.username);
        })
        .catch((error) => {
          console.log(error);
          props.login.setIsUserLoggedIn(false);
        });
    }
  });
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <a href="/">
            <span className="navbar-brand" style={{ color: "beige" }}>
              YoutubeCourseIMDB
            </span>
          </a>
          <a href="/" style={{ marginRight: "50px", marginLeft: "20px" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055645.png"
              className="rounded-circle"
              height={"22"}
              loading="lazy"
            />
          </a>
          <a>
            <img
              src="https://cdn-icons.flaticon.com/png/512/4889/premium/4889066.png?token=exp=1643697919~hmac=dc6d88f7cb7beb4d92e6a09822622d1c"
              className="rounded-circle"
              height={"22"}
              loading="lazy"
            />
          </a>
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <a href="/">
            <span className="navbar-brand" style={{ color: "beige" }}>
              YoutubeCourseIMDB
            </span>
          </a>
          <a href="/" className="ml-5">
            <span className="navbar-brand" style={{ color: "beige" }}>
              Search
            </span>
          </a>
          <div className="ml-auto">
            {!props.login.isUserLoggedIn ? (
              <div>
                <a href="/" className="mx-auto mr-5">
                  <span
                    className="navbar-brand"
                    style={{ border: "1px solid white", color: "beige" }}
                  >
                    Login
                  </span>
                </a>
                <a href="/" className="mx-auto ml-5">
                  <span
                    className="navbar-brand"
                    style={{ border: "1px solid white", color: "beige" }}
                  >
                    Signup
                  </span>
                </a>
              </div>
            ) : (
              <a href={`/profile/${usernameOfLoggedInUser}`}>
                <span
                  style={{
                    color: "beige",
                    fontFamily: "sans-serif",
                    fontWeight: "bolder",
                    fontSize: "100%",
                  }}
                >
                  {props.login.isUserLoggedIn}
                </span>
                <img
                  src="https://cdn-icons.flaticon.com/png/512/4889/premium/4889066.png?token=exp=1643697919~hmac=dc6d88f7cb7beb4d92e6a09822622d1c"
                  className="rounded-circle"
                  height={"30"}
                  loading="lazy"
                  style={{ marginLeft: "20px" }}
                />
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

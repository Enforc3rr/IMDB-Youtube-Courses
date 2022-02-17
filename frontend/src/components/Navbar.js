import Axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "./Data";

//Passing user details in Navbar as a prop

function Navbar(props) {
  const [usernameOfLoggedInUser, setUsernameOfLoggedInUser] = useState("");

  useEffect(() => {
    if (
      props.login.isUserLoggedIn &&
      localStorage.getItem("tokenYoutubeIMDB")
    ) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
        },
      };
      Axios.get(`${URL}/api/v1/user/userdetails`, config)
        .then((res) => {
          setUsernameOfLoggedInUser(res.data.username);
        })
        .catch((error) => {
          console.log(error);
          props.login.setIsUserLoggedIn(false);
        });
    }
  });

  const mobileIconLogin = () => {
    return (
      <>
        <a href="/login">
          <img
            src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-user-shopping-mall-xnimrodx-lineal-color-xnimrodx.png"
            className="rounded-circle"
            height={"22"}
            loading="lazy"
          />
        </a>
      </>
    );
  };

  const mobileIconAfterLogin = () => {
    return (
      <>
        <a href={`/u/${usernameOfLoggedInUser}`}>
          <img
            src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-user-shopping-mall-xnimrodx-lineal-color-xnimrodx.png"
            className="rounded-circle"
            height={"22"}
            loading="lazy"
          />
        </a>
      </>
    );
  };

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
          <a href="/search" style={{ marginRight: "50px", marginLeft: "20px" }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1055/1055645.png"
              className="rounded-circle"
              height={"22"}
              loading="lazy"
            />
          </a>
          {}
          {!props.login.isUserLoggedIn
            ? mobileIconLogin()
            : mobileIconAfterLogin()}
        </button>
        <div className="collapse navbar-collapse" id="navbarToggler">
          <a href="/">
            <span
              style={{
                color: "beige",
                fontSize: "1.5em",
                fontWeight: "bold",
                textDecoration: "underline",
                textDecorationColor: "#800",
                textDecorationWidth: "100px",
              }}
            >
              YoutubeCourseIMDB
            </span>
          </a>
          <a href="/search" className="ml-5">
            <span
              style={{
                color: "beige",
                fontSize: "1.2em",
                fontWeight: "normal",
              }}
            >
              Search
            </span>
          </a>
          <div className="ml-auto">
            {!props.login.isUserLoggedIn ? (
              <div>
                <a href="/login" className="mx-auto mr-5">
                  <span
                    className="navbar-brand"
                    style={{
                      border: "1px solid red",
                      padding: "5px",
                      color: "beige",
                      borderRadius: "1em",
                      fontSize: "1em",
                    }}
                  >
                    Login
                  </span>
                </a>
                <a href="/signup" className="mx-auto ml-5">
                  <span
                    className="navbar-brand"
                    style={{
                      border: "1px solid red",
                      padding: "5px",
                      color: "beige",
                      borderRadius: "1em",
                      fontSize: "1em",
                    }}
                  >
                    Signup
                  </span>
                </a>
              </div>
            ) : (
              <a href={`/u/${usernameOfLoggedInUser}`}>
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
                  src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-user-shopping-mall-xnimrodx-lineal-color-xnimrodx.png"
                  className="rounded-circle"
                  height={"30"}
                  loading="lazy"
                  style={{ marginLeft: "20px", cursor: "grab" }}
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

import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import "../App.css";
import Axios from "axios";
import Swal from "sweetalert2";

// Yet to learn how to manage Cookie in MERN stack

function Login() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  const loadingPage = () => {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="spinner-grow"
          style={{ width: "30vh", height: "30vh" }}
        ></div>
      </div>
    );
  };
  const dataToBeSent = {
    username,
    password,
  };
  const loginButtonHandle = () => {
    const config = {
      header: {
        "content-type": "application/json",
      },
    };
    Axios.post(
      "http://localhost:8000/api/v1/user/userlogin",
      dataToBeSent,
      config
    )
      .then((res) => {
        console.log(res.headers);
        // console.log(res.data);
        // console.log(res.headers);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Either username or password is Wrong",
          footer: '<a href="/forgotpassword">Forgot Password ?</a>',
        });
      });
  };
  const login = () => {
    return (
      <>
        <Navbar isUserLoggedIn={isUserLoggedIn} />

        <div
          className="container-fluid containerUser"
          style={{ minHeight: "100vh" }}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center ">
              <p
                className="display-2 animate__animated animate__bounce"
                style={{
                  color: "beige",
                  textDecoration: "underline",
                  textDecorationColor: "#800",
                }}
              >
                Login
              </p>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 text-center">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
                    className="img-fluid"
                    style={{ width: "50%" }}
                  />
                  <p
                    className="h1"
                    style={{
                      color: "beige",
                      textDecoration: "underline",
                      textDecorationColor: "#800",
                      textDecorationThickness: "8px",
                    }}
                  >
                    Youtube Courses IMDB
                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
                  <div className="d-flex flex-column justify-content-center align-items-center shadow p-5 loginCard ">
                    <input
                      className="inputLogin"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                      className="inputLogin"
                      placeholder="Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      className="btn btn-outline-danger"
                      style={{
                        width: "auto",
                        margin: "15px",
                      }}
                      onClick={loginButtonHandle}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  return <>{isPageLoading ? loadingPage() : login()}</>;
}

export default Login;

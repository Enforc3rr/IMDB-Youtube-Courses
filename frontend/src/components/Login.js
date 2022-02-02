import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import "../App.css";

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
  const login = () => {
    return (
      <>
        <Navbar isUserLoggedIn={isUserLoggedIn} />

        <div
          className="container-fluid containerUser"
          style={{ minHeight: "100vh" }}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center">
              <p
                className="display-2"
                style={{ color: "beige", textDecoration: "underline" }}
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
                      textDecorationColor: "black",
                      textDecorationThickness: "8px",
                    }}
                  >
                    Youtube Courses IMDB
                  </p>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column justify-content-center align-items-center ">
                  <div className="d-flex flex-column justify-content-center align-items-center shadow p-5 loginCard ">
                    <input
                      style={{
                        width: "100%",
                        height: "15%",
                        margin: "15px",
                        backgroundColor: "rgba(255, 255 ,255, 0.8)",
                        color: "Black",
                        fontSize: "1.5em",
                        fontWeight: "bold",
                      }}
                      className="form-control"
                      placeholder="Username"
                    />
                    <input
                      style={{
                        width: "100%",
                        height: "15%",
                        margin: "15px",
                        backgroundColor: "rgba(255, 255 ,255, 0.8)",
                        color: "black",
                        fontSize: "1.5em",
                        fontWeight: "bold",
                      }}
                      className="form-control"
                      placeholder="Password"
                      type="password"
                    />
                    <button
                      className="btn btn-outline-light "
                      style={{ width: "auto", margin: "15px" }}
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

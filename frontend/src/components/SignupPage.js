import { useEffect, useState } from "react";
import "../App.css";
import Footer from "./Footer";
import Navbar from "./Navbar";

function SignupPage() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [passwordDetailsText, setPasswordDetailsText] = useState(
    "Enter A Password That's Longer Than 6 Characters"
  );

  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);
  }, []);

  const checkPasswordFunc = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length > 6) {
      setPasswordDetailsText("Your Password Looks Good enough");
      setPasswordCheck(true);
    } else {
      setPasswordDetailsText("uh Oh , Your Password Doesn't look Good");
      setPasswordCheck(false);
    }
  };

  const disabledButton = () => {
    return (
      <button
        style={{
          borderRadius: "8px",
          fontSize: "1.5em",
          margin: "2%",
          fontWeight: "bold",
          borderBlockColor: "#800",
          borderColor: "#800",
          backgroundColor: "rgba(255,255,255,0)",
          color: "black",
        }}
        className="btnSignup"
        disabled
      >
        Signup
      </button>
    );
  };
  const enabledButton = () => {
    return (
      <button
        style={{
          borderRadius: "8px",
          fontSize: "1.5em",
          margin: "2%",
          fontWeight: "bold",
          borderBlockColor: "#800",
          borderColor: "#800",
          backgroundColor: "rgba(255,255,255,0)",
          color: "black",
        }}
        className="btnSignup"
      >
        Signup
      </button>
    );
  };
  const Signup = () => {
    return (
      <>
        <Navbar />
        <div
          className="container-fluid containerUser d-flex justify-content-center align-items-center flex-column text-center"
          style={{ minHeight: "100vh" }}
        >
          <p
            className="display-3"
            style={{
              marginBottom: "3%",
              color: "beige",
              textDecoration: "underline",
              textDecorationColor: "#800",
            }}
          >
            Youtube Courses IMDB
          </p>
          <div className="d-flex justify-content-center align-items-center flex-column shadow p-3 containerSignup">
            <p
              className="h1"
              style={{
                color: "beige",
                textDecoration: "underline",
                textDecorationColor: "#800",
              }}
            >
              Create An Account
            </p>

            <input
              className="form-control"
              placeholder="Name"
              className="inputSignup"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Username"
              className="inputSignup"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Email"
              className="inputSignup"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="form-control"
              placeholder="Password"
              className="inputSignup"
              type="password"
              value={password}
              onChange={(e) => checkPasswordFunc(e)}
            />
            <div
              className="d-flex justify-content-end text-muted"
              style={{ width: "70%" }}
            >
              {passwordDetailsText}
            </div>

            {passwordCheck ? enabledButton() : disabledButton()}
          </div>
        </div>
        <Footer />
      </>
    );
  };
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

  return <>{isPageLoading ? loadingPage() : Signup()}</>;
}

export default SignupPage;

import { useEffect, useState, useContext } from "react";
import "../App.css";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Axios from "axios";
import { LoginContext } from "../helper/LoginContext";
import { URL } from "./Data";

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
  const [waitingForFormResponse, setWaitingForFormResponse] = useState(false);
  const [displayingResponse, setDisplayingResponse] = useState(false);
  const [responseText, setReponseText] = useState("");
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  const signupButtonHandle = () => {
    setWaitingForFormResponse(true);
    const dataToBeSent = {
      name,
      username,
      email,
      password,
    };
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    Axios.post(`${URL}/api/v1/user/usersignup`, dataToBeSent, config)

      .then((res) => {
        console.log(res);
        console.log(res.data);
        setWaitingForFormResponse(false);
        if (res.data.userDataAdded) {
          setDisplayingResponse(true);
          setReponseText(
            `${username} , You have been successfully Added To The Web App`
          );
        }
      })
      .catch((error) => {
        setWaitingForFormResponse(false);
        setDisplayingResponse(true); // error.response.data || Still have to optimize my API for a more specific response...!!!
        setReponseText(
          "You have used a username or email , that's already present in database"
        );
      });
  };

  const checkPasswordFunc = (e) => {
    let temp = e.target.value.replace(/ /g, "");
    setPassword(temp);

    if (e.target.value.length > 6) {
      setPasswordDetailsText("Your Password Looks Good enough");
      setPasswordCheck(true);
    } else {
      setPasswordDetailsText("uh Oh , Your Password Doesn't look Good");
      setPasswordCheck(false);
    }
  };
  const checkNameFunc = (e) => {
    let temp = e.target.value.replace(/ /g, "");
    setName(temp);
  };
  const checkUsernameFunc = (e) => {
    let temp = e.target.value.replace(/ /g, "");
    setUsername(temp);
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
        onClick={signupButtonHandle}
        className="btnSignup"
      >
        Signup
      </button>
    );
  };

  const signupForm = () => {
    return (
      <>
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
          className="inputSignup"
          placeholder="Name"
          value={name}
          onChange={(e) => checkNameFunc(e)}
        />
        <input
          className="inputSignup"
          placeholder="Username"
          value={username}
          onChange={(e) => checkUsernameFunc(e)}
        />
        <input
          className="inputSignup"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="inputSignup"
          placeholder="Password"
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
      </>
    );
  };

  const signupResponse = () => {
    return (
      <>
        <p
          className="h1"
          style={{
            color: "beige",
            textDecoration: "underline",
            textDecorationColor: "#800",
          }}
        >
          {responseText}
        </p>
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
          onClick={() => setDisplayingResponse(false)}
          className="btnSignup"
        >
          Back To Form
        </button>
      </>
    );
  };

  const Signup = () => {
    return (
      <>
        <Navbar login={{ isUserLoggedIn, setIsUserLoggedIn }} />
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
          <div
            className="d-flex justify-content-center align-items-center flex-column shadow p-3 containerSignup"
            style={{ height: "60vh" }}
          >
            {waitingForFormResponse
              ? loadingPage()
              : displayingResponse
              ? signupResponse()
              : signupForm()}
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
          style={{ width: "30vh", height: "30vh", color: "#800" }}
        ></div>
      </div>
    );
  };

  return <>{isPageLoading ? loadingPage() : Signup()}</>;
}

export default SignupPage;

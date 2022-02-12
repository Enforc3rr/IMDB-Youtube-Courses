import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import VideoDetailsDisplay from "./components/VideoDetailsDisplay";
import SearchPage from "./components/SearchPage";
import SignupPage from "./components/SignupPage";
import { LoginContext } from "./helper/LoginContext";
import PrivateRoute from "./helper/PrivateRoute";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [doneloading, setDoneLoading] = useState(false);

  const isUserPresent = async () => {
    const getUserStatus = localStorage.getItem("tokenYoutubeIMDB");
    console.log(getUserStatus);
    getUserStatus ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      await isUserPresent();
      setDoneLoading(true);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("logged in state changed " + isUserLoggedIn);
  }, [isUserLoggedIn]);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
        <Routes>
          {isUserLoggedIn && (
            <>
              <Route path="/logout" element={<Logout />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </>
          )}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<Navigate to="/login" />} />
          <Route path="/vd/:videoID" element={<VideoDetailsDisplay />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;

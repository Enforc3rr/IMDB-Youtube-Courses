import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import VideoDetailsDisplay from "./components/VideoDetailsDisplay";
import SearchPage from "./components/SearchPage";
import SignupPage from "./components/SignupPage";
import { LoginContext } from "./helper/LoginContext";
import PrivateRoute from "./helper/PrivateRoute";
import UserProfile from "./components/UserProfile";
import VideoAvailabilityCheck from "./components/VideoAvailabilityCheck";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [doneloading, setDoneLoading] = useState(false);

  const isUserPresent = async () => {
    const getUserStatus = localStorage.getItem("tokenYoutubeIMDB");
    getUserStatus ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      await isUserPresent();
      setDoneLoading(true);
    };
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{ isUserLoggedIn, setIsUserLoggedIn, doneloading }}
      >
        <Routes>
          <Route
            path="/login"
            element={
              <PrivateRoute reversed to="/">
                <Login />
              </PrivateRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PrivateRoute reversed to="/">
                <SignupPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <PrivateRoute to="/login">
                <Logout />
              </PrivateRoute>
            }
          />
          <Route
            path="/videoadd"
            element={
              <PrivateRoute to="/login">
                <VideoAvailabilityCheck />
              </PrivateRoute>
            }
          />

          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/vd/:videoID" element={<VideoDetailsDisplay />} />
          <Route path="/u/:username" element={<UserProfile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;

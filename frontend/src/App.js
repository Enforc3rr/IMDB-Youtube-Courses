import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import SearchPage from "./components/SearchPage";
import SignupPage from "./components/SignupPage";
import { LoginContext } from "./helper/LoginContext";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  useEffect(() => {
    localStorage.getItem("tokenYoutubeIMDB")
      ? setIsUserLoggedIn(true)
      : setIsUserLoggedIn(false);
  }, []);

  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
        <Routes>
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </>
          {!isUserLoggedIn && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/logout" element={<Navigate to="/login" />} />
            </>
          )}
          {isUserLoggedIn && (
            <>
              <Route path="/logout" element={<Logout />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/signup" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;

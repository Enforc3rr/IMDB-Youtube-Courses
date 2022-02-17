import axios from "axios";
import { useContext, useEffect, useState } from "react";
import "../App.css";
import { LoginContext } from "../helper/LoginContext";
import DashboardCard from "./DashboardCard";
import { URL } from "./Data";
import Footer from "./Footer";
import LoadingAnimation from "./LoadingAnimation";
import Navbar from "./Navbar";

function Dashboard() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const { isUserLoggedIn, setIsUserLogged } = useContext(LoginContext);
  const [videosAdded, setVideosAdded] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("tokenYoutubeIMDB") && isUserLoggedIn) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
        },
      };
      axios
        .get(`${URL}/api/v1/user/userdetails`, config)
        .then((res) => {
          setLoggedInUser(res.data.username);
        })
        .catch((err) => {
          console.log(err);
          setLoggedInUser(false);
        });
    }
  }, [isUserLoggedIn]);

  const vFunc = (key) => {
    setVideosAdded((prev) => {
      return prev.filter((value) => value.videoID !== key);
    });
  };

  useEffect(() => {
    if (loggedInUser !== "") {
      axios.get(`${URL}/api/v1/user/${loggedInUser}`).then((response) => {
        setVideosAdded((prevValue) => {
          return response.data.coursesAdded;
        });
        setIsPageLoading(false);
      });
    }
  }, [loggedInUser]);

  const dashboard = () => {
    return (
      <>
        <Navbar login={{ isUserLoggedIn, setIsUserLogged }} />
        <div className="containerUser" style={{ minHeight: "100vh" }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                <h1
                  className="display-3"
                  style={{
                    color: "beige",
                    textDecoration: "underline",
                    textDecorationColor: "#800",
                  }}
                >
                  Dashboard
                </h1>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-12 text-center">
                <h2
                  style={{
                    color: "beige",
                    textDecoration: "underline",
                    textDecorationColor: "#800",
                  }}
                >
                  Videos Added
                </h2>
              </div>
              {videosAdded.map((value, index) => {
                return (
                  <div className="col-12" key={value.videoID}>
                    <DashboardCard func={vFunc} id={value.videoID} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  };

  return <>{isPageLoading ? <LoadingAnimation /> : dashboard()}</>;
}

export default Dashboard;

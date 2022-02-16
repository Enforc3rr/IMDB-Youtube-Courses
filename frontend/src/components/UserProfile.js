import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../helper/LoginContext";
import { URL } from "./Data";
import "../App.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Swal from "sweetalert2";
import VideoDetailsDisplayCardForUserProfile from "./VideoDetailsDisplayCardForUserProfile";

function UserProfile() {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [videosAddedByUser, setVideosAddedByUser] = useState([]);
  const [videosRatedByUser, setVideosRatedByUser] = useState([]);
  const [profileOwner, setProfileOwner] = useState(false);
  let { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("tokenYoutubeIMDB") && isUserLoggedIn) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
        },
      };
      Axios.get("http://localhost:8000/api/v1/user/userdetails", config)
        .then((res) => {
          setLoggedInUser(res.data.username);
        })
        .catch((error) => {
          console.log(error);
          setIsUserLoggedIn(false);
        });
    }

    Axios.get(`${URL}/api/v1/user/${username}`)
      .then((res) => {
        setVideosAddedByUser((prevVids) => {
          return res.data.coursesAdded;
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("No Such User Exists");
      });
    if (username === loggedInUser) {
      setProfileOwner(true);
    }
  }, []);

  return (
    <>
      <Navbar login={{ isUserLoggedIn, setIsUserLoggedIn }} />
      <div className="containerUser" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-12 col-md-12 d-flex justify-content-center align-items-center flex-column p-5">
              <img
                src="https://picsum.photos/300/300"
                style={{ width: "250px", height: "250px" }}
                alt=""
                className="img-fluid rounded-circle shadow-lg mb-2"
              />
              <h1
                className="display-3 mt-2 mb-4"
                style={{
                  color: "beige",
                  textDecoration: "underline",
                  textDecorationColor: "#800",
                }}
              >
                {username}
              </h1>
              {profileOwner ? (
                <>
                  <button
                    className="btn btn-outline-danger mt-1"
                    onClick={() => {
                      navigate("/videoadd");
                    }}
                  >
                    Add Video
                  </button>
                  <button
                    className="btn btn-outline-danger mt-1"
                    onClick={() => {
                      navigate("/logout");
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : null}
            </div>

            <div className="col-sm-12 col-lg-12 col-md-12">
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-md-12 text-center">
                  <h3
                    className="mt-1 mb-4"
                    style={{
                      color: "beige",
                      textDecoration: "underline",
                      textDecorationColor: "#800",
                    }}
                  >
                    Last Three Video Details Added
                  </h3>
                </div>
                {videosAddedByUser
                  .slice(
                    videosAddedByUser.length - 4,
                    videosAddedByUser.length - 1
                  )
                  .map((value) => {
                    return (
                      <div className="col-md-6 col-lg-4 col-sm-12">
                        (
                        <VideoDetailsDisplayCardForUserProfile
                          videoID={value.videoID}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;

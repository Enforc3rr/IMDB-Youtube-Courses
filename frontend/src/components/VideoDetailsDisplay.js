import { useContext, useEffect, useRef, useState } from "react";
import { Rating as ReactStars } from "react-simple-star-rating";
import "../App.css";

import { useParams } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";
import { LoginContext } from "../helper/LoginContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactPlayer from "react-player/youtube";
import Axios from "axios";
import Swal from "sweetalert2";
import { URL } from "./Data.js";

/*
 * To change the url to fetch videoID from params . [done]
 * Adding Ratings data to the server. [will do it after fixing "/logout" bug]
 * To Add certains animations etc in the UI .
 * Add Channel Link and Details Added By User(his profile Link).
 */
function VideoDetailsDisplay() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);

  let { videoID } = useParams();

  // USE STATE HOOK
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [videoURL, setVideoURL] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUploadedBy, setVideoUploadedBy] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const [videoCategory, setVideoCategory] = useState("");
  const [videoTopic, setVideoTopic] = useState("");
  const [videoRating, setVideoRating] = useState(0);
  const [ratingsReceived, setRatingsReceived] = useState([]);
  const [videoAddedToWebAppBy, setVideoAddedToWebAppBy] = useState("");
  const [hasUserRatedThisBefore, setHasUserRatedThisBefore] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [usersRatingData, setUsersRatingData] = useState([]);

  // USE REF HOOK
  const ratingGotMounted = useRef(false);
  const userRatingGotMounted = useRef(false);
  const ratingsReceivedGotMounted = useRef(false);

  // USE EFFECT HOOK

  useEffect(() => {
    Axios.get(
      `https://youtube-courses-imdb.herokuapp.com/api/v1/video/getvideo/${videoID}`
    )
      .then((response) => {
        setVideoURL(response.data.videoURL);
        setVideoTitle(response.data.videoTitle);
        setVideoUploadedBy(response.data.videoUploadedBy);
        setVideoThumbnail(response.data.videoThumbnailURL);
        setVideoCategory(response.data.videoCategory);
        setVideoTopic(response.data.videoTopic);
        setVideoRating(response.data.videoRating);
        setRatingsReceived(() => {
          return response.data.ratingsReceived;
        });
        setVideoAddedToWebAppBy(response.data.videoAddedToWebAppBy);

        setIsPageLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (ratingsReceivedGotMounted.current) {
      if (ratingsReceived.length !== 0 && usersRatingData.length < 3) {
        if (ratingsReceived.length === 1) {
          setUsersRatingData((oldValue) => {
            return [...oldValue, ratingsReceived[0]];
          });
        } else if (ratingsReceived.length === 2) {
          for (
            let i = ratingsReceived.length - 1;
            i >= ratingsReceived.length - 2;
            i--
          ) {
            setUsersRatingData((oldValue) => {
              return [...oldValue, ratingsReceived[i]];
            });
          }
        } else {
          for (
            let i = ratingsReceived.length - 4;
            i >= ratingsReceived.length - 1;
            i--
          ) {
            setUsersRatingData((oldValue) => {
              return [...oldValue, ratingsReceived[i]];
            });
          }
        }

        const userTempRating = ratingsReceived.filter((value) => {
          return value.ratingsReceivedBy === loggedInUser;
        });

        if (userTempRating.length !== 0) {
          setHasUserRatedThisBefore(true);
          setUserRating(userTempRating[0].ratingValue);
        }
      }
    } else {
      ratingsReceivedGotMounted.current = true;
    }
  }, [ratingsReceived]);

  useEffect(() => {
    if (ratingGotMounted.current) {
      setUserRating(rating / 20);
    } else {
      ratingGotMounted.current = true;
    }
  }, [rating]);

  useEffect(() => {
    if (userRatingGotMounted.current) {
      if (!hasUserRatedThisBefore) {
        setHasUserRatedThisBefore(true);
        const tempUserData = {
          ratingsReceivedBy: loggedInUser,
          ratingValue: userRating,
        };

        if (usersRatingData.length <= 2) {
          setUsersRatingData((oldValue) => {
            return [...oldValue, tempUserData];
          });
        } else {
          setUsersRatingData((oldValue) => {
            oldValue.shift();
            return [...oldValue, tempUserData];
          });
        }

        tempUserData["videoID"] = videoID;
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
          },
        };
        Axios.post(`${URL}/api/v1/video/ratings`, tempUserData, config).then(
          (res) => {
            Swal.fire(
              {
                icon: "success",
                title: "Yay..!",
                text: "Your Rating Has Been Added",
              },
              1500
            );
          }
        );
      }
    } else {
      userRatingGotMounted.current = true;
    }
  }, [userRating]);

  // Functions

  const setUserRatingFunction = (ratingValue) => {
    setRating(ratingValue);
  };
  const rateDisplay = () => {
    return (
      <>
        {hasUserRatedThisBefore ? (
          <div className="row" style={{ width: "100%", margin: "auto" }}>
            <div className="col-lg-4 col-sm-12 text-center">
              <h4>Your Rating</h4>
            </div>
            <div className="col-lg-8 col-sm-12 text-md">
              <ReactStars
                size={"25px"}
                readonly={true}
                initialValue={userRating}
                transition={true}
              />
            </div>
          </div>
        ) : (
          <div
            className="row"
            style={{
              width: "100%",
              margin: "auto",
            }}
          >
            <div className="col-lg-4 col-sm-12 col-md-4 text-center">
              <h4>Rate :</h4>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 text-md">
              <ReactStars
                count={5}
                ratingValue={rating}
                size={"25px"}
                onClick={setUserRatingFunction}
                allowHover={true}
                allowHalfIcon={true}
                transition={true}
                activeColor="#ffd700"
              />
            </div>
          </div>
        )}
      </>
    );
  };
  const detailsContainer = () => {
    return (
      <>
        <div
          className="container p-4"
          style={{ minHeight: "100vh", color: "beige" }}
        >
          <div className="row">
            <div className="col-12 col-lg-12 d-flex justify-content-center mb-4">
              <ReactPlayer url={videoURL} light={true} controls={true} />
            </div>
            <div
              className="col-12 col-lg-12 text-center"
              style={{
                textDecoration: "underline",
                textDecorationColor: "#800",
              }}
            >
              <h1>{videoTitle}</h1>
            </div>
            <div className="col-12 col-lg-12 text-center">
              <h2>
                By{" "}
                <u style={{ textDecorationColor: "#800" }}>{videoUploadedBy}</u>
              </h2>
            </div>
            <div className="col-12 col-lg-12 text-center">
              <h5>
                Details Added By{" "}
                <a
                  href={`/u/${videoAddedToWebAppBy}`}
                  style={{ color: "beige" }}
                >
                  <u style={{ textDecorationColor: "#800" }}>
                    {videoAddedToWebAppBy}
                  </u>
                </a>
              </h5>
            </div>
            <div className="col-12 col-lg-10 mt-5">
              <div className="row">
                {isUserLoggedIn ? (
                  rateDisplay()
                ) : (
                  <>
                    <div className="col-lg-4 col-sm-12 text-center">
                      {" "}
                      <h4>Rate :</h4>
                    </div>
                    <div className="col-lg-8 col-sm-12">
                      {" "}
                      <h4>
                        <a href="/login" className="text-danger">
                          Login
                        </a>{" "}
                        To Rate The Video
                      </h4>
                    </div>
                  </>
                )}
                <div className="col-lg-4 col-sm-12 text-center">
                  <h4>Ratings :</h4>
                </div>
                <div className="col-lg-8 col-sm-12 text-md">
                  <ReactStars
                    size={"25px"}
                    readonly={true}
                    initialValue={videoRating}
                    transition={true}
                  />
                </div>
                <div className="col-lg-4 col-sm-12 text-center">
                  <h4>Category</h4>
                </div>
                <div className="col-lg-8 col-sm-12 text-md">
                  <h4>
                    {videoCategory[0].toUpperCase() +
                      videoCategory.substring(1)}
                  </h4>
                </div>
                <div className="col-lg-4 col-sm-12 text-center">
                  <h4>Topic</h4>
                </div>
                <div className="col-lg-8 col-sm-12 text-md">
                  <h4>
                    {videoTopic[0].toUpperCase() + videoTopic.substring(1)}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-12 mt-5">
              <div className="row" style={{ border: "2px solid black" }}>
                <table style={{ width: "100%", textAlign: "center" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          borderRight: "2px solid black",
                          fontSize: "25px",
                        }}
                      >
                        #
                      </th>
                      <th
                        style={{
                          borderRight: "1px solid black",
                          fontSize: "25px",
                        }}
                      >
                        User
                      </th>
                      <th style={{ fontSize: "25px" }}>Rating</th>
                    </tr>
                  </thead>
                  <tbody style={{ borderTop: "5px solid black" }}>
                    {usersRatingData.map((value, index) => {
                      return (
                        <tr>
                          <td
                            style={{
                              borderRight: "2px solid black",
                              fontSize: "20px",
                            }}
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{
                              borderRight: "1px solid black",
                              fontSize: "20px",
                            }}
                          >
                            {value.ratingsReceivedBy}
                          </td>
                          <td style={{ fontSize: "20px" }}>
                            {value.ratingValue}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isPageLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <Navbar login={{ isUserLoggedIn }} />
          <div
            className="container-fluid containerUser"
            style={{ minHeight: "100vh" }}
          >
            {detailsContainer()}
          </div>
          <Footer />
        </>
      )}
    </>
  );
}

export default VideoDetailsDisplay;

import { useEffect, useRef, useState } from "react";
import { Rating as ReactStars } from "react-simple-star-rating";
import "../App.css";
import axios from "axios";
import { useParams } from "react-router-dom";

/*
 * To change the url to fetch videoID from params .
 * Adding Ratings data to the server
 * To Add certains animations etc in the UI .
 * Add Channel Link and Details Added By User(his profile Link).
 */
function VideoDetailsDisplay() {
  const [loggedInUser, setLoggedInUser] = useState("TestUser");

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
    axios
      .get(`http://localhost:8000/api/v1/video/getvideo/${videoID}`)
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
    if (ratingsReceivedGotMounted.current) {
      if (ratingsReceived.length !== 0 && usersRatingData.length < 3) {
        for (
          let i = ratingsReceived.length - 3;
          i < ratingsReceived.length;
          i++
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
        //sending data to server .
        setUsersRatingData((oldValue) => {
          oldValue.shift();
          return [...oldValue, tempUserData];
        });
      }
    } else {
      userRatingGotMounted.current = true;
    }
  }, [userRating]);

  // Functions
  const setUserRatingFunction = (ratingValue) => {
    setRating(ratingValue);
  };

  return (
    <div>
      {isPageLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100wv", height: "100vh" }}
        >
          <div
            className="spinner-grow"
            style={{ width: "20vh", height: "20vh" }}
          ></div>
        </div>
      ) : (
        <div className="container" style={{ minHeight: "100vh" }}>
          <div className="row">
            <div className="col-12 col-lg-12 text-center">
              <a href={videoURL}>
                <img className="img-fluid" src={videoThumbnail} alt="" />
              </a>
            </div>
            <div className="col-12 col-lg-12 text-center">
              <h1>{videoTitle}</h1>
            </div>
            <div className="col-12 col-lg-12 text-center">
              <h2>By {videoUploadedBy}</h2>
            </div>
            <div className="col-12 col-lg-12 text-center">
              <h4>Details Added By {videoAddedToWebAppBy} </h4>
            </div>
            <div className="col-12 col-lg-10">
              <div className="row">
                {hasUserRatedThisBefore ? (
                  <div
                    className="row"
                    style={{ width: "100%", margin: "auto" }}
                  >
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
                <div className="col-lg-4 col-sm-12 text-center">
                  <h4>Ratings</h4>
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
                  <h4>{videoCategory}</h4>
                </div>
                <div className="col-lg-4 col-sm-12 text-center">
                  <h4>Topic</h4>
                </div>
                <div className="col-lg-8 col-sm-12 text-md">
                  <h4>{videoTopic}</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-12">
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
      )}
    </div>
  );
}

export default VideoDetailsDisplay;

import { useEffect, useState } from "react";
import { Rating as ReactStars } from "react-simple-star-rating";
import { userRatingsDemo } from "./components/Data";
import "./App.css";
import axios from "axios";

function App() {
  const [videoID, setVideoID] = useState("");
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
  const [rating, setRating] = useState(0);
  const [userRatingData, setUserRatingData] = useState([]);

  const setUserRatingFunction = (ratingValue) => {
    console.log(ratingValue / 20);
    setRating(ratingValue);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/video/getvideo/K1iu1kXkVoA`)
      .then((response) => {
        setVideoID(response.data.videoID);
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (ratingsReceived.length !== 0 && userRatingData.length < 3) {
      for (
        let i = ratingsReceived.length - 1;
        i > ratingsReceived.length - 4;
        i--
      ) {
        setUserRatingData((oldValue) => {
          return [...oldValue, ratingsReceived[i]];
        });
      }
      console.log(ratingsReceived);
    }
  }, [ratingsReceived]);

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-12 col-lg-12 text-center">
          <img className="img-fluid" src={videoThumbnail} alt="" />
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
              <div className="row" style={{ width: "100%", margin: "auto" }}>
                <div className="col-lg-4 col-sm-12 text-center">
                  <h4>Your Rating</h4>
                </div>
                <div className="col-lg-8 col-sm-12 text-md">
                  <ReactStars
                    count={5}
                    value={4.2}
                    size={25}
                    edit={false}
                    activeColor="#ffd700"
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
                    style={{ borderRight: "2px solid black", fontSize: "25px" }}
                  >
                    #
                  </th>
                  <th
                    style={{ borderRight: "1px solid black", fontSize: "25px" }}
                  >
                    User
                  </th>
                  <th style={{ fontSize: "25px" }}>Rating</th>
                </tr>
              </thead>
              <tbody style={{ borderTop: "5px solid black" }}>
                {userRatingData.map((value, index) => {
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
                      <td style={{ fontSize: "20px" }}>{value.ratingValue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

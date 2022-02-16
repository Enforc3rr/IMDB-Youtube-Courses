import Axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "./Data";
import "../App.css";
import { Rating as ReactStars } from "react-simple-star-rating";

function VideoDetailsDisplayCardForUserProfile(props) {
  const [videoThumbnailURL, setVideoThumbnailURL] = useState("");
  const [videoRatings, setVideoRatings] = useState(0);
  const [videoTitle, setVideoTitle] = useState("");

  useEffect(() => {
    Axios.get(`${URL}/api/v1/video/getvideo/${props.videoID}`).then(
      (response) => {
        setVideoThumbnailURL(response.data.videoThumbnailURL);
        setVideoRatings(response.data.videoRating);
        setVideoTitle(response.data.videoTitle);
      }
    );
  }, []);

  const card = () => {
    return (
      <div
        className="d-flex align-items-center flex-column mb-3 p-2 container videoDetailsCard"
        style={{ height: "40vh" }}
      >
        <img
          src={videoThumbnailURL}
          style={{
            padding: "20px",
            marginBottom: "5px",
            height: "70%",
            width: "90%",
          }}
        />
        <a
          href={`/vd/${props.videoID}`}
          style={{ textAlign: "center", color: "#800" }}
        >
          {videoTitle}
        </a>
        <ReactStars
          size={"20px"}
          readonly={true}
          transition={true}
          initialValue={videoRatings}
        />
      </div>
    );
  };

  return <>{card()}</>;
}

export default VideoDetailsDisplayCardForUserProfile;

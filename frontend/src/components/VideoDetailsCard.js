import { useState, useEffect } from "react";
import { Rating as ReactStars } from "react-simple-star-rating";
import "../App.css";

function VideoDetailsCard(props) {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [totalRating, setTotalRating] = useState(0);
  const [topic, setTopic] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videoDetailsPage, setVideoDetailsPage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setTitle(props.data.videoTitle);
      setThumbnail(props.data.videoThumbnailURL);
      setUploadedBy(props.data.videoUploadedBy);
      setTotalRating(props.data.videoRating);
      setVideoLink(`https://www.youtube.com/watch?v=${props.data.videoID}`);
      setTopic(props.data.videoTopic);
      setVideoDetailsPage(`/vd/${props.data.videoID}`);
      setIsPageLoading(false);
    }, 1000);
  }, []);

  const skeletonLoadingEffect = () => {
    return (
      <div className="ph-item">
        <div className="ph-col-12">
          <div className="ph-picture"></div>
          <div className="ph-row">
            <div className="ph-col-12 big"></div>
            <div className="ph-col-12 empty big"></div>
            <div className="ph-col-12"></div>
            <div className="ph-col-12"></div>
            <div className="ph-col-12"></div>
            <div className="ph-col-12 empty big"></div>
            <div className="ph-col-12 big"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      {isPageLoading ? (
        skeletonLoadingEffect()
      ) : (
        <div
          className="card shadow m-3 videoDetailsCard"
          style={{
            minHeight: "50vh",
            borderRadius: "15px",
            color: "black",
            border: "1px solid black",
          }}
        >
          <div className="card-header text-center p-2">
            <img
              src={thumbnail}
              alt="#"
              href="thumbnail"
              className="img-fluid"
            />
          </div>
          <div className="card-body text-center" style={{ height: "10vh" }}>
            <h5 className="card-title videoCardTitle">{title}</h5>
          </div>
          <div
            className="card-body d-flex justify-content-center align-items-center"
            style={{ fontSize: "1em" }}
          >
            <ul>
              <li>By : {uploadedBy}</li>
              <li>Topic : {topic[0].toUpperCase() + topic.substring(1)}</li>
              <li>
                Score :
                <ReactStars
                  size={"25px"}
                  readonly={true}
                  transition={true}
                  initialValue={totalRating}
                />
              </li>
            </ul>
          </div>
          <div
            className="card-footer text-center d-flex justify-content-center align-items-center"
            style={{ borderTopColor: "black", borderTopWidth: "2px" }}
          >
            <button
              type="button"
              onClick={() => {
                window.open(videoLink);
              }}
              className="videoDetailsCardButton"
            >
              Video Link
            </button>
            <button
              type="button"
              onClick={() => {
                window.open(videoDetailsPage);
              }}
              className="videoDetailsCardButton"
            >
              Video Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetailsCard;

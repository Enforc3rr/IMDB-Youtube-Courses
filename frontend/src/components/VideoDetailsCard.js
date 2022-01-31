import { useState, useEffect } from "react";
import { Rating as ReactStars } from "react-simple-star-rating";

function VideoDetailsCard(props) {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [totalRating, setTotalRating] = useState(0);
  const [topic, setTopic] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoLink, setVideoLink] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setTitle(props.data.videoTitle);
      setThumbnail(props.data.videoThumbnailURL);
      setUploadedBy(props.data.videoUploadedBy);
      setTotalRating(props.data.videoRating);
      setVideoLink(`https://www.youtube.com/watch?v=${props.data.videoID}`);
      setTopic(props.data.videoTopic);
      setIsPageLoading(false);
    }, 1000);
  }, []);

  const skeletonLoadingEffect = () => {
    return (
      
    );
  };

  return (
    <div className="container">
      {isPageLoading ? (
        skeletonLoadingEffect()
      ) : (
        <div className="card shadow m-3" style={{ height: "75vh" }}>
          <div className="card-header text-center p-2">
            <img
              src={thumbnail}
              alt="#"
              href="thumbnail"
              className="img-fluid"
            />
          </div>
          <div className="card-body text-center">
            <h4 className="card-title">{title}</h4>
          </div>
          <div className="card-body">
            <p className="card-text">
              <ul>
                <li>By : {uploadedBy}</li>
                <li>Topic : {topic}</li>
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
            </p>
          </div>
          <div className="card-footer text-center">
            <button
              type="button"
              onClick={() => {
                window.open(videoLink);
              }}
              className="btn btn-primary"
            >
              Video Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoDetailsCard;

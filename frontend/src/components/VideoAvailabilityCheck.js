import axios from "axios";
import { useEffect, useState } from "react";

function VideoAvailabilityCheck() {
  const [videoPresent, setVideoPresent] = useState(null);
  const [initialCheck, setInitialCheck] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const checkVideoAvailabilty = async () => {
    setInitialCheck(true);
    //To add video url verification check .
    const videoID = videoUrl.split("watch?v=")[1].split("&")[0];
    const response = await axios.get(
      `http://localhost:8000/api/v1/video/videocheck?vid=${videoID}`
    );
    if (response.data.isVideoPresent) {
      setVideoPresent(true);
    } else {
      setVideoPresent(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ border: "2px solid black", minHeight: "100vh" }}
    >
      <div className="form-group row shadow-lg" style={{ width: "100%" }}>
        <div className="text-center col-sm-12 col-md-12 col-lg-12">
          <h2 className="display-4">
            <u>Add Video Details</u>
          </h2>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4 pl-5 pt-1">
          <label htmlFor="youtubeLink" className="display-4">
            Video Link
          </label>
        </div>
        <div className="col-sm-12 col-md-8 col-lg-8 mt-2">
          <input
            type="text"
            id="youtubeLink"
            className="form-control"
            style={{ height: "75%" }}
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <div className="col-12 text-center">
          {!initialCheck ? (
            <button className="btn btn-primary" onClick={checkVideoAvailabilty}>
              Check Availability
            </button>
          ) : !videoPresent ? (
            <button className="btn btn-green">Next</button>
          ) : (
            <button className="btn btn-danger" disabled>
              Video is already present
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoAvailabilityCheck;

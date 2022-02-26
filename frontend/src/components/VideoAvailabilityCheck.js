import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import VideoDetailsForm from "./VideoDetailsForm";
import "../App.css";
import { URL } from "./Data";
import { LoginContext } from "../helper/LoginContext";
import Swal from "sweetalert2";

function VideoAvailabilityCheck() {
  const [videoPresent, setVideoPresent] = useState(null);
  const [initialCheck, setInitialCheck] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [next, setNext] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    if (isUserLoggedIn && localStorage.getItem("tokenYoutubeIMDB")) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
        },
      };
      Axios.get(`${URL}/api/v1/user/userdetails`, config)
        .then((res) => {
          setLoggedInUser(res.data.username);
        })
        .catch((err) => {
          setIsUserLoggedIn(false);
        });
    }
  }, []);

  function youtube_parser(url) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const checkVideoAvailabilty = async () => {
    setInitialCheck(true);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
      },
    };
    let videoID = youtube_parser(videoUrl);
    //To add video url verification check .
    if (!videoID) {
      Swal.fire("Wrong URL");
    }
    const response = await Axios.get(
      `${URL}/api/v1/video/videocheck?vid=${videoID}`,
      config
    );
    if (response.data.isVideoPresent) {
      setVideoPresent(true);
    } else {
      setVideoPresent(false);
    }
  };

  const videoDetails = () => {
    setNext(true);
  };

  return (
    <>
      <div className="containerUser" style={{ minHeight: "100vh" }}>
        {!next ? (
          <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
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
                  <button
                    className="btn btn-primary"
                    onClick={checkVideoAvailabilty}
                  >
                    Check Availability
                  </button>
                ) : !videoPresent ? (
                  <button className="btn btn-green" onClick={videoDetails}>
                    Next
                  </button>
                ) : (
                  <button className="btn btn-danger" disabled>
                    Video is already present
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <VideoDetailsForm videoUrl={`${videoUrl}`} user={loggedInUser} />
        )}
      </div>
    </>
  );
}

export default VideoAvailabilityCheck;

import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { langArray, categories, URL } from "./Data";
import { LoginContext } from "../helper/LoginContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingAnimation from "./LoadingAnimation";
import Navbar from "./Navbar";
import Footer from "./Footer";

function VideoDetailsForm(props) {
  const [category, setCategory] = useState();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState();
  const [thumbnail, setThumbnail] = useState("");
  const [title, setTitle] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [videoTopicPropertyName, setVideoTopicPropertyName] =
    useState("Video Topic");
  const videoID = props.videoUrl.split("watch?v=")[1].split("&")[0];
  const [loadingDetailsForm, setLoadingDetailsForm] = useState(true);
  const [displayResponse, setDisplayResponse] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${URL}/api/v1/video/youtubeinfo?vid=${videoID}`)
      .then((response) => {
        setThumbnail(response.data.youtubeInfo.videoThumbnailURL);
        setTitle(response.data.youtubeInfo.videoTitle);
        setUploadedBy(response.data.youtubeInfo.videoUploadedBy);
        setLoadingDetailsForm(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingDetailsForm(false);
      });
  }, []);

  useEffect(() => {
    if (categories[category] === "Programming")
      setVideoTopicPropertyName("Technology/Programming Language");
  }, [category]);

  const submitData = () => {
    setLoadingDetailsForm(true);

    const data = {
      videoURL: props.videoUrl,
      videoCategory: categories[category],
      videoTopic: topic,
      videoDescription: description,
      videoLanguage: langArray[language],
      videoAddedToWebAppBy: props.user,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
      },
    };
    Axios.post(`${URL}/api/v1/video/addvideo`, data, config)
      .then((res) => {
        setLoadingDetailsForm(false);
        setDisplayResponse(true);
        setTimeout(() => {
          navigate(`/vd/${videoID}`);
        }, 1500);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoadingDetailsForm(false);

        if (!err.response.data.videoDataAdded) {
          navigate("/videocheck");
          //Will Change this later
          Swal.fire({ title: "Duplication", timer: "2000" });
        } else if (err.response.data.errorCode === "INVALID_TOKEN") {
          setIsUserLoggedIn(false);
          navigate("/");
        } else {
          Swal.fire({ title: "Some Error Occured", timer: "2000" });
        }
      });
  };
  const response = () => {
    return (
      <>
        <div
          className="container d-flex justify-content-center align-items-center flex-column shadow-lg"
          style={{ minHeight: "100vh ", color: "beige" }}
        >
          <h1 className="display-4" style={{ textDecorationColor: "#800" }}>
            <u>Your Video Has Been Successfully Added</u>
          </h1>
          <h2>Redirecting... </h2>
        </div>
      </>
    );
  };
  const form = () => {
    return (
      <>
        <div
          className="container d-flex justify-content-center align-items-center shadow-lg "
          style={{ color: "beige" }}
        >
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 text-center">
              <img src={thumbnail} alt="#" className="img-fluid p-3" />
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 text-center">
              <h1>{title}</h1>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12 text-center ">
              <h2>
                By <u>{uploadedBy}</u>{" "}
              </h2>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
              {/* Video Category  */}
              <div className="form-group row mt-4">
                <div className="col-lg-6 col-sm-12 text-center">
                  <h3 htmlFor="videoCategory">Video Category</h3>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <select
                    className="form-select text-center"
                    style={{ width: "100%", height: "100%" }}
                    id="videoCategories"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((data, index) => {
                      return <option value={index}>{data}</option>;
                    })}
                  </select>
                </div>
              </div>
              {/* Video Topic */}
              <div className="form-group row mt-4">
                <div className="col-lg-6 col-sm-12 text-center">
                  <h3 htmlFor="videoTopic">{videoTopicPropertyName}</h3>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <input
                    id="videoTopic"
                    placeholder={videoTopicPropertyName}
                    className="form-control"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              {/* Video Description */}
              <div className="form-group row mt-4">
                <div className="col-lg-6 col-sm-12 text-center">
                  <h3 htmlFor="videoDescription">Video Description</h3>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <input
                    id="videoDescription"
                    className="form-control"
                    placeholder="Enter Small Video Description"
                    style={{ width: "100%" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              {/* Language */}
              <div className="form-group row mt-4">
                <div className="col-lg-6 col-sm-12 text-center">
                  <h3 htmlFor="videoLanguage">Language</h3>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <select
                    className="form-select text-center"
                    style={{ width: "100%", height: "100%" }}
                    id="videoLanguage"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {langArray.map((data, index) => {
                      return (
                        <option key={index} value={index}>
                          {data}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
            <div
              className="col-lg-12 col-sm-12 text-center"
              style={{ borderTop: "2px solid #D3D3D3 " }}
            >
              <button className="btn btn-outline-success" onClick={submitData}>
                Click Here To Add
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {loadingDetailsForm ? (
        <LoadingAnimation />
      ) : (
        <>
          {!displayResponse ? form() : response()} <Footer />
        </>
      )}
    </>
  );
}

export default VideoDetailsForm;

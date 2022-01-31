import axios from "axios";
import { useState, useEffect } from "react";
import { langArray, categories } from "./Data";

function VideoDetailsForm(props) {
  const [category, setCategory] = useState();
  const [topic, setTopic] = useState();
  const [description, setDescription] = useState();
  const [language, setLanguage] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [title, setTitle] = useState();
  const [uploadedBy, setUploadedBy] = useState();
  const [videoTopicPropertyName, setVideoTopicPropertyName] =
    useState("Video Topic");
  const videoID = props.videoUrl.split("watch?v=")[1].split("&")[0];
  const [loadingDetailsForm, setLoadingDetailsForm] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/video/youtubeinfo?vid=${videoID}`)
      .then((response) => {
        setLoadingDetailsForm(false);
        setThumbnail(response.data.youtubeInfo.videoThumbnailURL);
        setTitle(response.data.youtubeInfo.videoTitle);
        setUploadedBy(response.data.youtubeInfo.videoUploadedBy);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (categories[category] === "Programming")
      setVideoTopicPropertyName("Technology/Programming Language");
  }, [category]);

  const submitData = () => {
    // TO add check to not leave value of category and langauge at 0.
    const data = {
      videoCategory: categories[category],
      videoTopic: topic,
      videoDescription: description,
      language: langArray[language],
    };
  };
  return (
    <div>
      {loadingDetailsForm ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: "100wv", height: "100vh" }}
        >
          <div
            className="spinner-grow"
            style={{ width: "40vh", height: "40vh" }}
          ></div>
        </div>
      ) : (
        <div className="container d-flex justify-content-center align-items-center shadow-lg ">
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
      )}
    </div>
  );
}

export default VideoDetailsForm;

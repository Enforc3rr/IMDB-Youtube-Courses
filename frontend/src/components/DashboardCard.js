import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { LoginContext } from "../helper/LoginContext";
import { URL } from "./Data";
import "../App.css";
import SkeletonLoadingEffect from "./SkeletonLoadingEffect";

function DashboardCard(props) {
  const [videoTitle, setVideoTitle] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext);
  const [isCardLoading, setIsCardLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${URL}/api/v1/video/getvideo/${props.id}`)
      .then((response) => {
        setVideoTitle(response.data.videoTitle);
        setVideoThumbnail(response.data.videoThumbnailURL);
        setIsCardLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onDeleteHandle = (key) => {
    props.func(key);
    if (isUserLoggedIn) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenYoutubeIMDB")}`,
        },
      };
      axios
        .delete(`${URL}/api/v1/video/delvideo/${key}`, config)
        .then((res) => {
          Swal.fire(
            {
              icon: "success",
              text: "Video Has Been Successfully Deleted",
            },
            1500
          );
        })
        .catch((err) => {
          if (err.response.data.errorCode === "INVALID_TOKEN")
            setIsUserLoggedIn(false);
          else console.log(err);
        });
    }
  };
  const card = () => {
    return (
      <>
        <div
          className="container shadow "
          style={{
            margin: "auto",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <div className="row">
            <div className="col-sm-12 col-lg-4 text-center">
              <img
                src={videoThumbnail}
                className="img-fluid "
                style={{ width: "60%", height: "80%", margin: "10px" }}
              />
            </div>
            <div className="col-sm-12 col-lg-4 text-center">
              <h3
                style={{
                  color: "beige",
                  textDecoration: "underline",
                  textDecorationColor: "#800",
                }}
              >
                {videoTitle}
              </h3>
            </div>
            <div className="col-sm-12 col-lg-4 text-center">
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteHandle(props.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return <>{isCardLoading ? <SkeletonLoadingEffect /> : card()}</>;
}

export default DashboardCard;

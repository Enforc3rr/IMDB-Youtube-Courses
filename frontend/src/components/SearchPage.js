import VideoDetailsCard from "./VideoDetailsCard";
import { useState, useEffect, useRef } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

function SearchPage() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [responseArray, setResponseArray] = useState([]);
  const [search, setSearch] = useState("");
  const [topic, setTopic] = useState("");
  const [rating, setRating] = useState(0);

  const ratingsArray = useRef([0, 1, 2, 3, 4, 5]);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  const addViaEnter = (e) => {
    if (e.keyCode === 13) {
      onSearchHandle();
    }
  };

  const onSearchHandle = () => {
    let url;
    if (search !== "" && rating !== 0 && topic !== 0) {
      url = `http://localhost:8000/api/v1/video/fetchquery?title=${search}&rating=${rating}&topic=${topic}`;
    } else if (search !== "" && rating !== 0 && topic === "") {
      url = `http://localhost:8000/api/v1/video/fetchquery?title=${search}&rating=${rating}`;
    } else if (search !== "" && topic === "" && rating === 0) {
      url = `http://localhost:8000/api/v1/video/fetchquery?title=${search}`;
    } else if (search !== "" && topic !== "" && rating === 0) {
      url = `http://localhost:8000/api/v1/video/fetchquery?title=${search}&topic=${topic}`;
    } else if (search === "" && topic !== "" && rating === 0) {
      url = `http://localhost:8000/api/v1/video/fetchquery?topic=${topic}`;
    } else if (search !== "" && topic !== "" && rating !== 0) {
      url = `http://localhost:8000/api/v1/video/fetchquery?title=${search}&topic=${topic}`;
    }

    if (search === "" && topic === "") {
      setIsPageLoading(false);
      Swal.fire({
        icon: "error",
        title: "Empty Search And Topic Field",
        text: "You can't have Both Search And Topic Field Empty At Same Time",
      });
    } else {
      if (url !== "") {
        setIsPageLoading(true);
        Axios.get(url)
          .then((response) => {
            setResponseArray(() => response.data);
            setIsPageLoading(false);
            url = null;
          })
          .catch((error) => {
            setIsPageLoading(false);
            console.log(error);
          });
      }
    }
  };

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <div className="row">
        <div className="col-sm-12 col-lg-7 col-md-12 mb-3 mt-3 p-3">
          <input
            placeholder="Search Here..."
            style={{
              width: "100%",
              height: "10vh",
              fontSize: "5vh",
              fontWeight: "bold",
            }}
            onKeyDown={addViaEnter}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-sm-12 col-lg-5 col-md-12 mb-3 mt-3 p-3">
          <div className="row">
            <div
              className="col-sm-12 col-lg-12 col-md-12 mt-1"
              style={{ height: "50%" }}
            >
              <input
                placeholder="Topic..."
                style={{
                  width: "100%",
                  height: "50%",
                  fontSize: "3vh",
                  fontWeight: "bold",
                }}
                onKeyDown={addViaEnter}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div
              className="col-sm-12 col-lg-12 col-md-12 mt-1"
              style={{ height: "50%" }}
            >
              <div className="row">
                <div className="col-sm-2 col-lg-2 col-md-2 text-center">
                  <h5>Ratings</h5>
                </div>
                <div className="col-sm-10 col-lg-10 col-md-10 text-center">
                  <select
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    style={{ width: "100%" }}
                  >
                    {ratingsArray.current.map((value, index) => {
                      return <option key={index}>{value}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-sm-12 col-lg-12 col-md-12 mt-1 text-center mb-2"
          style={{
            borderBottom: "2px solid black",
          }}
        >
          <button className="btn btn-outline-success" onClick={onSearchHandle}>
            Search
          </button>
        </div>
        <div className="container">
          {isPageLoading ? (
            <div className="container">
              <div className="spinner-grow"> </div>
            </div>
          ) : (
            <div className="row">
              {responseArray.map((value, index) => {
                return (
                  <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
                    <VideoDetailsCard data={value} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;

import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import "./ButtonHomePage.css";

function HomePage() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsPageLoading(false);
    }, 500);
  }, []);
  const mainPage = () => {
    return (
      <>
        <div
          className="container-fluid"
          style={{
            minHeight: "100vh",
            backgroundImage:
              "url('https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&h=1920&w=7680')", //×
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            color: "black",
            width: "100%",
          }}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-lg-12 col-sm-12 col-md-12 text-center  d-flex justify-content-center align-items-center "
                style={{
                  color: "beige",
                  marginTop: "5%",
                  textDecoration: "underline",
                  textDecorationColor: "#800000",
                }}
              >
                <p className="display-3">Youtube Courses IMDB</p>
              </div>
              <div
                className="col-lg-12 col-sm-12 col-md-12 shadow-lg d-flex align-items-center p-4"
                style={{
                  marginTop: "5%",
                  border: "1px solid gray",
                  minHeight: "30vh",
                  backgroundColor: "rgba(255, 255, 255, 0.5)",
                  color: "beige",
                }}
              >
                <ul>
                  <li style={{ listStyle: "none" }}>
                    <div className="d-flex justify-content-center text-center">
                      <p
                        className="display-4"
                        style={{
                          textDecoration: "underline",
                          textDecorationColor: "#800000",
                        }}
                      >
                        {" "}
                        About
                      </p>
                    </div>
                  </li>
                  <li style={{ marginBottom: "1.5em", marginTop: "1.5em" }}>
                    <p className="h4">
                      As we know Youtube{" "}
                      <span>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
                          height={"30px"}
                        />
                      </span>{" "}
                      has removed dislike buttons counter from their site , as a
                      result we often come across the courses which are not
                      really worth our time.So , This Web App Aims to solve that
                      issue by solving that problem by allowing users to provide
                      a proper rating to youtube courses.
                    </p>
                  </li>
                  <li>
                    <p className="h4">
                      There are many small youtubers who make excellent content
                      but lack of exposure makes it difficult for them to get
                      proper audience , down side for consumers is that we miss
                      out on their well made content.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12 col-sm-12 col-md-12  mt-2 d-flex justify-content-center align-items-center ">
              <button
                className="btn"
                style={{
                  border: "2px solid #800000",
                  color: "wheat",
                  width: "25%",
                }}
              >
                Browse
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {isPageLoading ? (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "100vh", width: "100vw" }}
        >
          <div
            className="spinner-grow"
            style={{ height: "20vh", width: "20vh" }}
          ></div>
        </div>
      ) : (
        mainPage()
      )}
    </>
  );
}

export default HomePage;

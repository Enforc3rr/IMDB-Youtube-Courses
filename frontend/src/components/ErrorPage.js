import { useNavigate } from "react-router-dom";
import "../App.css";

function ErrorPage() {
  let navigate = useNavigate();
  return (
    <div className="containerUser ">
      <div
        className="container d-flex justify-content-center align-items-center flex-column"
        style={{ minHeight: "100vh" }}
      >
        <h1
          style={{
            color: "beige",
            textDecoration: "underline",
            textDecorationColor: "#800",
          }}
        >
          Sorry , This Page Does Not Exists
        </h1>
        <h4
          style={{
            color: "beige",
            textDecoration: "underline",
            textDecorationColor: "#800",
          }}
        >
          Redirecting you to Homepage in 3seconds
        </h4>
        {setTimeout(() => {
          navigate("/");
        }, 3000)}
      </div>
    </div>
  );
}

export default ErrorPage;

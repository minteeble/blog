import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import * as React from "react";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="error-body">
        <div className="error-body-box">
          <h1 className="error-body-box-title kanit">Error 404</h1>
          <span className="error-body-box-line"></span>
        </div>
        <h2 className="error-body-text montserrat">This Page is unavailable</h2>
        <button
          className="error-body-btn spaced"
          onClick={() => {
            navigate("/");
          }}
        >
          <FontAwesomeIcon className="error-body-btn-svg" icon={faHouse} />
          Home
        </button>
      </div>
    </>
  );
};

export default ErrorPage;

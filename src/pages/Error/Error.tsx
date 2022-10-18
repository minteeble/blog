import { Sidebar } from "../../components";
import ErrorPage from "../../components/ErrorPage";
import * as React from "react";

const Error = () => {
  return (
    <>
      <div className="error" style={{ position: "relative" }}>
        <ErrorPage />
        <Sidebar />
      </div>
    </>
  );
};

export default Error;

import { Sidebar, TopicPage } from "../../components";
import * as React from "react";

const Topic = () => {
  return (
    <>
      <div className="topic" style={{ position: "relative" }}>
        <TopicPage />
        <Sidebar />
      </div>
    </>
  );
};

export default Topic;

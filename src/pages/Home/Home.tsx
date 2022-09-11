import React, { useEffect, useState } from "react";
import { ArticlePage } from "../../components";
import TopicPage from "../../components/TopicPage";

const Home = () => {
  return (
    <div className="home-page">
      {/* <ArticlePage /> */}
      <TopicPage />
    </div>
  );
};

export default Home;

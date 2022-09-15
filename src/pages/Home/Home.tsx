import React, { useEffect, useState } from "react";
import { ArticlePage, Sidebar } from "../../components";
import HomePage from "../../components/HomePage";
import TopicPage from "../../components/TopicPage";

const Home = () => {
  return (
    <div className="home-page">
      <HomePage />
    </div>
  );
};

export default Home;

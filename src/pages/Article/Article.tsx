import { ArticlePage, Sidebar } from "../../components";
import * as React from "react";

const Article = () => {
  return (
    <>
      <div className="article" style={{ position: "relative" }}>
        <ArticlePage />
      </div>
    </>
  );
};

export default Article;

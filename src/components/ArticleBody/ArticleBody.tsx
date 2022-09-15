import React from "react";
import { ArticleBodyProps } from "./ArticleBody.types";

const ArticleBody = (props: ArticleBodyProps) => {
  return (
    <>
      <div className="article-body">
        <h4 className="article-body-topic spaced">{props.topic}</h4>
        <h1
          className="article-body-title kanit"
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h1>
        <h5 className="article-body-date spaced">{props.date}</h5>
        <p
          className="article-body-content montserrat"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></p>
      </div>
    </>
  );
};

export default ArticleBody;

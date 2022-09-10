import React from "react";
import { ArticleProps } from "./Article.types";
import { PageCard } from "@minteeble/ui-components";

const Article = (props: ArticleProps) => {
  return (
    <>
      <PageCard
        style={{
          margin: "7rem 20rem 7rem 10rem",
          borderRadius: "2rem",
          padding: "5rem",
        }}
      >
        <h1 id="title" dangerouslySetInnerHTML={{ __html: props.title }}></h1>
        <main>
          <p dangerouslySetInnerHTML={{ __html: props.content }}></p>
        </main>
        <div id="author">
          <img src={props.author.avatar} alt="avatar" />
          <h4>
            {props.author.firstName} {props.author.lastName}
          </h4>
        </div>
      </PageCard>
    </>
  );
};

export default Article;

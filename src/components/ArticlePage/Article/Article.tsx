import React from "react";
import { ArticleProps } from "./Article.types";
import { PageCard } from "@minteeble/ui-components";

const Article = (props: ArticleProps) => {
  return (
    <>
      <PageCard />
      <h2>{props.title}</h2>
      <p>{props.content}</p>
      <h4>
        <img src={props.author.avatar} alt="avatar" />
        {props.author.firstName} {props.author.lastName}
      </h4>
    </>
  );
};

export default Article;

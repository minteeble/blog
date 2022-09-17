import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router";
import { ArticlePageProps } from "./ArticlePage.types";
import { ArticleBody } from "../ArticleBody";

const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

const ArticlePage = (props: ArticlePageProps) => {
  const [res, setRes] = useState<article>({
    data: {
      data: {
        post: {
          categories: {
            edges: [],
          },
          content: "",
          title: "",
          date: "",
        },
      },
    },
  });

  let { lang } = useParams();
  let { topic } = useParams();
  let { title } = useParams();
  //query
  const articleQuery = `{
    post(id: "/${lang}/${topic}/${title}/", idType: URI) {
      categories {
        edges {
          node {
            name
          }
        }
      }
      content(format: RENDERED)
      title(format: RENDERED)
      date
    }
  }`;

  //api call
  useEffect(() => {
    Axios({
      url: endpoint,
      method: "post",
      data: {
        query: articleQuery,
      },
    }).then((result) => {
      setRes(result);
    });
  }, []);

  interface article {
    data: {
      data: {
        post: {
          categories: {
            edges: {
              node: {
                name: string;
              };
            }[];
          };
          content: string;
          title: string;
          date: string;
        };
      };
    };
  }

  interface data {
    title: string;
    content: string;
    topic: string;
    date: string;
  }

  let articleData: data;

  let y = res.data.data.post;

  let topicCheck = y.categories.edges[0] ? y.categories.edges[0].node.name : "";

  articleData = {
    title: y.title,
    content: y.content,
    topic: topicCheck,
    date: y.date,
  };

  return (
    <>
      <ArticleBody
        title={articleData.title}
        content={articleData.content}
        date={articleData.date.slice(0, 10)}
        topic={articleData.topic}
      />
    </>
  );
};

export default ArticlePage;

import React, { useEffect, useState } from "react";
import { ArticlePageProps } from "./ArticlePage.types";
import Axios from "axios";
import { Article } from "./Article";

const ArticlePage = (props: ArticlePageProps) => {
  //response state
  const [res, setRes] = useState<article>({
    data: {
      data: {
        post: {
          content: "",
          title: "",
          author: {
            node: {
              firstName: "",
              lastName: "",
              avatar: {
                url: "",
              },
            },
          },
        },
      },
    },
  });

  let articleId = 10;
  //query
  const query = `{
    post(id: "${articleId}", idType: DATABASE_ID) {
      author {
        node {
          avatar {
            url
          }
          firstName
          lastName
        }
      }
      content(format: RENDERED)
      title(format: RENDERED)
    }
  }`;
  //api call
  useEffect(() => {
    Axios({
      url: "http://blog.local/graphql",
      method: "post",
      data: {
        query: query,
      },
    }).then((result) => {
      setRes(result);
    });
  }, []);

  interface article {
    data: {
      data: {
        post: {
          content: string;
          title: string;
          author: {
            node: {
              firstName: string;
              lastName: string;
              avatar: {
                url: string;
              };
            };
          };
        };
      };
    };
  }

  interface data {
    title: string;
    content: string;
    author: {
      avatar: string;
      firstName: string;
      lastName: string;
    };
  }

  let articleData: data;

  let short = res.data.data.post;

  articleData = {
    title: short.title,
    content: short.content,
    author: {
      firstName: short.author.node.firstName,
      lastName: short.author.node.lastName,
      avatar: short.author.node.avatar.url,
    },
  };

  return (
    <>
      <Article
        title={articleData.title}
        content={articleData.content}
        author={articleData.author}
      />
    </>
  );
};

export default ArticlePage;

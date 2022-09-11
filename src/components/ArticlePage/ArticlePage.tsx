import React, { useEffect, useState } from "react";
import Axios from "axios";
import { ArticlePageProps } from "./ArticlePage.types";
import { Article } from "./../Article";
import Sidebar from "../Sidebar";

const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

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

  const [side, setSide] = useState<side>({
    data: {
      data: {
        posts: {
          nodes: [],
        },
      },
    },
  });

  let lang = "en";
  let topic = "second";
  let title = "lorem22";
  let SidebarArticles = 4;
  //query
  const query = `{
    post(id: "/${lang}/${topic}/${title}/" , idType: URI) {
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

  const sideQuery = `{
    posts {
      nodes {
        featuredImage {
          node {
            guid
          }
        }
        title
      }
    }
  }`;

  //api call
  useEffect(() => {
    Axios({
      url: endpoint,
      method: "post",
      data: {
        query: query,
      },
    }).then((result) => {
      setRes(result);
    });
  }, []);

  useEffect(() => {
    Axios({
      url: endpoint,
      method: "post",
      data: {
        query: sideQuery,
      },
    }).then((result) => {
      setSide(result);
      console.log("hello");
      console.log(result);
    });
  }, []);

  console.log(side);

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

  interface side {
    data: {
      data: {
        posts: {
          nodes: {
            featuredImage: {
              node: {
                guid: string;
              };
            };
            title: string;
          }[];
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

  interface SideData {
    imageLink: string;
    title: string;
  }

  let articleData: data;
  let SidebarData: SideData[] = [];

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

  let nodesLength =
    side.data.data.posts.nodes.length > SidebarArticles
      ? SidebarArticles
      : side.data.data.posts.nodes.length;

  for (let i = 0; i < nodesLength; i++) {
    console.log("Index", i);
    let x: SideData = {
      imageLink: side.data.data.posts.nodes[i].featuredImage.node.guid,
      title: side.data.data.posts.nodes[i].title,
    };

    SidebarData.push(x);
  }

  return (
    <>
      <Article
        title={articleData.title}
        content={articleData.content}
        author={articleData.author}
      />
      <Sidebar data={SidebarData} />
    </>
  );
};

export default ArticlePage;

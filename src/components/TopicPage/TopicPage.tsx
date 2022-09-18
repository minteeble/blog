import React, { useEffect, useState } from "react";
import Axios from "axios";
import { PageCard } from "@minteeble/ui-components";
import TopicArticle from "./TopicArticle";

const TopicPage = () => {
  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";
  let topic = "first";

  const [res, setRes] = useState<articleData>({
    data: {
      data: {
        posts: {
          edges: [],
        },
      },
    },
  });

  const query = `{
    posts(where: {categoryName: "${topic}"}) {
      edges {
        node {
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
          featuredImage {
            node {
              guid
            }
          }
        }
      }
    }
  }`;

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

  interface articleData {
    data: {
      data: {
        posts: {
          edges: {
            node: {
              author: {
                node: {
                  avatar: {
                    url: string;
                  };
                  firstName: string;
                  lastName: string;
                };
              };
              content: string;
              title: string;
              featuredImage: {
                node: {
                  guid: string;
                };
              };
            };
          }[];
        };
      };
    };
  }

  interface topicArticle {
    author: {
      avatar: string;
      firstName: string;
      lastName: string;
    };
    content: string;
    title: string;
    imageLink: string;
  }

  let nodesLength = res.data.data.posts.edges.length;

  let TopicArticleData: topicArticle[] = [];
  let edge = res.data.data.posts.edges;

  for (let i = 0; i < nodesLength; i++) {
    let x: topicArticle = {
      author: {
        avatar: edge[i].node.author.node.avatar.url,
        firstName: edge[i].node.author.node.firstName,
        lastName: edge[i].node.author.node.lastName,
      },
      content: edge[i].node.content || "-",
      title: edge[i].node.title || "-",
      imageLink:
        edge[i].node.featuredImage.node.guid ||
        "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
    };

    TopicArticleData.push(x);
  }

  return (
    <>
      <PageCard
        style={{
          display: "flex",
          flexDirection: "column",
          alingItems: "center",
          justifyContent: "flex-start",
          margin: "7rem 20rem 7rem 10rem",
          borderRadius: "2rem",
          padding: "5rem",
        }}
      >
        <h1 id="title">Articles of category {topic}</h1>
        {TopicArticleData.map((x: topicArticle, index: number) => {
          return (
            <TopicArticle
              key={index}
              author={x.author}
              content={x.content}
              title={x.title}
              imageLink={x.imageLink}
            />
          );
        })}
      </PageCard>
    </>
  );
};

export default TopicPage;

import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Preview, PreviewProps } from "../Preview";
import { LoadingSpinner, LoadingSpinnerSize } from "@minteeble/ui-components";
import Sidebar from "../Sidebar";
import * as React from "react";

const TopicPage = () => {
  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";
  const navigate = useNavigate();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [res, setRes] = useState<articleData>({
    data: {
      data: {
        posts: {
          edges: [],
        },
      },
    },
  });

  const { lang } = useParams();
  const { topic } = useParams();

  const query = `{
    posts(where: {language: ${lang!.toUpperCase()},categoryName: "${topic}"}) {
      edges {
        node {
          featuredImage {
            node {
              guid
            }
          }
          categories {
            edges {
              node {
                name
              }
            }
          }
          title(format: RENDERED)
          excerpt(format: RENDERED)
          uri
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
      if (result.data.data.posts.edges.length <= 0) {
        navigate(`/${lang || "en"}/not-found`);
      }
      setRes(result);
      setIsLoaded(true);
    });
  }, [topic, lang]);

  let edge = res.data.data.posts.edges;

  interface articleData {
    data: {
      data: {
        posts: {
          edges: {
            node: {
              featuredImage: {
                node: {
                  guid: string;
                };
              };
              categories: {
                edges: {
                  node: {
                    name: string;
                  };
                }[];
              };
              title: string;
              excerpt: string;
              uri: string;
            };
          }[];
        };
      };
    };
  }

  let nodesLength = edge.length > 0 ? edge.length : 0;

  let previewData: PreviewProps[] = [];

  for (let i = 0; i < nodesLength; i++) {
    let x: PreviewProps = {
      excerpt: edge[i].node.excerpt || "-",
      title: edge[i].node.title || "-",
      imageLink:
        (edge[i].node.featuredImage && edge[i].node.featuredImage.node.guid) ||
        "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
      topic: edge[i].node.categories.edges[0].node.name,
      uri: edge[i].node.uri,
    };
    previewData.push(x);
  }

  return (
    <>
      <div className="topic-body">
        {isLoaded ? (
          <>
            <h1 className="topic-body-title kanit">Articles of category {topic}</h1>
            {previewData.map((x: PreviewProps, index: number) => {
              return (
                <Preview
                  key={index}
                  imageLink={x.imageLink}
                  topic={x.topic}
                  title={x.title}
                  excerpt={x.excerpt}
                  uri={x.uri}
                />
              );
            })}
          </>
        ) : (
          <LoadingSpinner Size={LoadingSpinnerSize.Large} />
        )}
      </div>
    </>
  );
};

export default TopicPage;

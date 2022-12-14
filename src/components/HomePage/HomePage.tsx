import { useState, useEffect } from "react";
import Axios from "axios";
import Sidebar from "../Sidebar";
import { CardProps } from "../Card/Card.types";
import Card from "../Card";
import { PreviewProps } from "../Preview/Preview.types";
import Preview from "../Preview";
import { useParams } from "react-router";
import { LoadingSpinner, LoadingSpinnerSize } from "@minteeble/ui-components";
import * as React from "react";

const HomePage = () => {
  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

  const cardNum = 3;
  const { lang } = useParams();

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [home, setHome] = useState<home>({
    data: {
      data: {
        posts: {
          edges: [],
        },
      },
    },
  });

  const homeQuery = `{
        posts(where: {language: ${lang!.toUpperCase()}}) {
          edges {
            node {
              excerpt(format: RENDERED)
              uri
              featuredImage {
                node {
                  guid
                }
              }
              title(format: RENDERED)
              categories {
                nodes {
                  name
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
        query: homeQuery,
      },
    }).then((result) => {
      setHome(result);
      setIsLoaded(true);
    });
  }, []);

  interface home {
    data: {
      data: {
        posts: {
          edges: {
            node: {
              excerpt: string;
              uri: string;
              featuredImage: {
                node: {
                  guid: string;
                };
              };
              title: string;
              categories: {
                nodes: {
                  name: string;
                }[];
              };
            };
          }[];
        };
      };
    };
  }

  let Cards: CardProps[] = [];
  let Previews: PreviewProps[] = [];

  const y = home.data.data.posts.edges;

  let node = cardNum < y.length ? cardNum : y.length;

  for (let i = 0; i < node; i++) {
    let x: CardProps = {
      imageLink:
        (y[i].node.featuredImage && y[i].node.featuredImage.node.guid) ||
        "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
      topic: y[i].node.categories.nodes[0].name,
      title: y[i].node.title || "-",
      uri: y[i].node.uri || "/",
    };

    Cards.push(x);
  }

  for (let i = cardNum; i < y.length; i++) {
    let x: PreviewProps = {
      imageLink:
        (y[i].node.featuredImage && y[i].node.featuredImage.node.guid) ||
        "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
      topic: y[i].node.categories.nodes[0].name,
      title: y[i].node.title || "-",
      uri: y[i].node.uri || "/",
      excerpt: y[i].node.excerpt || "-",
    };

    Previews.push(x);
  }

  return (
    <>
      <div className="cards">
        {Cards.length > 0 ? (
          Cards.map((x: CardProps, index: number) => {
            return (
              <Card
                key={index}
                imageLink={Cards[index].imageLink ?? ""}
                topic={Cards[index].topic}
                title={Cards[index].title}
                uri={Cards[index].uri}
              />
            );
          })
        ) : (
          <LoadingSpinner Size={LoadingSpinnerSize.Large} />
        )}
      </div>
      <div className="home-body">
        <Sidebar />
        {isLoaded ? (
          Previews.map((x: PreviewProps, index: number) => {
            return (
              <Preview
                key={index}
                imageLink={Previews[index].imageLink}
                topic={Previews[index].topic}
                title={Previews[index].title}
                uri={Previews[index].uri}
                excerpt={Previews[index].excerpt}
              />
            );
          })
        ) : (
          <LoadingSpinner Size={LoadingSpinnerSize.Large} />
        )}
      </div>
    </>
  );
};

export default HomePage;

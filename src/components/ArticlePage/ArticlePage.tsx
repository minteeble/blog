import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router";
import { ArticlePageProps } from "./ArticlePage.types";
import { ArticleBody } from "../ArticleBody";
import { CardProps } from "../Card/Card.types";

const ArticlePage = (props: ArticlePageProps) => {
  const navigate = useNavigate();
  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";
  const relatedNum = 6;

  const [res, setRes] = useState<article>({
    data: {
      data: {
        post: {
          categories: {
            edges: [],
          },
          featuredImage: {
            node: {
              guid: "",
            },
          },
          content: "",
          title: "",
          uri: "",
          databaseId: 0,
          date: "",
        },
      },
    },
  });

  const [rel, setRel] = useState<related>({
    data: {
      data: {
        posts: {
          edges: [],
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
      featuredImage {
        node {
          guid
        }
      }
      content(format: RENDERED)
      title(format: RENDERED)
      uri
      databaseId
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
    })
      .then((result) => {
        setRes(result);
      })
      .then();
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
          featuredImage: {
            node: {
              guid: string;
            };
          };
          content: string;
          title: string;
          uri: string;
          databaseId: number;
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
    id: number;
    guid: string;
  }

  let articleData: data;

  let y = res.data.data.post;

  let topicCheck = y.categories.edges[0]?.node.name ?? "Uncategorized";

  articleData = {
    title: y.title || "-",
    content: y.content || "-",
    topic: topicCheck,
    date: y.date || "-",
    guid:
      (y.featuredImage && y.featuredImage.node.guid) ||
      "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
    id: y.databaseId ?? "1",
  };

  const relatedQuery = `{
    posts(where: {categoryName: "${topicCheck}"}) {
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
          uri
          title(format: RENDERED)
        }
      }
    }
  }`;

  let related: CardProps[] = [];
  let z = rel.data.data.posts.edges;
  let relatedNode = relatedNum < z.length ? relatedNum : z.length;

  useEffect(() => {
    Axios({
      url: endpoint,
      method: "post",
      data: {
        query: relatedQuery,
      },
    }).then((result) => {
      setRel(result);
    });
  }, [topicCheck]);

  useEffect(() => {
    related = [];

    for (let i = 0; i < relatedNode; i++) {
      if (z[i].node.uri !== y.uri) {
        let x: CardProps = {
          imageLink:
            (z[i].node.featuredImage && z[i].node.featuredImage.node.guid) ||
            "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
          topic: z[i].node.categories.edges[0].node.name,
          title: z[i].node.title || "-",
          uri: z[i].node.uri || "-",
        };
        related.push(x);
      }
    }
  }, [rel]);

  interface related {
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
              uri: string;
              title: string;
            };
          }[];
        };
      };
    };
  }

  return (
    <>
      <ArticleBody
        id={articleData.id}
        title={articleData.title}
        content={articleData.content}
        date={articleData.date.slice(0, 10)}
        topic={articleData.topic}
        guid={articleData.guid}
        related={related}
      />
    </>
  );
};

export default ArticlePage;

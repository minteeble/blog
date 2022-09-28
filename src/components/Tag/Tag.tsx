import Axios from "axios";
import { useEffect, useState } from "react";
import { TagProps } from "./Tag.types";

const Tag = (props: TagProps) => {
  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

  const [res, setRes] = useState<tag>({
    data: {
      data: {
        post: {
          tags: {
            edges: [],
          },
        },
      },
    },
  });

  const query = `{
        post(id: "${props.id}", idType: DATABASE_ID) {
          tags {
            edges {
              node {
                name
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
  }, [props.id]);

  interface tag {
    data: {
      data: {
        post: {
          tags: {
            edges: {
              node: {
                name: string;
              };
            }[];
          };
        };
      };
    };
  }

  let tags: string[] = [];

  let node = res.data.data.post ? res.data.data.post.tags.edges.length : 0;

  for (let i = 0; i < node; i++) {
    tags.push(res.data.data.post.tags.edges[i].node.name);
  }

  return (
    <>
      <div className="tags">
        <div className="tags-header">
          <h2 className="tags-header-title kanit">Tags</h2>
          <span className="tags-header-line"></span>
        </div>
        <div className="tags-wrapper montserrat">
          {tags.length > 0
            ? tags.map((x: string, index: number) => {
                return (
                  <span key={index} className="tags-wrapper-item spaced">
                    {x}
                  </span>
                );
              })
            : "This article has no tags"}
        </div>
      </div>
    </>
  );
};

export default Tag;

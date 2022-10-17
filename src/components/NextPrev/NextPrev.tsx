import { Link } from "react-router-dom";
import { NextPrevProps } from "./NextPrev.types";
import { useEffect, useState } from "react";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";

const NextPrev = (props: NextPrevProps) => {
  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

  const [res, setRes] = useState<id>({
    data: {
      data: {
        posts: {
          nodes: [],
        },
      },
    },
  });

  const { lang } = useParams();

  const query = `{
        posts (where: {language: ${lang!.toUpperCase()}}) {
          nodes {
            databaseId
            uri
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
    })
      .then((result) => {
        setRes(result);
      })
      .then();
  }, []);

  interface id {
    data: {
      data: {
        posts: {
          nodes: {
            databaseId: number;
            uri: string;
          }[];
        };
      };
    };
  }

  let y = res.data.data.posts.nodes;

  let node = y.length > 0 ? y.length : 0;

  let ids: number[] = [];
  let uris: string[] = [];

  for (let i = 0; i < node; i++) {
    let x = y[i].databaseId;

    ids.unshift(x);
  }

  for (let i = 0; i < node; i++) {
    let x = y[i].uri;

    uris.unshift(x);
  }

  let index = ids.indexOf(props.id);

  let next = index + 1 >= ids.length ? -1 : index + 1;

  let prev = index - 1 < 0 ? -1 : index - 1;

  return (
    <>
      <div className="nextprev">
        <Link
          className={prev !== -1 ? "nextprev-link" : "nextprev-link disabled"}
          to={uris[prev]}
        >
          <div className="nextprev-link-body">
            <h4 className="nextprev-link-body-text spaced">
              <FontAwesomeIcon
                className="nextprev-link-body-text-arrow"
                icon={faArrowLeft}
              />
              previous
            </h4>
            <span className="nextprev-link-body-line"></span>
          </div>
        </Link>
        <Link
          className={next !== -1 ? "nextprev-link" : "nextprev-link disabled"}
          to={uris[next]}
        >
          <div className="nextprev-link-body dx">
            <h4 className="nextprev-link-body-text spaced">
              next
              <FontAwesomeIcon
                className="nextprev-link-body-text-arrow"
                icon={faArrowRight}
              />
            </h4>
            <span className="nextprev-link-body-line"></span>
          </div>
        </Link>
      </div>
    </>
  );
};

export default NextPrev;

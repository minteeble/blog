import { BlogNavProps } from "./BlogNav.types";
import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Navbar,
  MinteebleLogo,
  MinteebleLogoSize,
  MinteebleLogoType,
  NavbarItemPosition,
  MinteebleLogoTheme,
} from "@minteeble/ui-components";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const BlogNav = (props: BlogNavProps) => {
  const openDropdown = () => {
    const topic = document.querySelector(".nav-topic");
    topic?.classList.toggle("opened");
  };

  const closeDropdown = () => {
    const topic = document.querySelector(".nav-topic");
    if (topic?.classList.contains("opened")) {
      topic?.classList.remove("opened");
    }
  };

  const { lang } = useParams();

  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

  const [res, setRes] = useState<nav>({
    data: {
      data: {
        categories: {
          edges: [],
        },
      },
    },
  });

  const navQuery = `{
        categories {
          edges {
            node {
              name
              slug
            }
          }
        }
      }`;

  useEffect(() => {
    Axios({
      url: endpoint,
      method: "post",
      data: {
        query: navQuery,
      },
    }).then((result) => {
      setRes(result);
    });
  }, []);

  console.log(res.data.data.categories);

  interface nav {
    data: {
      data: {
        categories: {
          edges: {
            node: {
              name: string;
              slug: string;
            };
          }[];
        };
      };
    };
  }
  interface navData {
    name: string;
    slug: string;
  }

  let navData: navData[] = [];

  let node =
    res.data.data.categories.edges.length > 0
      ? res.data.data.categories.edges.length
      : 0;

  for (let i = 0; i < node; i++) {
    let x: navData = {
      name: res.data.data.categories.edges[i].node.name,
      slug: res.data.data.categories.edges[i].node.slug,
    };

    navData.push(x);
  }

  const style = { "--link-num": navData.length } as React.CSSProperties;
  const body = document.querySelector("body") as HTMLElement;

  const theme = body.classList.contains("minteeble-dark-theme")
    ? MinteebleLogoTheme.Dark
    : MinteebleLogoTheme.Light;

  return (
    <>
      <Navbar
        items={[
          {
            content: (
              <MinteebleLogo
                type={MinteebleLogoType.Minimal}
                size={MinteebleLogoSize.Medium}
                theme={theme}
              />
            ),
            position: NavbarItemPosition.Left,
          },
          {
            content: (
              <>
                <Link to={`/${lang}`}>
                  <h3 className="kanit">home</h3>
                </Link>
              </>
            ),
            position: NavbarItemPosition.Left,
          },
          {
            content: (
              <div className="nav-topic kanit" style={style}>
                <h3
                  className="nav-topic-title"
                  onClick={() => {
                    openDropdown();
                  }}
                >
                  Categories
                  <FontAwesomeIcon
                    className="nav-topic-arrow"
                    icon={faCaretDown}
                  />
                </h3>
                <div className="nav-topic-dropdown shadow-1">
                  <ul className="nav-topic-dropdown-list">
                    {navData.map((x: navData, index: number) => {
                      return (
                        <li
                          key={index}
                          className="nav-topic-dropdown-list-item"
                        >
                          <Link
                            onClick={() => {
                              closeDropdown();
                            }}
                            className="nav-topic-dropdown-list-item-link"
                            to={`/en/${x.slug}`}
                          >
                            {x.name}
                          </Link>
                          <span className="nav-topic-dropdown-list-item-line"></span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ),
            position: NavbarItemPosition.Left,
          },
        ]}
      />
    </>
  );
};

export default BlogNav;

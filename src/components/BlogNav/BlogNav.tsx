import { BlogNavProps } from "./BlogNav.types";
import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Navbar,
  LoadingSpinner,
  MinteebleLogo,
  MinteebleLogoSize,
  MinteebleLogoType,
  NavbarItemPosition,
  MinteebleLogoTheme,
  LoadingSpinnerSize,
} from "@minteeble/ui-components";
import { Link, useLocation, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faSun, faMoon, faHamburger, faBars } from "@fortawesome/free-solid-svg-icons";
import { matchPath } from "react-router";
import * as React from "react";
import { faFacebook, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons";

const BlogNav = (props: BlogNavProps) => {
  const [dark, setDark] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("en");

  const openDropdown = () => {
    const topic = document.querySelector(".nav-topic");
    topic?.classList.toggle("opened");
  };

  const closeDropdown = () => {
    const topic = document.querySelector(".nav-topic");
    if (topic!.classList.contains("opened")) {
      topic!.classList.remove("opened");
    }
  };

  const handleTheme = () => {
    const trigger = document.querySelector(".nav-theme-trigger");
    trigger!.classList.toggle("active");

    const body = document.querySelector("body");

    if (body!.classList.contains("minteeble-default-theme")) {
      body!.classList.remove("minteeble-default-theme");
      body!.classList.add("minteeble-dark-theme");
    } else {
      if (body!.classList.contains("minteeble-dark-theme")) {
        body!.classList.remove("minteeble-dark-theme");
        body!.classList.add("minteeble-default-theme");
      }
    }

    setDark(!dark);
  };

  let location = useLocation();

  useEffect(() => {
    let params = matchPath({ path: "/:lang/*" }, location.pathname);
    if (params) setLang(params!.params.lang || "en");
  }, [location]);

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

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
      setIsLoaded(true);
    });
  }, []);

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

  let node = res.data.data.categories.edges.length > 0 ? res.data.data.categories.edges.length : 0;

  for (let i = 0; i < node; i++) {
    let x: navData = {
      name: res.data.data.categories.edges[i].node.name,
      slug: res.data.data.categories.edges[i].node.slug,
    };

    navData.push(x);
  }

  const style = { "--link-num": navData.length } as React.CSSProperties;

  const theme = !dark ? MinteebleLogoTheme.Dark : MinteebleLogoTheme.Light;

  return (
    <>
      <Navbar
        items={[
          {
            content: <MinteebleLogo type={MinteebleLogoType.Blog} size={MinteebleLogoSize.Medium} theme={theme} />,
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
              <div
                className="nav-topic kanit"
                style={style}
                onClick={() => {
                  openDropdown();
                }}
              >
                <h3 className="nav-topic-title">
                  Categories
                  <FontAwesomeIcon className="nav-topic-arrow" icon={faCaretDown} />
                </h3>
                <div className="nav-topic-dropdown shadow-1">
                  <ul className="nav-topic-dropdown-list">
                    {isLoaded ? (
                      navData.map((x: navData, index: number) => {
                        return (
                          <li key={index} className="nav-topic-dropdown-list-item">
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
                      })
                    ) : (
                      <li className="nav-topic-dropdown-list-spinner">
                        <LoadingSpinner Size={LoadingSpinnerSize.Medium} />
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ),
            position: NavbarItemPosition.Left,
          },
          {
            content: (
              <a className="nav-lang" href={`/${lang === "en" ? "it" : "en"}`}>
                <button className="nav-lang-btn spaced">{lang === "en" ? "it" : "en"}</button>
              </a>
            ),
            position: NavbarItemPosition.Right,
          },
          {
            content: (
              <>
                <div
                  className="nav-theme-path"
                  onClick={() => {
                    handleTheme();
                  }}
                >
                  <div className="nav-theme-trigger">
                    <FontAwesomeIcon icon={!dark ? faMoon : faSun} />
                  </div>
                </div>
              </>
            ),
            position: NavbarItemPosition.Right,
          },
          {
            content: (
              <>
                <ul className="nav-social">
                  <li className="nav-social-item">
                    <a href="https://www.instagram.com/minteeble/" target="_blank" className="nav-social-item-link">
                      <FontAwesomeIcon icon={faInstagram} className="nav-social-item-link-icon" />
                    </a>
                  </li>
                  <li className="nav-social-item">
                    <a
                      href="https://www.facebook.com/profile.php?id=100086292045732"
                      target="_blank"
                      className="nav-social-item-link"
                    >
                      <FontAwesomeIcon icon={faFacebook} className="nav-social-item-link-icon" />
                    </a>
                  </li>
                  <li className="nav-social-item">
                    <a
                      href="https://www.tiktok.com/@minteeble?_t=8WddhTLtjba&_r=1"
                      target="_blank"
                      className="nav-social-item-link"
                    >
                      <FontAwesomeIcon icon={faTiktok} className="nav-social-item-link-icon" />
                    </a>
                  </li>
                </ul>
              </>
            ),
            position: NavbarItemPosition.Right,
          },
        ]}
      />
    </>
  );
};

export default BlogNav;

import { BlogNavProps } from "./BlogNav.types";
import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Navbar,
  MinteebleLogo,
  MinteebleLogoSize,
  MinteebleLogoType,
  NavbarItemPosition,
} from "@minteeble/ui-components";
import { Link } from "react-router-dom";

const BlogNav = (props: BlogNavProps) => {
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

  console.log(node, res.data.data.categories.edges, navData);

  return (
    <>
      <Navbar
        items={[
          {
            content: (
              <MinteebleLogo
                type={MinteebleLogoType.Minimal}
                size={MinteebleLogoSize.Medium}
              />
            ),
            position: NavbarItemPosition.Left,
          },
          {
            content: (
              <>
                <Link to={"/"}>
                  <h3 className="kanit">home</h3>
                </Link>
              </>
            ),
            position: NavbarItemPosition.Left,
          },
          {
            content: navData.map((x: navData, index: number) => {
              return (
                <p key={index}>{navData[index].name + navData[index].slug}</p>
              );
            }),
            position: NavbarItemPosition.Left,
          },
        ]}
      />
    </>
  );
};

export default BlogNav;

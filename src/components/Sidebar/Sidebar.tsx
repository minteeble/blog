import { useState, useEffect } from "react";
import Axios from "axios";
import SidebarSection from "./SidebarSection";
import { useParams } from "react-router";
import { SidebarProps } from "./Sidebar.types";
import Tag from "../Tag";
import * as React from "react";

const Sidebar = (props: SidebarProps) => {
  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

  const { lang } = useParams();

  const sections = ["Section 1", "Section 2"];
  const sectionPosts = 3;

  const [side, setSide] = useState<side>({
    data: {
      data: {
        posts: {
          edges: [],
        },
      },
    },
  });

  const sideQuery = `{
    posts(where: {language: ${lang!.toUpperCase()}}) {
    edges {
      node {
        featuredImage {
          node {
            guid
          }
        }
        excerpt(format: RENDERED)
        title(format: RENDERED)
        uri
      }
    }
  }
}
`;

  useEffect(() => {
    Axios({
      url: endpoint,
      method: "post",
      data: {
        query: sideQuery,
      },
    }).then((result) => {
      setSide(result);
    });
  }, []);

  interface side {
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
              excerpt: string;
              title: string;
              uri: string;
            };
          }[];
        };
      };
    };
  }

  interface sectionData {
    imageLink: string;
    title: string;
    excerpt: string;
    uri: string;
  }

  let SidebarData: sectionData[] = [
    {
      imageLink: "",
      title: "",
      excerpt: "",
      uri: "",
    },
  ];

  let edgesLength = side.data.data.posts.edges.length > sectionPosts ? sectionPosts : side.data.data.posts.edges.length;

  let y = side.data.data.posts.edges;

  for (let i = 0; i < edgesLength; i++) {
    let x: sectionData = {
      imageLink:
        (y[i].node.featuredImage && y[i].node.featuredImage.node.guid) ||
        "https://cms-blog-backend.minteeble.com/wp-content/uploads/2022/09/Desktop-1.jpg",
      title: y[i].node.title || "",
      excerpt: y[i].node.excerpt || "",
      uri: y[i].node.uri || "/",
    };

    SidebarData.push(x);
  }

  if (SidebarData.length <= 0) {
    SidebarData = [];
  }

  SidebarData.shift();

  return (
    <>
      <aside id="sidebar">
        {sections.map((x: any, index: number) => {
          return <SidebarSection key={index} name={sections[index]} data={SidebarData} />;
        })}
        {props.article && props.article === true ? <Tag id={props.id!} /> : ""}
      </aside>
    </>
  );
};

export default Sidebar;

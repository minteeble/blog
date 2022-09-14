import { useState, useEffect } from "react";
import Axios from "axios";
import SidebarSection from "./SidebarSection";

const Sidebar = () => {
  const endpoint = "https://cms-blog-backend.minteeble.com/mintql";

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
  posts {
    edges {
      node {
        featuredImage {
          node {
            guid
          }
        }
        content(format: RENDERED)
        title(format: RENDERED)
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
              content: string;
              title: string;
            };
          }[];
        };
      };
    };
  }

  interface sectionData {
    imageLink: string;
    title: string;
    content: string;
  }

  let SidebarData: sectionData[] = [
    {
      imageLink: "",
      title: "",
      content: "",
    },
  ];

  let edgesLength =
    side.data.data.posts.edges.length > sectionPosts
      ? sectionPosts
      : side.data.data.posts.edges.length;

  let y = side.data.data.posts.edges;

  for (let i = 0; i < edgesLength; i++) {
    let x: sectionData = {
      imageLink: y[i].node.featuredImage.node.guid,
      title: y[i].node.title,
      content: y[i].node.content,
    };

    SidebarData.push(x);
  }

  SidebarData.shift();

  return (
    <>
      <div id="sidebar">
        {sections.map((x: any, index: number) => {
          return (
            <SidebarSection
              key={index}
              name={sections[index]}
              data={SidebarData}
            />
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;

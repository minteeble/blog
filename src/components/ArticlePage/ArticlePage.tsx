import React, { useEffect, useState } from "react";
import { ArticlePageProps } from "./ArticlePage.types";
import Axios from "axios";

const ArticlePage = (props: ArticlePageProps) => {
  const [res, setRes] = useState({
    data: [{}],
  });

  useEffect(() => {
    Axios.get("http://blog.local/wp-json/wp/v2/posts").then((x) => {
      setRes(x);
    });
  }, []);

  console.log(res.data);

  return <>hello</>;
};

export default ArticlePage;

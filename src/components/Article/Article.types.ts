import { ArticlePageProps } from "../ArticlePage/ArticlePage.types";

export interface ArticleProps extends ArticlePageProps {
  title: string;
  author: {
    firstName: string;
    lastName: string;
    avatar: string;
  };
  content: string;
}

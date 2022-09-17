import { CardProps } from "../Card/Card.types";

export interface ArticleBodyProps {
  id: number;
  topic: string;
  date: string;
  title: string;
  content: string;
  related: CardProps[];
}

import { Link } from "react-router-dom";
import Cta from "../Cta";
import { CardProps } from "./Card.types";

const Card = (props: CardProps) => {
  const style = { "--img": `url(${props.imageLink})` } as React.CSSProperties;

  return (
    <>
      <Link to={props.uri} className="card" style={style}>
        <h3 className="card-topic spaced">{props.topic}</h3>
        <h2
          className="card-title kanit"
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h2>
        <Cta color={"white"} uri={props.uri}></Cta>
      </Link>
    </>
  );
};

export default Card;

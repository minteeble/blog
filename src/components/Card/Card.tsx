import Cta from "../Cta";
import { CardProps } from "./Card.types";

const Card = (props: CardProps) => {
  const style = { "--img": `url(${props.imageLink})` } as React.CSSProperties;

  return (
    <>
      <div className="card" style={style}>
        <h3 className="card-topic spaced">{props.topic}</h3>
        <h2
          className="card-title kanit"
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h2>
        <Cta color={"white"} uri={props.uri}></Cta>
      </div>
    </>
  );
};

export default Card;

import Cta from "../Cta";
import { CardProps } from "./Card.types";

const Card = (props: CardProps) => {
  return (
    <>
      <div
        className="card"
        style={{
          background: ` linear-gradient(180deg, rgba(1, 1, 1, 0.06) 0%, rgba(0, 0, 0, 0.6) 100%),url(${props.imageLink})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
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

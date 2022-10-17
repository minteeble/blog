import { Link } from "react-router-dom";
import Cta from "../Cta";
import { RelatedProps } from "./Related.types";
import * as React from "react";

const Related = (props: RelatedProps) => {
  const style = { "--img": `url(${props.imageLink})` } as React.CSSProperties;

  return (
    <>
      <div className="related" style={style}>
        <h3 className="related-topic spaced">{props.topic}</h3>
        <h2 className="related-title kanit" dangerouslySetInnerHTML={{ __html: props.title }}></h2>
        <Cta inverted={true} uri={props.uri}></Cta>
      </div>
    </>
  );
};

export default Related;

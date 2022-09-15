import Cta from "../Cta";
import { PreviewProps } from "./Preview.types";

const Preview = (props: PreviewProps) => {
  return (
    <>
      <div className="preview">
        <img className="preview-img" src={props.imageLink} alt={props.title} />
        <div className="preview-info">
          <h3 className="preview-info-topic spaced">{props.topic}</h3>
          <h2
            className="preview-info-title kanit"
            dangerouslySetInnerHTML={{ __html: props.title }}
          ></h2>
          <p
            className="preview-info-content montserrat"
            dangerouslySetInnerHTML={{ __html: props.excerpt }}
          ></p>
          <Cta color={"black"} uri={props.uri} />
        </div>
      </div>
    </>
  );
};

export default Preview;

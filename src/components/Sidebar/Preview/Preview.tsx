import { PreviewProps } from "./Preview.types";

const Preview = (props: PreviewProps) => {
  return (
    <>
      <div className="preview">
        <img src={props.imageLink} alt={props.title} />
        <h5>{props.title}</h5>
        preview
      </div>
    </>
  );
};

export default Preview;

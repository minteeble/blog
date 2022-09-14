import { PreviewProps } from "./SidebarPreview.types";

const Preview = (props: PreviewProps) => {
  return (
    <>
      <div className="preview">
        <a href="#">
          <div className="preview-image">
            <img src={props.imageLink} alt={props.title} />
          </div>
          <h4>{props.title}</h4>
        </a>
      </div>
    </>
  );
};

export default Preview;

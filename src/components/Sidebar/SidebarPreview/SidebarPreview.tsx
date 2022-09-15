import { Link } from "react-router-dom";
import { SidebarPreviewProps } from "./SidebarPreview.types";

const SidebarPreview = (props: SidebarPreviewProps) => {
  return (
    <>
      <Link className="sidebar-preview" to={props.uri}>
        <div className="sidebar-preview-image">
          <img
            className="sidebar-preview-image-guid"
            src={props.imageLink}
            alt={props.title}
          />
        </div>
        <div className="sidebar-preview-info">
          <h4 className="sidebar-preview-info-title kanit">{props.title}</h4>
          <p
            className="sidebar-preview-info-content montserrat"
            dangerouslySetInnerHTML={{ __html: props.excerpt }}
          ></p>
        </div>
      </Link>
    </>
  );
};

export default SidebarPreview;

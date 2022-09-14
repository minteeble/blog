import { SidebarPreviewProps } from "./SidebarPreview.types";

const SidebarPreview = (props: SidebarPreviewProps) => {
  return (
    <>
      <a className="sidebar-preview" href="#">
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
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></p>
        </div>
      </a>
    </>
  );
};

export default SidebarPreview;

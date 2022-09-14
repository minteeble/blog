import { SidebarSectionProps } from "./SidebarSection.types";

const SidebarSection = (props: SidebarSectionProps) => {
  return (
    <>
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <h2
            className="sidebar-section-header-name kanit"
            dangerouslySetInnerHTML={{ __html: props.name }}
          ></h2>
          <span className="sidebar-section-header-line"></span>
          <div className="sidebar-section-body"></div>
        </div>
      </div>
    </>
  );
};

export default SidebarSection;

import { SidebarSectionProps } from "./SidebarSection.types";
import SidebarPreview from "../SidebarPreview/SidebarPreview";

const SidebarSection = (props: SidebarSectionProps) => {
  let data = props.data;
  console.log(data);

  return (
    <>
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <h2
            className="sidebar-section-header-name kanit"
            dangerouslySetInnerHTML={{ __html: props.name }}
          ></h2>
          <span className="sidebar-section-header-line"></span>
        </div>
        <div className="sidebar-section-body">
          {data.map((x: any, index: number) => {
            return (
              <SidebarPreview
                key={index}
                imageLink={data[index].imageLink}
                title={data[index].title}
                content={data[index].content}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SidebarSection;

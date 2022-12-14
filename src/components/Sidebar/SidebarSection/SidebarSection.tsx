import { SidebarSectionProps } from "./SidebarSection.types";
import SidebarPreview from "../SidebarPreview/SidebarPreview";
import { LoadingSpinner, LoadingSpinnerSize } from "@minteeble/ui-components";
import * as React from "react";

const SidebarSection = (props: SidebarSectionProps) => {
  let data = props.data;

  return (
    <>
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <h2 className="sidebar-section-header-name kanit" dangerouslySetInnerHTML={{ __html: props.name }}></h2>
          <span className="sidebar-section-header-line"></span>
        </div>
        <div className="sidebar-section-body">
          {data.length > 0 ? (
            data.map((x: any, index: number) => {
              return (
                <SidebarPreview
                  key={index}
                  imageLink={data[index].imageLink}
                  title={data[index].title}
                  excerpt={data[index].excerpt}
                  uri={data[index].uri}
                />
              );
            })
          ) : (
            <LoadingSpinner className="sidebar-section-spinner" Size={LoadingSpinnerSize.Medium} />
          )}
        </div>
      </div>
    </>
  );
};

export default SidebarSection;

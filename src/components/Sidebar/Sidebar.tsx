import { PageCard } from "@minteeble/ui-components";
import Preview from "./Preview";
import { SidebarProps } from "./Sidebar.types";

const Sidebar = (props: SidebarProps) => {
  return (
    <>
      <div id="sidebar">
        <PageCard
          style={{
            borderRadius: "2rem 0 0 2rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {props.data.map((x: any, index: number) => {
            return (
              <Preview key={index} imageLink={x.imageLink} title={x.title} />
            );
          })}
        </PageCard>
      </div>
    </>
  );
};

export default Sidebar;

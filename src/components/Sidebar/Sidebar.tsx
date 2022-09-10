import Preview from "./Preview";
import { SidebarProps } from "./Sidebar.types";

const Sidebar = (props: SidebarProps) => {
  return (
    <>
      {props.data.map((x: any, index: number) => {
        return <Preview key={index} imageLink={x.imageLink} title={x.title} />;
      })}
    </>
  );
};

export default Sidebar;

import { Sidebar, TopicPage } from "../../components";

const Topic = () => {
  return (
    <>
      <div className="topic" style={{ position: "relative" }}>
        <TopicPage />
        <Sidebar />
      </div>
    </>
  );
};

export default Topic;

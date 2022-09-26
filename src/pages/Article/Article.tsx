import { ArticlePage, Sidebar } from "../../components";

const Article = () => {
  return (
    <>
      <div className="article" style={{ position: "relative" }}>
        <ArticlePage />
        <Sidebar />
      </div>
    </>
  );
};

export default Article;

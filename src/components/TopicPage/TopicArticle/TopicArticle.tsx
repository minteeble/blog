import { TopicArticleProps } from "./TopicArticle.types";

const TopicArticle = (props: TopicArticleProps) => {
  let content =
    props.content.length < 200
      ? props.content
      : props.content.slice(0, 187) + "...";
  return (
    <>
      <div className="topic-article">
        <img src={props.imageLink} alt={props.title} />
        <div className="topic-article-info">
          <h2 dangerouslySetInnerHTML={{ __html: props.title }}></h2>
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
          <div className="author">
            <img src={props.author.avatar} alt="avatar" />
            <h4>
              {props.author.firstName} {props.author.lastName}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicArticle;

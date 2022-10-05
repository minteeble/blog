import { ArticleBodyProps } from "./ArticleBody.types";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  TelegramIcon,
  EmailIcon,
} from "react-share";
import { RelatedProps } from "../Related/Related.types";
import Related from "../Related";
import NextPrev from "../NextPrev";
import Sidebar from "../Sidebar";
import { LoadingSpinner, LoadingSpinnerSize } from "@minteeble/ui-components";

const ArticleBody = (props: ArticleBodyProps) => {
  return (
    <>
      <Sidebar article={true} id={props.id} />
      <div className="article-body">
        <h4 className="article-body-topic spaced">{props.topic}</h4>
        <h1
          className="article-body-title kanit"
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h1>
        <h5 className="article-body-date spaced">{props.date}</h5>
        {props.guid.length > 0 ? (
          <img
            className="article-body-featured"
            src={props.guid}
            alt={props.title}
          />
        ) : (
          <LoadingSpinner Size={LoadingSpinnerSize.Large} />
        )}
        <p
          className="article-body-content montserrat"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></p>
        <NextPrev id={props.id} />
        <div className="article-body-share">
          <h4 className="article-body-share-title spaced">share this post</h4>
          <div className="article-body-share-social">
            <WhatsappShareButton
              className="article-body-share-social-item"
              url={window.location.href}
            >
              <WhatsappIcon
                round={true}
                bgStyle={{ display: "none" }}
                iconFillColor={"#25D366"}
                size={45}
              ></WhatsappIcon>
            </WhatsappShareButton>
            <FacebookShareButton
              className="article-body-share-social-item"
              url={window.location.href}
              quote={"Read this article"}
            >
              <FacebookIcon
                round={true}
                bgStyle={{ display: "none" }}
                iconFillColor={"#3b5998"}
                size={60}
              ></FacebookIcon>
            </FacebookShareButton>
            <TelegramShareButton
              className="article-body-share-social-item"
              url={window.location.href}
            >
              <TelegramIcon
                round={true}
                bgStyle={{ display: "none" }}
                iconFillColor={"#229ED9"}
                size={45}
              ></TelegramIcon>
            </TelegramShareButton>
            <TwitterShareButton
              className="article-body-share-social-item"
              url={window.location.href}
            >
              <TwitterIcon
                round={true}
                bgStyle={{ display: "none" }}
                iconFillColor={"#1DA1F2"}
                size={60}
              ></TwitterIcon>
            </TwitterShareButton>
            <EmailShareButton
              className="article-body-share-social-item"
              url={window.location.href}
            >
              <EmailIcon
                round={true}
                bgStyle={{ display: "none" }}
                iconFillColor={"#ff4c4c"}
                size={60}
              ></EmailIcon>
            </EmailShareButton>
          </div>
          <span className="article-body-share-line"></span>
        </div>
      </div>
      <div className="article-body-related">
        <h4 className="article-body-related-title spaced">related posts</h4>
        <div className="article-body-related-wrapper montserrat">
          {props.related.length > 0 ? (
            props.related.map((x: RelatedProps, index: number) => {
              return (
                <Related
                  key={index}
                  imageLink={x.imageLink}
                  topic={x.topic}
                  title={x.title}
                  uri={x.uri}
                />
              );
            })
          ) : (
            <span className="article-body-related-wrapper-placeholder montserrat">
              This article has no related articles
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleBody;

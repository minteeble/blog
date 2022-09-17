import React from "react";
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

const ArticleBody = (props: ArticleBodyProps) => {
  return (
    <>
      <div className="article-body">
        <h4 className="article-body-topic spaced">{props.topic}</h4>
        <h1
          className="article-body-title kanit"
          dangerouslySetInnerHTML={{ __html: props.title }}
        ></h1>
        <h5 className="article-body-date spaced">{props.date}</h5>
        <p
          className="article-body-content montserrat"
          dangerouslySetInnerHTML={{ __html: props.content }}
        ></p>
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
    </>
  );
};

export default ArticleBody;

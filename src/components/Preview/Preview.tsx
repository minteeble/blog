import { LoadingSpinner, LoadingSpinnerSize } from "@minteeble/ui-components";
import { useState } from "react";
import Cta from "../Cta";
import { PreviewProps } from "./Preview.types";
import * as React from "react";

const Preview = (props: PreviewProps) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <section>
        <article>
          <div className="preview">
            <div className="preview-wrapper">
              <img
                onLoad={() => {
                  setIsLoaded(true);
                }}
                className="preview-wrapper-img"
                src={props.imageLink}
                alt={props.title}
                style={{ display: isLoaded ? "block" : "none" }}
              />

              {!isLoaded && <LoadingSpinner Size={LoadingSpinnerSize.Medium} />}
            </div>
            <div className="preview-info">
              <h3 className="preview-info-topic spaced">{props.topic}</h3>
              <h2 className="preview-info-title kanit" dangerouslySetInnerHTML={{ __html: props.title }}></h2>
              <p className="preview-info-content montserrat" dangerouslySetInnerHTML={{ __html: props.excerpt }}></p>
              <Cta uri={props.uri} />
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default Preview;

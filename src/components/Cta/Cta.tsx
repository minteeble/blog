import { Link } from "react-router-dom";
import { CtaProps } from "./Cta.types";

const Cta = (props: CtaProps) => {
  return (
    <Link to={props.uri}>
      <div className="cta">
        <h3 className="cta-text kanit" style={{ color: props.color }}>
          Read more
        </h3>
        <span className="cta-line"></span>
      </div>
    </Link>
  );
};

export default Cta;

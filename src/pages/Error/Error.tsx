import { Sidebar } from "../../components";
import ErrorPage from "../../components/ErrorPage";

const Error = () => {
  return (
    <>
      <div className="error">
        <ErrorPage />
        <Sidebar />
      </div>
    </>
  );
};

export default Error;

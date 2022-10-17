import "./App.css";

import * as React from "react";

/** @ts-ignore */
import { Route, Routes } from "react-router-dom";

import useConfig from "./components/useConfig";

export const Test = () => {
  return <div className="ciao">Ciao2</div>;
};

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  return (
    <div className="app">
      {/* <BlogNav /> */}
      <div className="app-body">
        {/** @ts-ignore */}
        <Routes>
          {/** @ts-ignore */}
          <Route path={"/ciao"} element={<Test />}></Route>
          {/** @ts-ignore */}
        </Routes>
        {/* <Route path="/:lang/:topic/:title" element={<Article />}></Route>

            <Route path="/:lang/:topic" element={<Topic />}></Route>
            <Route path="/:lang" element={<Home />}></Route>
            <Route
              path="/"
              element={<Navigate to={"/en"} replace={true} />}
            ></Route>
            <Route path="/:lang/not-found" element={<Error />}></Route>
            <Route path="*" element={<Error />}></Route> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

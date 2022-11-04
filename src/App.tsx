import * as React from "react";

/** @ts-ignore */
import { Route, Routes } from "react-router-dom";

import useConfig from "./components/useConfig";
import Article from "./pages/Article";
import Topic from "./pages/Topic";
import Home from "./pages/Home";
import Error from "./pages/Error";
/** @ts-ignore */
import { Navigate } from "react-router-dom";
import BlogNav from "./components/BlogNav";
import { Footer } from "@minteeble/ui-components";

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
      <header>
        <nav>
          <BlogNav />
        </nav>
      </header>
      <main>
        <div className="app-body">
          {/** @ts-ignore */}
          <Routes>
            {/** @ts-ignore */}
            <Route path="/:lang/:topic/:title" element={<Article />}></Route>
            {/** @ts-ignore */}
            <Route path="/:lang/:topic" element={<Topic />}></Route>
            {/** @ts-ignore */}
            <Route path="/:lang" element={<Home />}></Route>
            {/** @ts-ignore */}
            <Route path="/" element={<Navigate to={"/en"} replace={true} />}></Route>
            {/** @ts-ignore */}
            <Route path="/:lang/not-found" element={<Error />}></Route>
            {/** @ts-ignore */}
            <Route path="*" element={<Navigate to={"/:lang/not-found"} />}></Route>
          </Routes>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

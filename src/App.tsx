import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Topic from "./pages/Topic";
import Error from "./pages/Error";
import { Footer } from "@minteeble/ui-components";
import BlogNav from "./components/BlogNav";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <BlogNav />
        <div className="app-body">
          <Routes>
            <Route path="/:lang/:topic/:title" element={<Article />}></Route>
            <Route path="/:lang/:topic" element={<Topic />}></Route>
            <Route path="/:lang" element={<Home />}></Route>
            <Route path="/">{}</Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;

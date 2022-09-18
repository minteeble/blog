import { BrowserRouter, Routes, Route } from "react-router-dom";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Topic from "./pages/Topic";

const App = () => {
  return (
    <div className="app">
      <div className="app-body">
        <BrowserRouter>
          <Routes>
            <Route path="/:lang/:topic/:title" element={<Article />}></Route>
            <Route path="/:lang/:topic" element={<Topic />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

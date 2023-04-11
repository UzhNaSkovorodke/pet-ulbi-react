import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/About";
import Posts from "./pages/Posts";

const Case = () => {
  return (
    <Routes>
      <Route path="/" element={<Posts />} />
      <Route path="/about" element={<About />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Case />
    </BrowserRouter>
  );
}

export default App;

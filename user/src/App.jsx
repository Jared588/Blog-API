import { useState } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Post from "./components/Post";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

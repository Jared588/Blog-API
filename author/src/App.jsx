import { useState } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/posts/new" element={<CreatePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
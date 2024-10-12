import { useState } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Posts from "./components/Posts";
import Post from "./components/Post";

function App() {
  return (
    <Router>
      <nav className="flex w-screen p-5">
        <div className="flex gap-x-5">
          <Link className="text-2xl" to="/">Home</Link>
          <Link className="text-2xl" to="/posts">Posts</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;

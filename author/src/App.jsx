import { useState } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/posts/new" element={<CreatePost />} />
          <Route path="/posts/edit/:postId" element={<EditPost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

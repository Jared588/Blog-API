import { useState } from "react";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Posts from "./components/Posts";
import Post from "./components/Post";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import SignIn from "./components/SignIn";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Routes>
            <Route path="/signin" element={<SignIn />} />

            <Route path="/posts" element={<ProtectedRoute />}>
              <Route path="/posts" element={<Posts />} />
            </Route>
            <Route path="/posts/:postId" element={<ProtectedRoute />}>
              <Route path="/posts/:postId" element={<Post />} />
            </Route>
            <Route path="/posts/new" element={<ProtectedRoute />}>
              <Route path="/posts/new" element={<CreatePost />} />
            </Route>
            <Route path="/posts/edit/:postId" element={<ProtectedRoute />}>
              <Route path="/posts/edit/:postId" element={<EditPost />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Posts from './components/Posts';
import Post from './components/Post';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App

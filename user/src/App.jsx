import { useEffect } from "react";
import ReactGA from "react-ga4";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

import Posts from "./components/Posts";
import Post from "./components/Post";
import Header from "./components/Header";
import Home from "./components/Home";

const useAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route changes
    ReactGA.send("page_view", {
      page_path: location.pathname,
    });
  }, [location]);
};

function App() {
  useAnalytics(); // Call the analytics hook

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

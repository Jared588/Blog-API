import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        <h1 className="text-6xl p-10 text-center">Posts</h1>
        <div className="lg:w-2/5 md:w-2/3 border-t border-slate-600 mx-auto">
          {posts.map((post) => (
            <div key={post.id} className="border-b border-slate-600">
              <div className="hover:bg-indigo-600 hover:bg-opacity-10 hover:rounded-xl p-4 my-1">
                <Link className="text-white" to={`/posts/${post.id}`}>
                  <h2 className="text-3xl font-semibold">{post.title}</h2>
                  <p className="pb-2 text-indigo-500">
                    {formatDate(post.createdAt)} by {post.user.username}
                  </p>
                  <p className="text-indigo-200">{post.content}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;

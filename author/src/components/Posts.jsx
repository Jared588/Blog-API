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
      <div className="flex-grow">
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
                <div className="flex justify-end gap-1">
                  <button className="w-7">
                    <svg
                      className="fill-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <title>Edit</title>
                      <path d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" />
                    </svg>
                  </button>
                  <button className="w-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="fill-red-500"
                    >
                      <title>Delete</title>
                      <path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;

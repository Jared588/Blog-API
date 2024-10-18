import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api";
import Header from "./Header";

const Post = () => {
  const { postId } = useParams(); // Get postId from URL parameters
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPostById(postId);
        setPost(data);
      } catch (error) {
        setError("Failed to fetch the post");
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, [postId]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  if (loading)
    return (
      <div>
        <Header />
        <div className="text-center p-10">Loading...</div>
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div>
      <Header />
      <div className="flex-grow w-2/3 m-auto">
        <div className="py-20">
          <h2 className="text-6xl text-indigo-500">{post.title}</h2>
          <p className="text-indigo-200 pt-6 font-semibold">
            {formatDate(post.createdAt)} by {post.user.username}
          </p>
        </div>
        <p className="text-lg">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;

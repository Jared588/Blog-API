import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../api";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
};

export default Post;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePost } from "../api";
import Header from "./Header";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // Effect to load the current post data (if needed)
  useEffect(() => {
    const fetchPostData = async () => {
      // Assume you have a function to fetch the post data by ID
      const postData = await fetchPostById(postId); // Define this function to fetch post data
      setTitle(postData.title);
      setContent(postData.content);
    };

    fetchPostData();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePost(postId, { title, content });
      navigate(`../posts/${postId}`);
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleUpdate} className="px-10 pt-10 w-2/3 mx-auto">
        <div className="mb-4">
          <h1 className="text-5xl pb-10 text-center">Editor</h1>
          <label
            htmlFor="title"
            className="block text-3xl pb-2 font-medium text-indigo-500"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-slate-300 rounded-md"
            placeholder="Enter the post title"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="content"
            className="block text-3xl pb-2 font-medium text-indigo-500"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full p-2 border border-slate-300 rounded-md"
            placeholder="Write your content here"
            rows="5"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-5 py-2 mt-1 rounded-md hover:bg-indigo-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;

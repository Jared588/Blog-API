import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";
import Header from "./Header";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content });
      navigate("../posts");
    } catch (error) {
      console.error("Error creating the post:", error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="px-10 pt-10 w-2/3 mx-auto">
        <div className="mb-4">
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

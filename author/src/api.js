const API_URL = import.meta.env.VITE_API_URL; // Express API URL

// Fetch all posts
export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

// Fetch a single post
export const fetchPostById = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching post with ID ${postId}: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
};

// Create a new post
export const createPost = async (data) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create a post");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Delete post
export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId: postId }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// Update post
export const updatePost = async (postId, data) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "PUT", // Use PUT for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, data }), // Send both postId and data
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

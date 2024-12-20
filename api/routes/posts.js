var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
require("dotenv").config();

const prisma = new PrismaClient();

/* GET */
// Get all posts
// Use async because it's calling from the database
router.get("/", async function (req, res, next) {
  try {
    // Fetch posts from the post table
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
    });
    res.send(posts);
  } catch (error) {
    console.error("Error retrieving posts:", error);
    res.status(500).send("Server error");
  }
});

// Get specific post
router.get("/:postId", async function (req, res, next) {
  try {
    // Fetch specific post from the post table
    const postId = parseInt(req.params.postId); // Make sure postId is an integer
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
      },
    });

    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    console.error("Error retrieving post:", error);
    res.status(500).send("Server error");
  }
});

/* CREATE */
router.post("/", verifyToken, async (req, res, next) => {
  jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    }

    const post = {
      userId: authData.userId,
      title: req.body.title,
      content: req.body.content,
    };

    try {
      const newPost = await prisma.post.create({
        data: post,
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Failed to create post" });
    }
  });
});

/* UPDATE */
router.put("/", verifyToken, async (req, res, next) => {
  jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
    if (err) {
      return res.sendStatus(403);
    }
    const { postId, data } = req.body;
    try {
      const updatedPost = await prisma.post.update({
        where: { id: Number(postId) },
        data,
      });

      res
        .status(200)
        .json({ message: "Post updated succesfully", updatedPost });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Failed to update post" });
    }
  });
});

/* DELETE */
router.delete("/", verifyToken, async (req, res, next) => {
  jwt.verify(req.token, SECRET_KEY, async (err, authData) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    
    try {
      const deletedPost = await prisma.post.delete({
        where: { id: req.body.postId },
      });

      res
        .status(200)
        .json({ message: "Post deleted succesfully", deletedPost });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  });
});

// Format: Bearer <access_token>
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bearer is undefines
  if (typeof bearerHeader !== undefined) {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;

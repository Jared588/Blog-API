var express = require("express");
var router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/* GET */
// Get all posts
// Use async because it's calling from the database
router.get("/", async function (req, res, next) {
  try {
    // Fetch posts from the post table
    const posts = await prisma.post.findMany();
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
// to-do

/* UPDATE */
// to-do

/* DELETE */
// to-do

module.exports = router;

var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const SECRET_KEY = process.env.SECRET_KEY;
require("dotenv").config();

const prisma = new PrismaClient();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* POST login */
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      if (user.password == password) {
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
          expiresIn: "1h",
        });

        return res.status(200).json({ message: "Login successful", token });
      }
    }

    // If user not found or password incorrect
    return res
      .status(401)
      .json({ message: "Username or Passoword is incorrect" });
  } catch (error) {
    console.error("Error during login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

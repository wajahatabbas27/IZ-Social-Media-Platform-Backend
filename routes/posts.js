const express = require("express");
const router = express.Router();
const auth = require("../middlewear/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../models/post");

//=================================================================
// @route POST /api/posts
// @desc Add Post
// @access private
//=================================================================
router.post(
  "/",
  [auth, [check("body", "Enter some text inside post body").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array() });

    // creating a post
    const post = new Post({
      user: req.user.id,
      body: req.body.body,
    });

    try {
      // saving post inside database && returning as a response
      await post.save();
      res.status(200).json({ post });
    } catch (err) {
      console.log("Error ==>>", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//=================================================================
// @route GET /api/post
// @desc Get all posts
// @access private
//=================================================================
router.get("/", auth, async (req, res) => {
  try {
    // getting all posts from the database using find method!
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (err) {
    console.log("Error ==>> ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//=================================================================
// @route GET /api/post/:userId
// @desc Get posts of a particular user
// @access private
// Getting the particular user posts by providing the id of the user
//=================================================================
router.get("/:userID", auth, async (req, res) => {
  try {
    // validating the id from the middlewear id so applying a check
    if (req.params.userID !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });

    // getting all posts from the database using find method by providing the id of the user
    const posts = await Post.find({ user: req.params.userID });

    res.status(200).json({ posts });
  } catch (err) {
    console.log("Error ==>> ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//=================================================================
// @route PUT /api/post/:postId
// @desc Update a particular user by using post Id
// @access private
// Updating a post by its ID
//=================================================================
router.put(
  "/:id",
  [
    auth,
    [check("body", "Enter some text inside body of post").not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ msg: errors.array() });

    // We will be passng the changes in the database
    const changes = {};

    // If there is data so we are adding the data to the changes object that we just created to update the database
    if (req.body.body) changes.body = req.body.body;

    try {
      // checking the post in database by the params that is provided
      let post = await Post.findById(req.params.id);
      if (!post)
        return res
          .status(400)
          .json({ msg: "Post with this ID does not exist" });

      // checking the id of the user with the id of the header to check
      // Whether the person is the same
      if (post.user.toString() !== req.user.id)
        return res.status(401).json({ msg: "UnAuthorized User" });

      // Updating the post data
      post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: changes },
        { new: true }
      );

      res.status(200).json({ post });
    } catch (err) {
      console.log("Error ==>> ", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//=================================================================
// @route DELETE /api/post/:postId
// @desc DELETE POST
// @access private
// Deleting a post by its ID
//=================================================================
router.delete("/:id", auth, async (req, res) => {
  try {
    // Finding the post by id
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(400).json({ msg: "Post with this ID does not exist" });

    // validating the user that the user is valid
    if (post.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: "This user is not authorized to delete this post" });

    // Deleting a post by id
    await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: "The Post has been deleted" });
  } catch (err) {
    console.log("Error ==>> ", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;

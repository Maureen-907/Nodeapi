const express = require("express");
const {getPosts, createPost } = require("../controllers/post");
const {requireSignin} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {createPostValidator} = require("../validation");

const router = express.Router();

router.get("/", getPosts);
router.post(
    "/post/new/:userId", 
    requireSignin, 
    createPost,
    createPostValidator);

router.param("userId", userById);

module.exports = router;
 
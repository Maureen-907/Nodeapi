const express = require("express");
const {signup, signin, signout} = require("../controllers/auth");
const {userById} = require("../controllers/user");
const {userSignupValidator} = require("../validation");

const router = express.Router();

router.post("/signup",userSignupValidator, signup);
router.post("/signin",signin);
router.get("/signout", signout);



//any route containing :userid, our app will first execute userByID()
router.param("userId",userById);



module.exports = router;
 
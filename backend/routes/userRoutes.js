const express = require("express");
const router = express.Router();
const {userSignup , userLogin,userDetails} = require("../controller/userController");
const {verifyJWT} = require("../middleware/jwtAuthentication");
router.route("/usersignup")
    .post(userSignup);
router.route("/userlogin")
    .post(userLogin);
router.route("/userdetails")
    .get(verifyJWT,userDetails);
router.route("/user/:username")
    .get();

router.route("/test")
    .get(verifyJWT , (req,res)=>{
        return res.send("Protected Route Test");
    });

module.exports = router;
const express = require("express");
const router = express.Router();
const {userSignup , userLogin} = require("../controller/userController");
const {verifyJWT} = require("../middleware/jwtAuthentication");
router.route("/usersignup")
    .post(userSignup);
router.route("/userlogin")
    .post(userLogin);

router.route("/test")
    .get(verifyJWT , (req,res)=>{
        console.log(req.user);
        return res.send("Protected Route Test");
    });

module.exports = router;
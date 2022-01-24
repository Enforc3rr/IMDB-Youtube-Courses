const express = require("express");
const router = express.Router();
const {addVideo,fetchVideoInfo} = require("../controller/videoController");

router.route("/addvideo")
    .post(addVideo);
router.route("/getvideo/:videoID")
    .get(fetchVideoInfo);

module.exports = router;
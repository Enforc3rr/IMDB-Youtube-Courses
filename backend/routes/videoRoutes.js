const express = require("express");
const router = express.Router();
const {addVideo,fetchVideoInfo,changeRatings,deleteVideoInfo} = require("../controller/videoController");

router.route("/addvideo")
    .post(addVideo);
router.route("/getvideo/:videoID")
    .get(fetchVideoInfo);
router.route("/ratings")
    .post(changeRatings);
router.route("/delvideo/:videoID")
    .delete(deleteVideoInfo);

module.exports = router;
const express = require("express");
const router = express.Router();
const {addVideo,fetchVideoInfo,changeRatings,deleteVideoInfo,fetchViaQueries} = require("../controller/videoController");

router.route("/addvideo")
    .post(addVideo);
router.route("/getvideo/:videoID")
    .get(fetchVideoInfo);
router.route("/ratings")
    .post(changeRatings);
router.route("/delvideo/:videoID")
    .delete(deleteVideoInfo);
router.route("/fetchquery")
    .get(fetchViaQueries);


module.exports = router;
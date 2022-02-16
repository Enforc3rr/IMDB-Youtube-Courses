const express = require("express");
const router = express.Router();
const {addVideo,fetchVideoInfo,changeRatings,deleteVideoInfo,fetchViaQueries,checkVideoAvailabilty,youtubeInfo} = require("../controller/videoController");
const {verifyJWT} = require("../middleware/jwtAuthentication");

router.route("/addvideo")
    .post(verifyJWT,addVideo);
router.route("/getvideo/:videoID")
    .get(fetchVideoInfo);
router.route("/ratings")
    .post(verifyJWT,changeRatings);
router.route("/delvideo/:videoID")
    .delete(verifyJWT,deleteVideoInfo);
router.route("/fetchquery")
    .get(fetchViaQueries);
router.route("/videocheck")
    .get(verifyJWT,checkVideoAvailabilty);
router.route("/youtubeinfo")
    .get(youtubeInfo);

module.exports = router;
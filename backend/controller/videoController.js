const videoDatabase = require("../models/videoModel");
const moment = require("moment");
const videoAdditionDate = `${moment().format("DD/MM/YYYY").split("/")[0]}-${moment().format("DD/MM/YYYY").split("/")[1]}-${moment().format("DD/MM/YYYY").split("/")[2]}`;

exports.addVideo = async (req,res)=>{
    let videoID ;
    if(req.body.videoURL.split("watch?v=")[1]){ // put this code on front end as well so that we don't get any other link.
       videoID = req.body.videoURL.split("watch?v=")[1].split("&")[0];
    }
    const video = {
        videoID ,
        videoURL : `https://www.youtube.com/watch?v=${videoID}` ,
        videoTitle : req.body.videoTitle ,
        videoUploadedBy : req.body.videoUploadedBy ,
        videoThumbnailURL : `https://img.youtube.com/vi/${videoID}/0.jpg`,
        videoCategory : req.body.videoCategory.toLowerCase() ,
        videoTopic : req.body.videoTopic.toLowerCase() ,
        videoDescription : req.body.videoDescription ,
        videoLanguage : req.body.videoLanguage.toLowerCase() ,
        videoAddedToWebAppBy : req.body.videoAddedToWebAppBy,
        videoAddedToWebApp : videoAdditionDate ,
        videoRating : req.body.videoRating
    }
    try{
        await videoDatabase.create(video)
    }catch (e){
        return res.status(400).json({
            videoDataAdded : false ,
            errorCode : "duplication",
            message : "Video Couldn't be added as there was already a same videoURL present"
        });
    }
    return res.status(201).json({
        videoDataAdded : true ,
        errorCode : null ,
        message : "Video Data added successfully"
    });
}

exports.fetchVideoInfo = async (req,res)=>{
    const videoData = await videoDatabase.findOne({videoID : req.params.videoID});
    if(videoData){
        return res.status(200).json(videoData);
    }else{
        return res.status(400).send("Not found");
    }
}
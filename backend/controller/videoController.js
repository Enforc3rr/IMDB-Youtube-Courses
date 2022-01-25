const videoDatabase = require("../models/videoModel");
const moment = require("moment");
const axios = require("axios");
const videoAdditionDate = `${moment().format("DD/MM/YYYY").split("/")[0]}-${moment().format("DD/MM/YYYY").split("/")[1]}-${moment().format("DD/MM/YYYY").split("/")[2]}`;

exports.addVideo = async (req,res)=>{
    let videoID ;
    if(req.body.videoURL.split("watch?v=")[1]){ // put this code on front end as well so that we don't get any other link.
       videoID = req.body.videoURL.split("watch?v=")[1].split("&")[0];
    }
    const youtubeAPIResponse = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${process.env.YOUTUBE_KEY}`);

    const video = {
        videoID ,
        videoURL : `https://www.youtube.com/watch?v=${videoID}` ,
        videoTitle : youtubeAPIResponse.data.items[0].snippet.title,
        videoUploadedBy : youtubeAPIResponse.data.items[0].snippet.channelTitle ,
        videoUploadedAt : youtubeAPIResponse.data.items[0].snippet.publishedAt,
        videoThumbnailURL : `https://img.youtube.com/vi/${videoID}/0.jpg`,
        videoCategory : req.body.videoCategory.toLowerCase() ,
        videoTopic : req.body.videoTopic.toLowerCase() ,
        videoDescription : req.body.videoDescription ,
        videoLanguage : req.body.videoLanguage.toLowerCase() ,
        videoAddedToWebAppBy : req.body.videoAddedToWebAppBy,
        videoAddedToWebApp : videoAdditionDate
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
exports.changeRatings= async (req,res)=>{
    const videoRatingToBeChanged = await videoDatabase.findOne({videoID : req.body.videoID});
    const userChangingRatingDetail = {
        ratingsReceivedBy : req.body.ratingsReceivedBy,
        ratingValue : req.body.ratingValue
    }
    videoRatingToBeChanged.ratingsReceived.push(userChangingRatingDetail);
    videoRatingToBeChanged.videoRating = (videoRatingToBeChanged.videoRating + req.body.ratingValue)/2;
    const newData = await videoDatabase.updateOne({videoID : req.body.videoID},{$set : videoRatingToBeChanged},{new : true});
    return res.status(200).json(newData);
}

exports.deleteVideoInfo = async (req,res)=>{
    //For Now I am not gonna check if user who added video on webapp is same as the one who is gonna delete it .
    await videoDatabase.deleteOne({videoID : req.params.videoID});
    return res.send(req.params.videoID);
}

exports.fetchVideoInfo = async (req,res)=>{
    const videoData = await videoDatabase.findOne({videoID : req.params.videoID});
    if(videoData){
        return res.status(200).json(videoData);
    }else{
        return res.status(400).send("Not found");
    }
}
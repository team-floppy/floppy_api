const videoModel = require("../models/videos");
const { deleteOne, getProfile } = require("../utils/gridfsStream");

function uploadVideo(videoDetail) {
  console.log(videoDetail);
  return new Promise((resolve, reject) => {
    if (!videoDetail) {
      reject({
        success: false,
        message: "unable to save video details",
        data: null,
        error: "No video detail is provided"
      });
    } else {
      const videoDetails = {
        videoId: videoDetail.videoId,
        fileName: videoDetail.fileName,
        uploadedBy: videoDetail.username,
        videoTags: videoDetail.videoTags
      };
      videoModel
        .create(videoDetails)
        .then(created => {
          resolve({
            success: true,
            message: "File uploaded successfully",
            data: created,
            error: null
          });
        })
        .catch(error => {
          reject({
            success: false,
            message: "Unable to save video details",
            data: null,
            error
          });
        });
    }
  });
}

exports.uploadVideo = uploadVideo;

function addView(id) {
  return new Promise((resolve, reject) => {
    videoModel
      .findOneAndUpdate({ videoId: id }, { $inc: { views: 1 } })
      .then(result => {
        resolve({
          success: true,
          message: "incremented view",
          data: result,
          error: null
        });
      })
      .catch(error => {
        reject({
          success: false,
          message: "failed to inc view",
          data: null,
          error
        });
      });
  });
}

exports.addView = addView;

function deleteVideo(id) {
  return new Promise((resolve, reject) => {
    videoModel
      .findOne({ videoId: id })
      .then(video => {
        if (!video) {
          reject({
            success: false,
            message: "File does not exist or have been removed",
            data: null,
            error: null
          });
        } else {
          deleteOne(id, "videos")
            .then(result => {
              videoModel
                .deleteOne({ videoId: id })
                .then(fileDeleted => {
                  resolve({
                    success: true,
                    message: "Video deleted",
                    data: `video deleted ${fileDeleted}`,
                    error: null
                  });
                })
                .catch(error => {
                  reject({
                    success: false,
                    message: "Failed to delete video, Mongoose",
                    data: null,
                    error
                  });
                });
            })
            .catch(error => {
              reject({
                success: false,
                message: "Failed to delete video, Gridfs Stream",
                data: null,
                error
              });
            });
        }
      })
      .catch(error => {
        reject({
          success: false,
          message: "Failed to find the video, Mongoose",
          data: null,
          error
        });
      });
  });
}

exports.deleteVideo = deleteVideo;

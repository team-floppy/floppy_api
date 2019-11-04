const videoController = require("../controllers/VideoController");
const { uploadVideo } = require("../../bin/config/gridFsStorage");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

module.exports = function() {
  const videoCtrl = new videoController();

  /**uploading video route */

  router.post(
    "/upload/video",
    authMiddleware.authorizeComedian,
    uploadVideo,
    videoCtrl.uploadVideo
  );

  /**
   * Delete video route
   */
  router.delete(
    "/delete/:id",
    authMiddleware.authorizeComedian,
    videoCtrl.deleteVideo
  );

  /**Add view */
  router.put("/add/views/:id", authMiddleware.authorizeAll, videoCtrl.addView);

/**Stream */
  router.get("/watch/:id",  videoCtrl.streamvideo)

  return router;
};

const userController = require("../controllers/UserController");
const { uploadProfilePic } = require("../../bin/config/gridFsStorage");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

module.exports = function() {
  const userCtrl = new userController();

  /**Upload profile picture route */
  router.post(
    "/upload/avatar",
    authMiddleware.authorizeViewer,
    uploadProfilePic,
    userCtrl.uploadAvatar
  );

  /**View profile picture route */

  router.get("/avatar/:id", userCtrl.viewProfilePic);

  router.put(
    "/follow/:id",
    authMiddleware.authorizeAll,
    userCtrl.followComedian
  );

  router.get(
    "/followers/:id",
    authMiddleware.authorizeComedian,
    userCtrl.getFollowers
  );
  return router;
};

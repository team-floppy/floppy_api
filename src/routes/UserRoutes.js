const userController = require("../controllers/UserController");
const { uploadProfilePic } = require("../../bin/config/gridFsStorage");
const authMiddleware = require("../middlewares/authMiddleware");
const userMiddleware = require("../middlewares/userMiddleware.js");

const router = require("express").Router();

module.exports = function() {
  const userCtrl = new userController();

  /**Upload profile picture route */
  router.post(
    "/upload/avatar",
    authMiddleware.authorizeAll,
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

  router.put(
    "/unfollow/:id",
    authMiddleware.authorizeAll,
    userCtrl.unfollowComedian
  );
  router.get(
    "/followers/:id",
    authMiddleware.authorizeComedian,
    userCtrl.getFollowers
  );

  router.post(
    "/book/:id",
    userMiddleware.validateDetails,
    authMiddleware.authorizeAll,
    userCtrl.bookComedian
  );

  return router;
};

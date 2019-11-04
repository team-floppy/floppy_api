const userController = require("../controllers/UserController");
const { upload } = require("../../bin/config/gridFsStorage");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();

module.exports = function() {
  const userCtrl = new userController();
  router.post(
    "/upload/avatar",
    authMiddleware.authorizeAll,
    upload,
    userCtrl.uploadAvatar
  );

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
  return router;
};

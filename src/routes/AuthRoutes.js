const authController = require("../controllers/AuthController");
const { upload } = require("../../bin/config/gridFsStorage");
const {
  findOne,
  deleteOne,
  getProfile
} = require("../../bin/config/gridfsStream.js");
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();
module.exports = function() {
  const authCtrl = new authController();
  router.post("/register", authMiddleware.signUp, authCtrl.register);
  router.post(
    "/authenticate",
    authMiddleware.authenticate,
    authCtrl.authenticate
  );

  router.post(
    "/upload/avatar",
    authMiddleware.authorizeViewer,
    upload,
    authCtrl.uploadAvatar
  );

  router.get("/avatar/:id", authCtrl.getProfile);

  router.put("/Verify/:token", authCtrl.VerifyUser);
  return router;
};

const userService = require("../services/UserService");
const mongoose = require("mongoose");
const {
  findOne,
  deleteOne,
  getProfile
} = require("../../bin/config/gridfsStream.js");

module.exports = function userController() {
  this.uploadAvatar = function(req, res) {
    userService
      .uploadProfilePic({ ...req.user, ...req.file })
      .then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(200).send(err);
      });
  };

  this.viewProfilePic = function(req, res) {
    getProfile(req.params.id)
      .then(result => {
        result.pipe(res);
      })
      .catch(err => {
        res.send(err);
      });
  };

  this.followComedian = function(req, res) {
    const user = req.user;
    const comedianId = req.params.id;
    userService
      .followComedian(user.id, comedianId)
      .then(data => res.status(200).send(data))
      .catch(err => res.status(500).send(err));
  };

  this.getFollowers = function(req, res) {
    const comedianId = req.params.id;
    userService
      .getFollowers(comedianId)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  };
};
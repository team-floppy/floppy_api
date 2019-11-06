const userService = require("../services/UserService");
const comedianService = require("../services/comedianServices")
const { getProfile } = require("../utils/gridfsStream");

module.exports = function userController() {
  this.uploadAvatar = function(req, res) {
    console.log(req.file);
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
    getProfile(req.params.id, 'profilePictures')
      .then(readStream => {
          console.log(readStream)
        readStream.gfs.pipe(res);
        readStream.gfs.on("data", () => {
            console.log("data is coming")
        })
      })
      .catch(err => {
        res.send(err);
      });
  };

  this.followComedian = function(req, res) {
    const user = req.user;
    const comedianId = req.params.id;
    comedianService
      .followComedian(user.id, comedianId)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  };
  this.unfollowComedian = function(req, res){
    const user = req.user;
    const comedianId = req.params.id;
    comedianService
      .unfollowComedian(comedianId, user.id)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  }

  this.getFollowers = function(req, res) {
    const comedianId = req.params.id;
    comedianService
      .getFollowers(comedianId)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err));
  };

  this.bookComedian = function(req, res){
    const comedianId = req.params.id; 
    const user = req.user;
    const bookDetails = req.body;
    comedianService
      .bookComedian(user, comedianId, bookDetails)
      .then(data => res.status(200).json(data))
      .catch(err => res.status(500).json(err))
  };
};

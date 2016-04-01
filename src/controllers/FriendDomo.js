var _ = require('underscore');
var models = require('../models');

var FriendDomo = models.FriendDomo;

var friendMakerPage = function(req, res) {
  FriendDomo.FriendDomoModel.findByOwner(req.session.account._id, function(err, docs) {
    if(err) {
      console.log(err);
      return res.status(400).json({error: 'An error occurred'});
    }
    res.render('friendMaker', {csrfToken: req.csrfToken(), domos: docs});
  });
};

var makeFriendDomo = function(req, res) {
  if(!req.body.name || !req.body.friends || !req.body.bestFriend) {
    return res.status(400).json({error: "RAWR! Name, number of friends, and best friend are required"});
  }

  var domoData = {
    name: req.body.name,
    friends: req.body.friends,
    bestFriend: req.body.bestFriend,
    owner: req.session.account._id
  };

  var newDomo = new FriendDomo.FriendDomoModel(domoData);

  newDomo.save(function(err) {
    if(err) {
      console.log(err);
      return res.status(400).json({error: 'An error occurred'});
    }

    res.json({redirect: '/friendmaker'});
  });
};

module.exports.friendMakerPage = friendMakerPage;
module.exports.makeFriend = makeFriendDomo;

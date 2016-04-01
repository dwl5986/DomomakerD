var mongoose = require('mongoose');
var _ = require('underscore');

var FriendDomoModel;

var setName = function(name) {
  return _.escape(name).trim();
};

var FriendDomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName
  },
  friends: {
    type: Number,
    min: 0,
    required: true
  },
  bestFriend: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account'
  },
  createdData: {
    type: Date,
    default: Date.now
  }
});

FriendDomoSchema.methods.toAPI = function() {
  return {
    name: this.name,
    friends: this.friends,
    bestFriend: this.bestFriend
  };
};

FriendDomoSchema.statics.findByOwner = function(ownerId, callback) {
  var search = {
    owner: mongoose.Types.ObjectId(ownerId)
  };

  return FriendDomoModel.find(search).select('name friends bestFriend').exec(callback);
};

FriendDomoModel = mongoose.model('FriendDomo', FriendDomoSchema);

module.exports.FriendDomoModel = FriendDomoModel;
module.exports.FriendDomoSchema = FriendDomoSchema;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const userSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  _id: {type: String, required: true, default: shortid.generate()},
  count: Number,
  __v: false,
  log: [{
    __v: false,
    _id: false,
    description: String,
    duration: Number,
    date: {type: Date, default: Date.now}
  }]
});

const User = mongoose.model('User', userSchema);
exports.User = User;
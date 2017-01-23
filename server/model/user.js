"use strict";

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
  age: Number,
  sex: Number,
  photo: String,
  role: {
    type: Number,
    default: 0
  },
  time: {
    createTime: {
      type: Date,
      default: Date.now()
    }
  }
});

module.exports = mongoose.model('user', UserSchema);
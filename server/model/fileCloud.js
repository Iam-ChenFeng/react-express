"use strict";

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      ObjectId = Schema.Types.ObjectId;

const FileCloudSchema = new Schema({}, { strict: false });

module.exports = mongoose.model('fileCloud', FileCloudSchema);
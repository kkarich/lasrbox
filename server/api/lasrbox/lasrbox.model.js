'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LasrboxSchema = new Schema({
  servoX:Number,
  servoY:Number,
  laserOn:Boolean,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Lasrbox', LasrboxSchema);

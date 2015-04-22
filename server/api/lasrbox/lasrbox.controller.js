'use strict';

var _ = require('lodash');
var Lasrbox = require('./lasrbox.model');
var five = require("johnny-five"),board, servoX,servoY,laser;

board = new five.Board();

board.on("ready", function() {
  servoX = new five.Servo(9);
  servoY = new five.Servo(10);
  laser = new five.Led(13);
  laser.on();
  // Servo alternate constructor with options
  /*
  var servo = new five.Servo({
    id: "MyServo",     // User defined id
    pin: 10,           // Which pin is it attached to?
    type: "standard",  // Default: "standard". Use "continuous" for continuous rotation servos
    range: [0,180],    // Default: 0-180
    fps: 100,          // Used to calculate rate of movement between positions
    invert: false,     // Invert all specified positions
    startAt: 90,       // Immediately move to a degree
    center: true,      // overrides startAt if true and moves the servo to the center of the range
    specs: {           // Is it running at 5V or 3.3V?
      speed: five.Servo.Continuous.speeds["@5.0V"]
    }
  });
  */


  // Servo API

  // min()
  //
  // set the servo to the minimum degrees
  // defaults to 0
  //
  // eg. servo.min();

  // max()
  //
  // set the servo to the maximum degrees
  // defaults to 180
  //
  // eg. servo.max();

  // center()
  //
  // centers the servo to 90°
  //
  // servo.center();

  // to( deg )
  //
  // Moves the servo to position by degrees
  //
  // servo.to( 90 );

  // step( deg )
  //
  // step all servos by deg
  //
  // eg. array.step( -20 );

  servoX.center();
  servoY.center();
});

// Get list of lasrboxs
exports.updateServo = function(req, res) {
  console.log(req.body)
  var lasrbox = req.body.data;
  if(lasrbox.laserOn){laser.on();}
  else {laser.off()}
  servoX.to(lasrbox.servoX);
  servoY.to(lasrbox.servoY);
  res.end();

};


// Get list of lasrboxs
exports.index = function(req, res) {

  Lasrbox.find(function (err, lasrboxs) {
    if(err) { return handleError(res, err); }
    return res.json(200, lasrboxs);
  });
};

// Get a single lasrbox
exports.show = function(req, res) {
  Lasrbox.findById(req.params.id, function (err, lasrbox) {
    if(err) { return handleError(res, err); }
    if(!lasrbox) { return res.send(404); }
    return res.json(lasrbox);
  });
};

// Creates a new lasrbox in the DB.
exports.create = function(req, res) {
  Lasrbox.create(req.body, function(err, lasrbox) {
    if(err) { return handleError(res, err); }
    return res.json(201, lasrbox);
  });
};

// Updates an existing lasrbox in the DB.
exports.update = function(req, res) {

  if(req.body._id) { delete req.body._id; }
  Lasrbox.findById(req.params.id, function (err, lasrbox) {

    if (err) { return handleError(res, err); }

    if(!lasrbox) { return res.send(404); }

    var updated = _.merge(lasrbox, req.body.data);

    updated.save(function (err) {
      if (err) { return handleError(res, err); }


      return res.json(200, lasrbox);
    });
  });
};

// Deletes a lasrbox from the DB.
exports.destroy = function(req, res) {
  Lasrbox.findById(req.params.id, function (err, lasrbox) {
    if(err) { return handleError(res, err); }
    if(!lasrbox) { return res.send(404); }
    lasrbox.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

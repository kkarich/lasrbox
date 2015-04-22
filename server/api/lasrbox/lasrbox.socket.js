/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Lasrbox = require('./lasrbox.model');

exports.register = function(socket) {
  Lasrbox.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Lasrbox.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('lasrbox:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('lasrbox:remove', doc);
}
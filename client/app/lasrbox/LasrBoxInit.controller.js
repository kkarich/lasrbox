'use strict';

angular.module('lasrboxApp')
  .controller('LasrBoxInitCtrl', function ($scope,$http) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var peer = new Peer('my-cat-video',{key: 'kdo8ub4k13rnqaor'});

    peer.on('open', function(){

        $('#my-id').text(peer.id);
        navigator.getUserMedia({video: true, audio: true}, function(stream) {
         // Set your video displays
          $('#my-video').prop('src', URL.createObjectURL(stream));

          window.localStream = stream;

        }, function(){ $('#step1-error').show(); });
      });

      //On connected to controller peer
      peer.on('connection', function(conn) {

        conn.on('open', function() {
          //On connection call peer
          var call = peer.call(conn.peer, window.localStream);
            // Receive messages
            conn.on('data', function(data) {
            console.log('Received', data);

            $http.post('/api/lasrboxs/', {data:data}).
                success(function(data, status, headers, config) {
                  // this callback will be called asynchronously
                  // when the response is available
                }).
                error(function(data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });
            });
          });

          conn.on('close', function() {
            console.log('closed')
            $http.post('/api/lasrboxs/', {data:{servoX:0,servoY:0,laserOn:false}}).
                success(function(data, status, headers, config) {
                  // this callback will be called asynchronously
                  // when the response is available
                }).
                error(function(data, status, headers, config) {
                  // called asynchronously if an error occurs
                  // or server returns response with an error status.
                });
          });

    });

  });

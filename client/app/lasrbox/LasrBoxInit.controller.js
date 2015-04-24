'use strict';

angular.module('lasrboxApp')
  .controller('LasrBoxInitCtrl', function ($scope,$http,Queue) {

  var peer = new Peer('my-cat-video',{key: 'lwjd5qra8257b9'});



  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  navigator.getUserMedia({video: true, audio: true}, function(stream) {

          peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
          });

          peer.on('connection', function(conn) {
               //Call the newly connected peer
              var call = peer.call(conn.peer, stream);

              // Send messages
              conn.send('Successfully Connected!');

              //Log Connection info
              console.log('connected to',conn.peer);
              console.log('connections', peer.connections);

              Queue.addPeer(conn.peer);
              console.log('queue', Queue.list());

              console.log(typeof broadcastQueue, 'broadcast')
              Queue.startTimer(function(){broadcastQueue()});


              //Connection open
              conn.on('open', function() {

                  broadcastQueue();
                  // Receive messages
                  conn.on('data', function(data) {

                      if(conn.peer === Queue.list()[0]){
                          console.log('This is the controller');
                          console.log('Send Post to Server');
                      }



                      console.log('Received', data, 'from', conn.peer);

                  });



              });

              //When a pear exists or is closed
              conn.on('close', function() {

                  console.log(conn.peer, ' closed');

                  //Remove peer them from the queue
                  Queue.removePeer(conn.peer);

                  broadcastQueue();

              });


          });

      }, function(err) {
          console.log('Failed to get local stream' ,err);
      });


      var broadcastQueue = function(){
            //For each connection to peer, send back queue status
            for(var key in peer.connections){
                peer.connections[key][0].send({queue: Queue.list()});
            }

        };



  });

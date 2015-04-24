'use strict';

angular.module('lasrboxApp').factory('Queue', ['$timeout',
	function($timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    // Queue service logic
  // ...

  var Queue = {};
      Queue.peers = [];
      Queue.timer = false;
  // Public API

    Queue.addPeer =  function(peer) {
      Queue.peers.push(peer);
    };
    Queue.removePeer= function(peer) {
        var index = Queue.peers.indexOf(peer);
      if (index > -1) {
                  Queue.peers.splice(index, 1);
              }
    };
    Queue.startTimer = function(broadcastQueue) {

      if(Queue.peers.length > 1){
              if(Queue.timer){
                  console.log('timer already started');
              }
              else{
                  console.log('started timer');
                  $timeout(function(){
                    console.log(broadcastQueue,'service')
                    Queue.timesUp(broadcastQueue)
                    }, 5000);
                  Queue.timer = true;

              }
          }
    };
    Queue.timesUp = function(broadcastQueue) {
      Queue.timer = false;
              //Push peer to end of queue
              Queue.peers.push(Queue.peers[0]);
              Queue.peers.splice(0,1);

              broadcastQueue()
              Queue.startTimer();
    };
    Queue.list = function() {
      return Queue.peers;
    };


  return Queue;

}]);

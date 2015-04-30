'use strict';

describe('Service: Queue', function () {

  // load the service's module
  beforeEach(module('lasrboxApp'));

  // instantiate service
  var Queue;
  var $timeout;
  beforeEach(inject(function (_Queue_,_$timeout_) {
    Queue = _Queue_;
    $timeout = _$timeout_;
  }));

  it('addPeer() should add a peer to Queue.peers array', function () {

    var peer = 'gvjslkcf3sqvvx6r';
    var peers = [peer]
    Queue.addPeer(peer)
    expect(Queue.peers).toEqual(peers);
  });

  it('removePeer() should remove the provided peer from the Queue.peers array', function () {

    var peer = 'gvjslkcf3sqvvx6r';
    Queue.peers = [peer]
    Queue.removePeer(peer)
    expect(Queue.peers).toEqual([]);
  });

  it('startTimer() shoud call timesUp after timeout if there is more than 1 peer in Queue', function () {

    spyOn(Queue, 'timesUp');
    var peer1 = 'gvjslkcf3sqvvx6r';
    var peer2 = 'gvjslkcf3sqvvx62';
    var broadcastQueue = function(){};

    Queue.peers = [peer1,peer2]

    Queue.startTimer(broadcastQueue);
    $timeout.flush()

    expect(Queue.timesUp).toHaveBeenCalled();
  });

  it('startTimer() shoud not call timesUp if there is not more than 1 peer in Queue', function () {

    spyOn(Queue, 'timesUp');
    var peer1 = 'gvjslkcf3sqvvx6r';

    var broadcastQueue = function(){};

    Queue.peers = [peer1]

    Queue.startTimer(broadcastQueue);


    expect(Queue.timesUp).not.toHaveBeenCalled();
  });

  it('timesUp() shoud set timer to false', function () {
    Queue.timer = true;
    Queue.timesUp(function(){});

    expect(Queue.timer).toBe(false);
  });

  it('timesUp() shoud move peer in front of Queue to the end', function () {

    var peer1 = 'gvjslkcf3sqvvx6r';
    var peer2 = 'gvjslkcf3sqvvx62';
    var peer3 = 'gvjslkcf3sqvvx63';

    Queue.peers = [peer1,peer2,peer3];
    var new_order = [peer2,peer3,peer1];


    Queue.timesUp(function(){});

    expect(Queue.peers).toEqual(new_order);
  });

  it('timesUp() shoud call broadcast que and startTimer', function () {

    spyOn(Queue, 'startTimer');
    broadcastQueue = jasmine.createSpy();
    var broadcastQueue = function(){};
    Queue.timesUp(broadcastQueue);

    expect(Queue.startTimer).toHaveBeenCalled();
    expect(broadcastQueue).toHaveBeenCalled();
  });

});

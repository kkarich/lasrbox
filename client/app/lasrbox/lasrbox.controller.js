'use strict';

angular.module('lasrboxApp')
  .controller('LasrboxCtrl', function ($scope,$http) {

    $scope.cattoyInfo = {};
    $scope.cattoyInfo.laserOn = true;
    $scope.cattoyInfo.servoX = 0;
    $scope.cattoyInfo.servoY =0;
    $scope.minX = 0;
    $scope.maxX = 180;
    $scope.minY = 0;
    $scope.maxY = 180;
    $scope.loading = true;
    $scope.toggled = true;

    $scope.toggle = function(){
      $scope.toggled = !$scope.toggled;
    };

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var peer = new Peer('cat-controller',{key: 'kdo8ub4k13rnqaor'});

    // init connection
    var conn = peer.connect('my-cat-video');

    conn.on('open', function() {

      conn.send($scope.cattoyInfo);
      // Receive messages
      conn.on('data', function(data) {
        console.log('Received', data);
      });

    });



    peer.on('call', function(call) {

        // Answer the call without providing data
        call.answer(null);
        $scope.loading = false;
        $scope.$apply();
        call.on('stream', function(remoteStream) {
          // Show stream in some video element.


          $('#cat-video').prop('src', URL.createObjectURL(remoteStream));
        });
    });




      // Accepts a MouseEvent as input and returns the x and y
  // coordinates relative to the target element.

  var getCrossBrowserElementCoords = function (mouseEvent)
  {
    var result = {
      x: 0,
      y: 0
    };

    if (!mouseEvent)
    {
      mouseEvent = window.event;
    }

    if (mouseEvent.pageX || mouseEvent.pageY)
    {
      result.x = mouseEvent.pageX;
      result.y = mouseEvent.pageY;
    }
    else if (mouseEvent.clientX || mouseEvent.clientY)
    {
      result.x = mouseEvent.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
      result.y = mouseEvent.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
    }

    if (mouseEvent.target)
    {
      var offEl = mouseEvent.target;
      var offX = 0;
      var offY = 0;

      if (typeof(offEl.offsetParent) != "undefined")
      {
        while (offEl)
        {
          offX += offEl.offsetLeft;
          offY += offEl.offsetTop;

          offEl = offEl.offsetParent;
        }
      }
      else
      {
        offX = offEl.x;
        offY = offEl.y;
      }

      result.x -= offX;
      result.y -= offY;
    }

    return result;
  };

  var getMouseCoords = function (mouseEvent)
  {
    var coords = getCrossBrowserElementCoords(mouseEvent);
    return [coords.x,coords.y]
  };

$scope.onMouseMove = function ($event) {
    var videoWidth = document.getElementById('cat-video').offsetWidth;
    var videoHeight = document.getElementById('cat-video').offsetHeight;

    var location = {};
    var servoLocations = getMouseCoords($event);


    location.x = parseInt($scope.minX + (servoLocations[0] * ($scope.maxX - $scope.minX)  / videoWidth))
    location.y = parseInt($scope.minY + (servoLocations[1] * ($scope.maxY - $scope.minY)  / videoHeight))

    if(Math.abs($scope.cattoyInfo.servoY - location.y) + Math.abs($scope.cattoyInfo.servoX - location.x)> 10) {
      console.log($scope.cattoyInfo.servoX, $scope.cattoyInfo.servoY)
      $scope.cattoyInfo.servoX =  location.x;
      $scope.cattoyInfo.servoY =  location.y;
      conn.send($scope.cattoyInfo);
    };


  };


  $scope.updateLaser = function () {

    $scope.cattoyInfo.laserOn = !$scope.cattoyInfo.laserOn;
    conn.send($scope.cattoyInfo);
  };



  });

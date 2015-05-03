'use strict';

describe('Controller: LasrboxCtrl', function () {

  // load the controller's module
  beforeEach(module('lasrboxApp'));

  var LasrboxCtrl, scope;



  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LasrboxCtrl = $controller('LasrboxCtrl', {
      $scope: scope
    });
  }));

  it('scope.toggle should default to false, scope.toggle() should reverse value', function () {

    expect(scope.toggled).toEqual(true);
    scope.toggle();
    expect(scope.toggled).toEqual(false);
    scope.toggle()
    expect(scope.toggled).toEqual(true);
  });
});

function Peer(){
  this.on = function(){};
  this.connect = function(){
      return new Conn();

  };
};
function Conn(){
  this.on = function(){};
};

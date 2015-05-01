'use strict';

describe('Controller: LasrboxCtrl', function () {

  // load the controller's module
  beforeEach(module('lasrboxApp'));

  var LasrboxCtrl, scope, Peer;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LasrboxCtrl = $controller('LasrboxCtrl', {
      $scope: scope,
      Peer:Peer
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

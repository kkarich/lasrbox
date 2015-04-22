'use strict';

describe('Controller: LasrBoxInitCtrl', function () {

  // load the controller's module
  beforeEach(module('lasrboxApp'));

  var LasrBoxInitCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LasrBoxInitCtrl = $controller('LasrBoxInitCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

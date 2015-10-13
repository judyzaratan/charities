/*global beforeEach, describe, expect, inject, it */

describe('SigninController', function() {
  var $scope, $rootScope, createController, $httpBackend, $stateParams, Auth;
  var c1 = '1';
  var c2 = '2';
  var c3 = '3';

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('pledgr'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $stateParams = $injector.get('$stateParams');
    Auth = $injector.get('Auth');
    $stateParams.c1 = c1;
    $stateParams.c2 = c2;
    $stateParams.c3 = c3;
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('SignInController', {
        $scope: $scope

      });
    };
  }));

  it('should have a signin method on the $scope and delegate to the Auth factory', function() {
    createController();
    expect(Auth.signin).to.be.a('function');
    expect($scope.signin).to.be.a('function');
  });

  it('should have a user object with username and password properties', function() {
    createController();
    expect($scope.user).to.be.an('object');
    expect($scope.user.username).to.be.a('string');
    expect($scope.user.password).to.be.a('string');
  });
});

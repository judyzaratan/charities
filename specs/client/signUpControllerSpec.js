/*global beforeEach, afterEach, describe, expect, inject, it */

describe('SignUpController', function() {
  var $scope, $rootScope, createController, $httpBackend, $stateParams, Auth, SMS;
  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('pledgr'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $stateParams = $injector.get('$stateParams');
    Auth = $injector.get('Auth');
    SMS = $injector.get('SMS');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('SignupController', {
        $scope: $scope

      });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should have a user prop which is an object', function() {
    createController();
    expect($scope.user).to.be.an('object');
  });

  it('should have a getToken function', function() {
    createController();
    expect($scope.getToken).to.be.a('function');
  });

  it('should have a signup function', function() {
    createController();
    expect($scope.signup).to.be.a('function');
  });

  it('Auth should have a signup function', function() {
    createController();
    expect(Auth.signup).to.be.a('function');
  });

  it('should hit the signup API correctly', function() {
    $httpBackend.expectPOST('/api/users/signup').respond(201, JSON.stringify({
      data: {
        token: 'token!'
      }
    }));
    createController();
    $scope.signup();
    $httpBackend.flush();

  });

  it('should have a sendCode function', function() {
    createController();
    expect($scope.sendCode).to.be.a('function');
  });

  it('should hit the send API correctly', function() {
    $httpBackend.expectPOST('/api/sms/send').respond(201, JSON.stringify({
      data: {
        sent: 'sent!'
      }
    }));
    createController();
    $scope.sendCode();
    $httpBackend.flush();

  });

  it('should have a verifyCode function', function() {
    createController();
    expect($scope.verifyCode).to.be.a('function');
  });

  it('should hit the verify API correctly', function() {
    $httpBackend.expectPOST('/api/sms/verify').respond(201, JSON.stringify({
      data: {
        found: 'found!'
      }
    }));
    createController();
    $scope.verifyCode();
    $httpBackend.flush();

  });

});

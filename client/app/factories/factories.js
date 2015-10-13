angular.module('pledgr.factories', [])

.factory('Auth', function($http, $window) {

  var userInfo = {
      first:'First Name',
      last:'Last Name',
      username: 'username@example.com',
      password: '',
      male: false,
      female: false,
      animals: false,
      arts: false,
      education: false,
      environment: false,
      health: false,
      humanService: false,
      international: false,
      publicBenefit: false,
      religion: false,
      local: false,
      phone: '(111)111-1111',
      code:'test',
      pledge: 100.00
    };

  var signup = function(data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: data
    })
    .then(function(resp) {
      $window.sessionStorage.token = resp.data.token;
    });
  };

  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function(resp) {
      $window.sessionStorage.token = resp.data.token;
    });
  };

  var isAuthenticated = function(token) {
    // sends the JWT to the server, which will return a bool if authenticated appropriately
    return $http({
      method: 'GET',
      url: '/api/users/signedin',
      headers: {
        'X-Access-Token': token
      }
    }).then(function(resp) {
      if (resp.status === 200) { return true; }
    });
  };

  return {
    userInfo: userInfo,
    signup: signup,
    signin: signin,
    isAuthenticated: isAuthenticated
  };
})

.factory('SMS', function($http) {
  var sendCode = function(data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/sms/send',
      data: data
    })
    .then(function(resp) {
      return resp.data.sent;
    });
  };

  var verifyCode = function(data) {
    console.log(data);
    return $http({
      method: 'POST',
      url: '/api/sms/verify',
      data: data
    })
    .then(function(resp) {
      return resp.data.found;
    });
  };

  return {
    sendCode: sendCode,
    verifyCode: verifyCode
  };
});

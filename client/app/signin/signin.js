angular.module('pledgr.signin', [])

.controller('SignInController', function($scope, $window, $state, $location, Auth) {
  $scope.user = {
    username: 'someone@example.com',
    password: 'Password'
  };

  $scope.signin = function() {
    Auth.signin($scope.user)
      .then(function() {
        var token = $window.sessionStorage.token;
        if (Auth.isAuthenticated(token)) {
          $state.go('profile');
        } else {
          $state.go('signin');
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  };
});

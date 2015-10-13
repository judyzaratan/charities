angular.module('pledgr.signup', [])

// .config(function($window){
//     $window.Stripe.setPublishableKey('pk_test_3Fzz9YSECJXQuhTlWhLzcj6P');
// })

.controller('SignupController', function($scope, $window, $state, Auth, SMS) {

  // sets your application publishable key
  $window.Stripe.setPublishableKey('pk_test_3Fzz9YSECJXQuhTlWhLzcj6P');

  $scope.user = Auth.userInfo;

 // sends credit card info to Stripe and returns with token
  $scope.getStripeToken = function() {
    var Cardinfo = {
      number : $scope.number,
      //jscs:disable requireCamelCaseOrUpperCaseIdentifiers
      exp_month : $scope.expiry.split('/')[0], // jshint ignore:line
      exp_year : $scope.expiry.split('/')[1].split('').splice(2).join(''), // jshint ignore:line
      //jscs:enable requireCamelCaseOrUpperCaseIdentifiers
      cvc : $scope.cvc
    };
    $window.Stripe.createToken(Cardinfo, function(status, res) {
      $scope.user.stripeToken = res.id;
    });

  };

  $scope.signup = function() {
    Auth.signup(Auth.userInfo)
    // .then(function(token) {
    //     $window.localStorage.setItem('token', token);
    //     // $location.path('/userhome');
    //   })
      .then(function() {
        Auth.userInfo = $scope.user;
        $state.go('profile');
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  $scope.sendCode = function() {
    var phone = $scope.user.phone.match(/\d/g).join('');
    SMS.sendCode({
      phone: phone
    })
    .then(function(sent) {
      if (!sent) {
        console.error('Error sending message. Please try again later.');
      }
    });
  };

  $scope.verifyCode = function() {
    var phone = $scope.user.phone.match(/\d/g).join('');
    SMS.verifyCode({
      phone: phone,
      code: $scope.user.code
    })
    .then(function(found) {
      if (found) {
        console.log('Code found');
        // add ability to show user that their number was verified
      } else {
        console.log('Code not found');
        $('#verify').$invalid = true;
      }
    });
  };
})

.directive('converter', function(converters) {
  return {
    require: 'ngModel',
    link: function(scope, element, attr, ngModel) {
      var converter = converters[attr.converter];
      ngModel.$formatters.unshift(converter.formatter);
      ngModel.$parsers.push(converter.parser);
    }
  };
})

.value('converters', {
  y2w: {
    formatter: function(y) {
      return Math.ceil(y / 52);
    },
    parser: function(w) {
      return w * 52;
    }
  }
});

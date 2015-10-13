angular.module('pledgr.profile', [])

.controller('ProfileController', function($scope, $http, $window, Auth) {

  $scope.charityList = [];

  if (Auth.isAuthenticated($window.sessionStorage.token)) {

    $scope.user = Auth.userInfo;

    var charityChartDiv = '<div id="charityChart"></div>';
    $('#highchart-container').append(charityChartDiv);

    $scope.makeChart = function(data) {
      //Tally total contribution from user
      var totalContributions = data.reduce(function(previousValue, currentValue) {
          return previousValue + currentValue.amount;
        },
        0);
      //Calculate donation ratio
      var individualRatio = data.map(function(input) {
        return [input.charity, parseFloat(input.amount / totalContributions)];
      });
      //Render user data info
      $('#charityChart').highcharts({
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: 1,//null,
          plotShadow: false
        },
        credits: false,
        title: {
          text: 'Total Contributions'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [
          {
            type: 'pie',
            name: 'Donations',
            data: individualRatio
          }
        ]
      });
    };

    // fetches donation data for profile charts
    $http({
      method: 'GET',
      url: '/api/users/profile',
      headers: {
        'X-Access-Token': $window.sessionStorage.token
      }
    }).then(function(resp) {
      if (resp.status === 200) {
        $scope.charityList = resp.data;
        $scope.makeChart($scope.charityList);
      }
    });
  }
});

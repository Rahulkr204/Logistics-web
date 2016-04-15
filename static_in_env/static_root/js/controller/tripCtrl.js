var myapp = angular.module('tripApp', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
myapp.controller('tripCtrl',['$scope', '$http', '$rootScope',function($scope, $http, $rootScope) {
  // $scope.triplist={};

  $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/triplist/?format=json'})
  .success(function (response) {
    console.log("Response Status 200 OK.");     
    $scope.triplist = response
    //console.log($scope.triplist);
  })
  .error(function (data, status, headers, config) {
    $scope.subOrd = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
  });
}])
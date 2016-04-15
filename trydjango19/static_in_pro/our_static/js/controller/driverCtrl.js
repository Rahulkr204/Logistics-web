var myapp = angular.module('driver-app', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
myapp.controller('driverCtrl',['$scope', '$http', '$rootScope',function($scope, $http, $rootScope) {
  // $scope.orders={};

  $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/driverlist'})
  .success(function (response) {     
    $scope.drivers = response
    //console.log($scope.drivers);
    console.log("Response Status 200 OK.");
  })
  .error(function (data, status, headers, config) {
    $scope.subOrd = "Data: " + data +
                      "<hr />status: " + status +
                      "<hr />headers: " + header +
                      "<hr />config: " + config;
  });
}])
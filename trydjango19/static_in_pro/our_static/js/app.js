
// var url = "http://rahulkumarwp.pythonanywhere.com/logistics_api/api/orderslist/?format=json";

var myapp = angular.module('orders-list', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
myapp.controller('orderCtrl', ['$scope', '$http', '$rootScope',function($scope, $http, $rootScope) {
  $scope.orders={};
  $scope.query = {};
  $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/orderslist/?format=json'})
  .success(function (response) {
    $scope.orders = response;
    
  })
  .error(function (data, status, headers, config) {
  });

}]);
 myapp.
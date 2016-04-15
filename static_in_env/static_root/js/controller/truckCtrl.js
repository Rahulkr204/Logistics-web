var myapp = angular.module('truck', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
myapp.controller('truckCtrl',['$scope', '$http', '$rootScope',function($scope, $http, $rootScope) {
  // $scope.orders={};
  //$scope.availability="Available";
  $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/trucklist/?format=json'})
  .success(function (response) {     
    $scope.trucks = response
    // console.log($scope.trucks);
  })
  .error(function (data, status, headers, config) {
  });

  $scope.toggleAvail = function(index) {
          var avail = $scope.trucks[index];
          // var confirm=avail.truck_id;
          console.log(index);
          console.log(avail.truck_id);
          // avail.truck_status = "Intransit";
          if (avail.truck_status == "InTransit") {
            avail.truck_status = "InGarage";
            // console.log(avail.truck_status);
          }
          else if (avail.truck_status == "InGarage"){
            avail.truck_status = "InTransit";
            // console.log(avail.truck_status);
          }
          
          console.log(avail);
          var data = avail;
          // console.log(data);
          $http.put('http://rahulkumarwp.pythonanywhere.com/logistics_api/api/truckdetail/'+avail.truck_id, data)
              .success(function (data, status, headers, config) {
                  console.log("Response Status 200 OK.");
                  $scope.trucks = data;
                  $scope.reloadPage = function(){window.location.reload();}
                  console.log($scope.trucks);
              })
              .error(function (data, status, header, config) {
                  $scope.ResponseDetails = "Data: " + data +
                      "<hr />status: " + status +
                      "<hr />headers: " + header +
                      "<hr />config: " + config;
                      console.log($scope.truck_status)
          });         
      };
      

}])
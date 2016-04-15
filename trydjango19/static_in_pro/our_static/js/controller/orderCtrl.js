// Order Controller 

//changing syntax due to django dependency error
var myapp = angular.module('orders-list', []).config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
  myapp.controller('orderCtrl', ['$scope', '$http', '$rootScope',function($scope, $http, $rootScope) {
    $scope.orders={};

      $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/orderslist/?format=json'})
      .success(function (response) {
          $scope.orders = response;
          console.log("Response Status 200 OK.");
      })
      .error(function (data, status, headers, config) {
        $scope.subOrd = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
      });

    $scope.func = function(index) {
          var order = $scope.orders[index];
          var confirm=order.order_id;
          //console.log(order.order_id);
          order.order_status = "Confirmed";
          
          // console.log(order);
          var data = order;
          $http.put('http://rahulkumarwp.pythonanywhere.com/logistics_api/api/ordersdetail/'+order.order_id, data)
              .success(function (data, status, headers, config) {
                  $rootScope.orders = data;
                  console.log("Response Status 200 OK.");
              })
              .error(function (data, status, header, config) {
                  $scope.ResponseDetails = "Data: " + data +
                      "<hr />status: " + status +
                      "<hr />headers: " + header +
                      "<hr />config: " + config;
                      // console.log($scope.orders)
              });

          $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/trucklist/?format=json'})
              .success(function (trucks) { 
                console.log("Response Status 200 OK.");
              $scope.trucks = trucks;  
              console.log($scope.trucks);
              var count = trucks.length;
              $scope.min = 1000000;

              for(var i=0; i<count; i++ ){
                //console.log("i = "+i);
                if($scope.trucks[i].truck_capacity<$scope.min){
                  $scope.min = $scope.trucks[i].truck_capacity;
                  if($scope.trucks[i].truck_capacity>=order.quantity){
                    if($scope.trucks[i].truck_status=="InGarage"){
                      $scope.truck_id = $scope.trucks[i].truck_id;
                      //Add a no truck available assertion for this.
                    }
                  }
                }
              //console.log("quantity = "+order.quantity);
              }

              var new_trip = $.param({
                "trip_id" : order.order_id,
                "trip_capacity" : order.quantity,
                "location" : "0,0",
                "status" : "Confirmed",
                "order_id" : order.order_id,
                "truck_id" : $scope.truck_id, 
              });

              //console.log("new_trip = "+new_trip);

              var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
              }

              $http.post('http://rahulkumarwp.pythonanywhere.com/logistics_api/api/triplist/', new_trip , config)
              .success(function (new_trip, status, headers, config) {
                console.log("Response Status 200 OK.");
                  //$scope.subOrd = data;
                  //console.log("new_trip = " + new_trip);
              })
              .error(function (data, status, header, config) {
                  $scope.subOrd = "Data: " + data +
                      "<hr />status: " + status +
                      "<hr />headers: " + header +
                      "<hr />config: " + config;
              });

              $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/driverlist/?format=json'})
                .success(function (drivers) {
                    $scope.drivers = drivers;
                    console.log("Response Status 200 OK.");
                    count = $scope.drivers.length;
                    
                    for(var i=0;i<count;i++){
                      if($scope.drivers[i].truck_id==$scope.truck_id){
                        //console.log("truck_id "+$scope.drivers[i].truck_id);
                        
                        var data = $scope.drivers[i];
                        data.trip_id = order.order_id;
                        console.log($scope.drivers[i]);
                        $http.put('http://rahulkumarwp.pythonanywhere.com/logistics_api/api/driverdetail/'+data.driver_id, data , config)
                          .success(function (data, status, headers, config) {
                            console.log("Response Status 200 OK.");
                          })
                          .error(function (data, status, header, config) {
                              $scope.subOrd = "Data: " + data +
                                  "<hr />status: " + status +
                                  "<hr />headers: " + header +
                                  "<hr />config: " + config;
                              console.log("fuck you!");
                          });
                      }
                    }

                })
               .error(function (data, status, headers, config) {
                 $scope.subOrd = "Data: " + data +
                                "<hr />status: " + status +
                                "<hr />headers: " + header +
                                "<hr />config: " + config;
              });

          })
          .error(function (data, status, headers, config) {
            $scope.subOrd = "Data: " + data +
                      "<hr />status: " + status +
                      "<hr />headers: " + header +
                      "<hr />config: " + config;
          });

      };

      $scope.canc=function(index){
          var order = $scope.orders[index];
          var cancel=order.order_id;
          //console.log(order.order_id);
          order.order_status = "Cancelled";
          
          // console.log(order);
          var data = order;
          $http.put('http://rahulkumarwp.pythonanywhere.com/logistics_api/api/ordersdetail/'+order.order_id, data)
              .success(function (data, status, headers, config) {
                  $rootScope.orders = data;
                  console.log("Response Status 200 OK.");
              })
              .error(function (data, status, header, config) {
                  $scope.ResponseDetails = "Data: " + data +
                      "<hr />status: " + status +
                      "<hr />headers: " + header +
                      "<hr />config: " + config;
                      // console.log($scope.orders)
          });

          $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/tripdetail/'+order.order_id})
            .success(function (response) {
                $scope.trip = response;
                console.log("Response Status 200 OK.");
                //console.log($scope.trip[].status);
                $scope.trip[0].status = "cancelled";
                var data = $scope.trip[0];
                $http.put('http://rahulkumarwp.pythonanywhere.com/logistics_api/api/tripdetail/'+order.order_id, data)
                    .success(function (data, status, headers, config) {
                        $rootScope.orders = data;
                        console.log("Response Status 200 OK.");
                    })
                    .error(function (data, status, header, config) {
                        $scope.ResponseDetails = "Data: " + data +
                            "<hr />status: " + status +
                            "<hr />headers: " + header +
                            "<hr />config: " + config;
                            // console.log($scope.orders)
                });

            })
            .error(function (data, status, headers, config) {
              $scope.subOrd = "Data: " + data +
                              "<hr />status: " + status +
                              "<hr />headers: " + header +
                              "<hr />config: " + config;
            });

          


      };

}]);

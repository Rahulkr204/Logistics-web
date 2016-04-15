var myapp=angular.module('add-driver',[]);
myapp.controller('submitCtrl',['$scope','$http',function($scope,$http){
	$scope.submitOrder = function () {
            $http({withCredentials: false, method: 'GET', url:'http://rahulkumarwp.pythonanywhere.com/logistics_api/api/driverlist/?format=json'})
              .success(function (response) {     
                $scope.drivers = response
                console.log("Response Status 200 OK.");
                console.log($scope.drivers);
                console.log($scope.drivers.length);
                $scope.id=$scope.drivers.length+1;
                var data = $.param({
                driver_id : $scope.id,
                name: $scope.name,
                password: $scope.password,
            });
            
            console.log($scope.id);
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }
            $http.post('http://rahulkumarwp.pythonanywhere.com/logistics_api/api/driverlist/', data, config)
            .success(function (data, status, headers, config) {
                // $scope.subOrd = data;
                //console.log(data);
                console.log("Response Status 200 OK.");
            })
            .error(function (data, status, header, config) {
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
            // console.log($scope.drivers.driver_id);
            // $scope.id = $scope.drivers.length; 
            
        };
}]);
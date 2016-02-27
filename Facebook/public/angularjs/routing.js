/**
 * New node file
 */
var scotchApp = angular.module('facebook', ['ngRoute']);

    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/homepage', {
                templateUrl : 'views/homepagerouting.ejs',
                controller  : 'homepage'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'views/aboutRouting.html',
                controller  : 'homepage'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            });
    });

    scotchApp.controller('homepage', function($scope) {
    	$scope.searchuser = function() {		
    		$http({
    			method : "POST",
    			url : '/redirectToSearch',
    			data : {
    				"search" : $scope.search
    			}
    		}).success(function(data) {
    			
    			if(data.success == 1)
    			{
    				window.location.assign("/showSearch"); 
    			} 
    		}).error(function(error) {
    		});
    	};
    	
    	$http.get('/getStatuses').success(function(data)
    	{
//    		alert(data.results.length);
    		$scope.statuses = data.results;
    		$scope.$apply();
    	});
    	
    	$scope.postStatus = function(req,res)
    	{
//    		alert($scope.currentStatus);
    		$http({
    			method : "POST",
    			url : '/postStatus',
    			data : {
    				"status" : $scope.currentStatus
    			}
    		}).success(function(data) {
    			
    			$scope.statuses = data.results;
    			$scope.currentStatus = null;
    			$scope.$apply();
    			
    		}).error(function(error) {
    			
    			alert("error");
    			
    		});
    	};
    });

    scotchApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    scotchApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });
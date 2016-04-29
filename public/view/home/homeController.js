(function () {
    angular.module('myApps').controller('homeController',homeController);

    homeController.$inject = ['$scope', '$window'];

    function homeController($scope, $window) {

        $("#loader").fadeOut();  

		$scope.heading = "Homef";		
        

    }
})();
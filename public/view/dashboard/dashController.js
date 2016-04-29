(function () {
    angular.module('myApps').controller('dashController',dashController);

    dashController.$inject = ['$scope', '$window'];

    function dashController($scope, $window) {

        $("#loader").fadeOut();  

		$scope.heading = "dash";		
        

    }
})();
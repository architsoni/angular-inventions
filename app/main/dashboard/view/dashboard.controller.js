(function () {
    angular.module('app.dashboard').controller('dashboardController', dashboardController);

    dashboardController.$inject = ['$scope', '$window'];

    function dashboardController($scope, $window) {

        $('#loader').fadeOut();
        $scope.heading = 'dash';
    }
})();

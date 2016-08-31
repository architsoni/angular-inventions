(function () {
    angular.module('app').controller('homeController', homeController);

    homeController.$inject = ['$scope', '$window'];

    function homeController($scope, $window) {

        var vm = this;
        vm.heading = "Home";


        $("#loader").fadeOut();


    }
})();

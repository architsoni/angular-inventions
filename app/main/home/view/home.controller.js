(function () {
    angular.module('app').controller('homeController', homeController);

    homeController.$inject = ['$scope', 'simpleObj'];

    function homeController($scope, simpleObj) {

        var vm = this;
        vm.heading = simpleObj.value;


        $('#loader').fadeOut();


    }
})();

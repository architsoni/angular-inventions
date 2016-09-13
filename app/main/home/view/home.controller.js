(function () {
    angular.module('app').controller('homeController', homeController);

    homeController.$inject = ['$scope', 'simpleObj','toaster'];

    function homeController($scope, simpleObj,toaster) {

        var vm = this;
        vm.heading = simpleObj.value;
        vm.click = clickFunction;

        function clickFunction() {
            toaster.pop('success', 'title', 'text');
        }

        $('#loader').fadeOut();


    }
})();

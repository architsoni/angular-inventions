(function () {
    'use strict';
    angular.module('app.home').controller('homeController', homeController);

    homeController.$inject = ['$timeout', 'simpleObj'];

    function homeController($timeout, simpleObj) {
        /*jshint validthis: true */
        var vm = this;
        vm.heading = simpleObj.value;
        vm.showLoader = true;
        $timeout(function () {
            vm.showLoader = false;
        },1000);

    }
})();

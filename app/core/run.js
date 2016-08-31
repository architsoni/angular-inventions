(function () {
    'use strict';

    angular.module('app').run(run);

    run.$inject = ['$rootScope', '$location', '$cookies'];

    function run($rootScope, $location, $cookies) {
        $rootScope.$on('$routeChangeStart', function (event, next) {

            $("#loader").fadeIn();


        });

    }

})();

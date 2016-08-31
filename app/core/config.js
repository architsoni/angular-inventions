(function () {
    'use strict';

    angular.module('app').config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'app/main/home/view/home.html',
                controller: 'homeController',
                controllerAs: 'vm'
            })
            .when('/login', {
                templateUrl: 'app/main/login/view/login.html',
                controller: 'loginController',
                controllerAs: 'login'
            })
            .otherwise({
                redirectTo: '/home'
            });
        //$locationProvider.html5Mode(true); //For Remove #
    }

})();

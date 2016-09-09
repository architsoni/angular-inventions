(function () {
    'use strict';

    angular.module('app').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'main/home/view/home.html',
                controller: 'homeController as vm',
                resolve: {
                    simpleObj: function () {
                        return {value: 'simple!'};
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'main/login/view/login.html',
                controller: 'loginController as vm'
            });

        //$locationProvider.html5Mode(true); //For Remove #
    }

})();

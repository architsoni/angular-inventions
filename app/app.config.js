(function () {
    'use strict';

    angular.module('app').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider',];

    function config($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home/home.html',
                controller: 'homeController as vm',
                resolve: {
                    simpleObj: function () {
                        return {value: 'simple!'};
                    }
                }
            });

        //$locationProvider.html5Mode(true); //For Remove #

    }

})();
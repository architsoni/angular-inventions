(function () {
    'use strict';

    angular.module('app').config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider','paginationTemplateProvider','yopillz'];

    function config($stateProvider, $urlRouterProvider, paginationTemplateProvider, yopillz) {

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
            })
            .state('dashboard', {
                url: '/dashboard',
                template: '<ui-view></ui-view>',
            })
            .state('dashboard.map', {
                url: '/map',
                templateUrl: 'main/dashboard/map/map.html',
                controller: 'mapController as vm'
            })
            .state('dashboard.pagination', {
                url: '/pagination',
                templateUrl: 'main/dashboard/pagination/pagination.html',
                controller: 'paginationController as vm'
            });

        //$locationProvider.html5Mode(true); //For Remove #


        paginationTemplateProvider.setPath(yopillz.PAGINATION_TEMP);
    }

})();

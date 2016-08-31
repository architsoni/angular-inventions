(function () {
    'use strict';

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

    angular.module('app', [
        'app.dashboard',

        'ngCookies',
        'ngRoute'
    ]);

})();

(function () {
    'use strict';

    angular.module('app').run(run);

    run.$inject = ['$rootScope', '$location', '$cookies'];

    function run($rootScope, $location, $cookies) {

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams, options){
                //event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
            });

        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
            });

    }

})();

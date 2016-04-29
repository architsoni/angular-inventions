(function(){
    angular.module('myApps').directive('appHeader', appHeader);

    function appHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'public/layout/header.html',
           /* scope: {
                max: '='
            },
            link: linkFunc,*/
            controller: ExampleController
            //controllerAs: 'vm',
           // bindToController: true // because the scope is isolated
        };

        return directive;

        /*function linkFunc(scope, el, attr, ctrl) {
            console.log('LINK: scope.min = %s *** should be undefined', scope.min);
            console.log('LINK: scope.max = %s *** should be undefined', scope.max);
            console.log('LINK: scope.vm.min = %s', scope.vm.min);
            console.log('LINK: scope.vm.max = %s', scope.vm.max);
        }*/
    }

    ExampleController.$inject = ['$scope'];

    function ExampleController($scope) {

    }
})();
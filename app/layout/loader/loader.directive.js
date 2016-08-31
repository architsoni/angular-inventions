(function(){
    angular.module('app').directive('appLoader', function() {
        var loader = {
            templateUrl: 'app/layout/loader/loader.html',
            controller: ExampleController,
            controllerAs: 'vm'
        };

        return loader;
    });

    ExampleController.$inject = ['$scope'];

    function ExampleController($scope) {

    }
})();


(function(){
    angular.module('app').directive('appHeader', function() {
        var header = {
            templateUrl: 'app/layout/header/header.html',
            controller: ExampleController,
            controllerAs: 'vm'
        };

        return header;

    });

    ExampleController.$inject = ['$scope'];

    function ExampleController($scope) {

    }
})();

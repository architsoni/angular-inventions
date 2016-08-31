(function(){
    angular.module('app').component('appFooter', function() {
        var footer = {
            templateUrl: 'app/layout/footer/footer.html',
            controller: ExampleController,
            controllerAs: 'vm'
        };

        return footer;
    });

    ExampleController.$inject = ['$scope'];

    function ExampleController($scope) {

    }
})();

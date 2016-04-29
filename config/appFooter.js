(function(){
    angular.module('myApps').directive('appFooter', appFooter);

    function appFooter() {
        var directive = {
            restrict: 'E',
            templateUrl: 'view/layout/footer.html',
            controller: ExampleController
        };

        return directive;
    }

    ExampleController.$inject = ['$scope'];

    function ExampleController($scope) {

    }
})();
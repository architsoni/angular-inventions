(function () {
    angular.module('myApps').controller('loginController',loginController);

    loginController.$inject = ['$scope', '$window', 'dataservice'];

    function loginController($scope, $window, dataservice){
        $("#loader").fadeOut();
        $scope.heading = "ksdalsd lksdj";
        var vm = this;
        vm.heading = "ksdalsd";
        vm.avengers = [];

        //activate();

        function activate() {			
            return getAvengers().then(function() {
                console.log('Activated Avengers View');
            });
        }

        function getAvengers() {
            return dataservice.getAvengers()
                .then(function(data) {
                    vm.avengers = data;
                    return vm.avengers;
                });
        }
    }

})();
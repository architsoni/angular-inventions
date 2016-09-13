(function () {
    angular.module('app.dashboard').controller('mapController', mapController);

    mapController.$inject = ['$scope', 'NgMap','$timeout'];

    function mapController($scope, NgMap, $timeout) {

        var vm = this;

        $('#loader').fadeOut();
        $scope.heading = 'Map';

        NgMap.getMap().then(function(map) {
            vm.map = map;
        });

        vm.stores = {
            foo: { position:[41, -87], items: [1,2,3,4]},
            bar:{ position:[41, -83], items: [5,6,7,8]}
        };

        vm.googleMapsUrl = 'https://maps.google.com/maps/api/js';
        vm.pauseLoading=true;
        console.log('Starting a timer to wait for 2 seconds before the map will start loading');

        $timeout(function() {
            console.debug('Showing the map. The google maps api should load now.');
            vm.pauseLoading=false;
        }, 2000);

        vm.showStore = function(evt, id) {
            vm.store = vm.stores[id];
            vm.map.showInfoWindow('foo', this);
        };

    }
})();

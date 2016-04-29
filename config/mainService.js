(function(){
    angular.module('myApps').factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q'];

    function dataservice($http, $q) {
        return {
            getAvengers: getAvengers
        };

        function getAvengers() {

            //var deferred = $q.defer();

            return $http.get('/api/maa')
                .then(getAvengersComplete)
                .catch(getAvengersFailed);

            function getAvengersComplete(response) {
                return response.data.results;
                //deferred.resolve(response.data.results);
            }

            function getAvengersFailed(error) {
                console.log('XHR Failed for getAvengers.' + error.data);
                //deferred.reject(response);
            }
        }
    }
})();
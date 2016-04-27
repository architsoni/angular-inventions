(function () {
    angular.module('myApps').directive('appCarousel', appCarousel);

    function appCarousel() {
        var directive = {
            restrict: 'E',
            template: '<div id="sponsors" class="owl-carousel"></div>',
            replace: true,
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, element, attrs) {
            scope.mainData = scope.$eval(attrs.carouselData);
            console.log("carousel data : " + JSON.stringify(scope.mainData));
            angular.forEach(scope.mainData, function (value, key) {
                $(element).append('<div class="item"><h4>' + value + '</h4></div>');
            });
            $(element).owlCarousel(scope.$eval(attrs.carouselControl));
        }
    }
})();
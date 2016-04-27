angular.module("fraction-slider",[]).directive('fractionSlider', function () {
    return {
        restrict: 'E',
        template: '<div class="slider responisve-container"></div>',
        replace: true,
        link: function (scope, element, attrs) {
            scope.mainData = scope.$eval(attrs.sliderData);
            //console.log("slider data : "+JSON.stringify(scope.mainData));
            angular.forEach(scope.mainData, function (slider, key) {
                $(element).append('<div class="slide ' + slider.name + '"></div>');
                angular.forEach(slider.data, function (value, key) {
                    if (value.src) {
                        $("." + slider.name).append('<img src="' + value.src + '" width="' + value.width + '" height="' + value.height + '" data-position="' + value.position + '" data-in="' + value.in + '" data-delay="' + value.delay + '" data-easeIn="' + value.easeIn + '" data-out="' + value.out + '">');
                    } else {
                        $("." + slider.name).append('<p class="' + value.class + '" data-position="' + value.position + '" data-in="' + value.in + '" data-step="' + value.step + '" data-out="' + value.out + '" data-special="' + value.special + '" data-delay="' + value.delay + '" data-ease-in="' + value.easeIn + '">' + value.text + '</p>');
                    }
                });
            });
            $(element).fractionSlider(scope.$eval(attrs.sliderControl));

        }
    }
});


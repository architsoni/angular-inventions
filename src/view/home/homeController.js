(function () {
    angular.module('myApps').controller('homeController',homeController);

    homeController.$inject = ['$scope', '$window'];

    function homeController($scope, $window) {

        $("#loader").fadeOut();

        $scope.carouselControl = {
            loop: true,
            margin: 10,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        };
        $("#loader").fadeOut();

        $scope.carouselData = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

        $scope.heading = "Landing Page...";

        $scope.sliderData = [{
            "name": "slide1",
            "data": [{
                "src": "src/assets/images/01_box_top.png",
                "width": "361",
                "height": "354",
                "position": "-152,142",
                "in": "left",
                "out": "right",
                "delay": "200",
                "easeIn": "",
                "special": ""
            }, {
                "src": "src/assets/images/01_box_bottom.png",
                "width": "422",
                "height": "454",
                "position": "138,-152",
                "in": "bottomRight",
                "out": "",
                "delay": "200",
                "easeIn": "",
                "special": ""
            }, {
                "src": "src/assets/images/01_waves.png",
                "width": "1449",
                "height": "115",
                "position": "240,17",
                "in": "left",
                "out": "left",
                "delay": "200",
                "easeIn": "",
                "special": ""
            }, {
                "text": "jQuery Fraction Slider",
                "class": "claim light-green",
                "position": "30,30",
                "step": "1",
                "in": "top",
                "out": "top",
                "delay": "",
                "easeIn": "easeOutBounce",
                "special": ""
            }, {
                "text": "animate multiple elements",
                "class": "teaser orange",
                "position": "90,30",
                "step": "2",
                "in": "left",
                "out": "",
                "delay": "500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "control over each element",
                "class": "teaser green",
                "position": "90,30",
                "step": "2",
                "in": "left",
                "out": "",
                "delay": "3000",
                "easeIn": "",
                "special": "cycle"
            }, {
                "text": "opensource and free",
                "class": "teaser turky",
                "position": "90,30",
                "step": "2",
                "in": "left",
                "out": "none",
                "delay": "5500",
                "easeIn": "",
                "special": "cycle"
            }, {
                "src": "src/assets/images/01_outofthebox.png",
                "width": "",
                "height": "",
                "position": "20,330",
                "in": "bottomLeft",
                "out": "fade",
                "delay": "500",
                "easeIn": "",
                "special": ""
            }]
        }, {
            "name": "slide2",
            "data": [{
                "src": "src/assets/images/02_big_boxes.png",
                "width": "",
                "height": "",
                "position": "25,445",
                "in": "fade",
                "out": "right",
                "delay": "0",
                "easeIn": "",
                "special": ""
            }, {
                "src": "src/assets/images/02_small_boxes.png",
                "width": "",
                "height": "",
                "position": "80,220",
                "in": "fade",
                "out": "bottomRight",
                "delay": "500",
                "easeIn": "",
                "special": ""
            }, {
                "src": "src/assets/images/01_box_bottom.png",
                "width": "",
                "height": "",
                "position": "138,-152",
                "in": "bottomRight",
                "out": "bottomRight",
                "delay": "200",
                "easeIn": "",
                "special": ""
            }, {
                "text": "What to expect",
                "class": "claim light-green small",
                "position": "30,30",
                "step": "1",
                "in": "top",
                "out": "top",
                "delay": "",
                "easeIn": "",
                "special": ""
            }, {
                "text": "unlimited elements",
                "class": "teaser turky small",
                "position": "90,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "many transitions",
                "class": "teaser turky small",
                "position": "125,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "1500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "unlimited slides",
                "class": "teaser turky small",
                "position": "160,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "2500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "background animation",
                "class": "teaser turky small",
                "position": "195,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "3500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "easy to use",
                "class": "teaser turky small",
                "position": "230,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "4500",
                "easeIn": "",
                "special": ""
            }, {
                "src": "src/assets/images/01_waves.png",
                "width": "1449",
                "height": "115",
                "position": "240,200",
                "in": "right",
                "out": "",
                "delay": "500",
                "step": "2",
                "easeIn": "easeOutCirc",
                "special": ""
            }, {
                "src": "src/assets/images/02_main.png",
                "width": "",
                "height": "",
                "position": "105,180",
                "in": "fade",
                "out": "bottomRight",
                "delay": "500",
                "step": "2",
                "easeIn": "",
                "special": ""
            }]
        }, {
            "name": "slide3",
            "data": [{
                "src": "src/assets/images/02_big_boxes.png",
                "width": "",
                "height": "",
                "position": "25,445",
                "in": "fade",
                "out": "right",
                "delay": "0",
                "easeIn": "",
                "special": ""
            }, {
                "src": "src/assets/images/02_small_boxes.png",
                "width": "",
                "height": "",
                "position": "80,220",
                "in": "fade",
                "out": "bottomRight",
                "delay": "500",
                "easeIn": "",
                "special": ""
            }, {
                "src": "src/assets/images/01_box_bottom.png",
                "width": "",
                "height": "",
                "position": "138,-152",
                "in": "bottomRight",
                "out": "bottomRight",
                "delay": "200",
                "easeIn": "",
                "special": ""
            }, {
                "text": "What to expect",
                "class": "claim light-green small",
                "position": "30,30",
                "step": "1",
                "in": "top",
                "out": "top",
                "delay": "",
                "easeIn": "",
                "special": ""
            }, {
                "text": "unlimited elements",
                "class": "teaser turky small",
                "position": "90,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "many transitions",
                "class": "teaser turky small",
                "position": "125,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "1500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "unlimited slides",
                "class": "teaser turky small",
                "position": "160,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "2500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "background animation",
                "class": "teaser turky small",
                "position": "195,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "3500",
                "easeIn": "",
                "special": ""
            }, {
                "text": "easy to use",
                "class": "teaser turky small",
                "position": "230,30",
                "step": "2",
                "in": "bottom",
                "out": "",
                "delay": "4500",
                "easeIn": "",
                "special": ""
            }]
        }];

        $scope.sliderControl = {
            'fullWidth': true,
            'controls': false,
            'pager': true,
            'responsive': true,
            'dimensions': "1000,400",
            'increase': false,
            'pauseOnHover': true
        };

        $scope.serviceData = {
            h1: "Great Services",
            span: "tristique senectus malesuada ",
            data: [{
                class: "item-service border-right",
                icon: "fa fa-star",
                h4: "High Quality",
                h5: "tristique senectus malesuada",
                p: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Vestibulum tortor quam."
            }, {
                class: "item-service border-right",
                icon: "fa fa-fire",
                h4: "Ultra Hot Design",
                h5: "tristique senectus malesuada",
                p: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Vestibulum tortor quam."
            }, {
                class: "item-service padding-right-15",
                icon: "fa fa-cogs",
                h4: "Free Updates and Support",
                h5: "tristique senectus malesuada",
                p: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Vestibulum tortor quam."
            }, {
                class: "item-service border-right",
                icon: "fa fa-thumbs-up",
                h4: "24/7 Support",
                h5: "tristique senectus malesuada",
                p: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Vestibulum tortor quam."
            }, {
                class: "item-service border-right",
                icon: "fa fa-plane",
                h4: "Flexible Solutions",
                h5: "tristique senectus malesuada",
                p: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Vestibulum tortor quam."
            }, {
                class: "item-service padding-right-15",
                icon: "fa fa-pencil",
                h4: "Original Design",
                h5: "tristique senectus malesuada",
                p: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.Vestibulum tortor quam."
            }]
        };


        $scope.boxInfo = [{
            h3: "BUSINNESS",
            icon: "fa fa-thumbs-up",
            h5: "THIS IS AN EXAMPLE OF BOX SUBTITLE",
            p: "Pellentesque habitant morbi senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam."
        }, {
            h3: "CORPORATE",
            icon: "fa fa-star",
            h5: "THIS IS AN EXAMPLE OF BOX SUBTITLE",
            p: "Pellentesque habitant morbi senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam."
        }, {
            h3: "CREATIVE",
            icon: "fa fa-apple",
            h5: "THIS IS AN EXAMPLE OF BOX SUBTITLE",
            p: "Pellentesque habitant morbi senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam."
        }, {
            h3: "UNIQUE",
            icon: "fa fa-android",
            h5: "THIS IS AN EXAMPLE OF BOX SUBTITLE",
            p: "Pellentesque habitant morbi senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam."
        }];


    }
})();
(function(){
    angular.module('myApps').directive('appHeader', appHeader);

    function appHeader() {
        var directive = {
            restrict: 'E',
            templateUrl: 'src/layout/header.html',
           /* scope: {
                max: '='
            },
            link: linkFunc,*/
            controller: ExampleController
            //controllerAs: 'vm',
           // bindToController: true // because the scope is isolated
        };

        return directive;

        /*function linkFunc(scope, el, attr, ctrl) {
            console.log('LINK: scope.min = %s *** should be undefined', scope.min);
            console.log('LINK: scope.max = %s *** should be undefined', scope.max);
            console.log('LINK: scope.vm.min = %s', scope.vm.min);
            console.log('LINK: scope.vm.max = %s', scope.vm.max);
        }*/
    }

    ExampleController.$inject = ['$scope'];

    function ExampleController($scope) {
        $(window).scroll(function () {
            var sticky = $('#sticky-wrapper'),
                scroll = $(window).scrollTop();

            if (scroll >= 100) {
                if (sticky.hasClass('animated')) {
                    sticky.removeClass('animated slideInUp');
                }
                $("#menuBar").removeClass('animated fadeInUp');
                sticky.addClass('fixed animated slideInDown');
            } else {
                sticky.removeClass('fixed animated slideInDown');
                $("#menuBar").addClass('animated fadeInUp');
            }
        });

        $("#menuResponsive").click(function(){
            if($(".header-menu").css('display') === 'none'){
                $(".header-menu").css('display', 'block');
                $(".header-menu").removeClass('animated flipUp');
                $(".header-menu").addClass('animated flipDown');
            }else{
                $(".header-menu").css('display', 'none');
            }
            //$(".header-menu").css('display') === 'none' ? $(".header-menu").css('display', 'block') : $(".header-menu").css('display', 'none')
        });

        $(document).click(function(e){
            var clicked = e.target.className;
            console.log(clicked);
            /* if(clicked != 'fa fa-bars fa-2x' && clicked != 'header-menu' && $(".header-menu").css('display') !== 'none'){
             $(".header-menu").css('display', 'none');
             }*/
            //$(".header-menu").css('display') === 'none' ? $(".header-menu").css('display', 'none') : $(".header-menu").css('display', 'none')
        });

        $scope.shortHeader = false;

        $scope.shortActivityHeader = [{
            fa: "fa fa-check-square",
            h5: "Login or create new account.",
            p: "Pellentesque habitant morbi fames ac turpis egestas. Vestibulum tortor quam. Pellentesque habitant"
        }, {
            fa: "fa fa-star",
            h5: "Review your order.",
            p: "Pellentesque habitant morbi fames ac turpis egestas. Vestibulum tortor quam Pellentesque habitant."
        }, {
            fa: "fa fa-credit-card",
            h5: "Payment And FREE shipment.",
            p: "Pellentesque habitant morbi fames ac turpis egestas. Vestibulum tortor quam. Pellentesque habitant"
        }];

        $scope.menubar = [{
            link: "#/home",
            label: "HOME",
            sub: [{
                link: "#/home",
                label: "Home Corporate",
            }, {
                link: "#/home",
                label: "Home Agency",
            }, {
                link: "#/home",
                label: "Home Business",
            }, {
                link: "#/home",
                label: "Home Creative",
            }, {
                link: "#/home",
                label: "Home Alternative",
            }, {
                link: "#/home",
                label: "Home One Page",
            }]
        }, {
            link: "#/home",
            label: "ABOUT",
            sub: [{
                link: "#/home",
                label: "Home Corporate",
            }, {
                link: "#/home",
                label: "Home Agency",
            }, {
                link: "#/home",
                label: "Home Business",
            }, {
                link: "#/home",
                label: "Home Creative",
            }, {
                link: "#/home",
                label: "Home Alternative",
            }, {
                link: "#/home",
                label: "Home One Page",
            }]
        }, {
            link: "#/home",
            label: "SERVICES",
            sub: [{
                link: "#/home",
                label: "Home Corporate",
            }, {
                link: "#/home",
                label: "Home Agency",
            }, {
                link: "#/home",
                label: "Home Business",
            }, {
                link: "#/home",
                label: "Home Creative",
            }, {
                link: "#/home",
                label: "Home Alternative",
            }, {
                link: "#/home",
                label: "Home One Page",
            }]
        }, {
            link: "#/home",
            label: "CONTACT"
        }];

    }
})();
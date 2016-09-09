(function () {
    'use strict';

    angular.module('app').constant('constantForDynamicChange', {
        ORDER_CREATED: 'event_order_created',
        INVENTORY_DEPLETED: 'event_inventory_depleted'
    });

})();

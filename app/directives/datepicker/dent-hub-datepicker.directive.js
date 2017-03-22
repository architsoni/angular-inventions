angular
    .module('app')
    .directive('dentHubDatePicker', dentHubDatePicker);

function dentHubDatePicker() {
    var directive = {
        link: linkFunction,
    };
    return directive;

    function linkFunction(scope, element, attrs) {
        $(element).datetimepicker({
            format: 'DD/MM/YYYY'
        });
    }
}

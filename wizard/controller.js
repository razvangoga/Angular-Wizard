'use strict';

var app = angular.module('wizardApp', ['summernote', 'googlechart', 'toastr'])
    .value('googleChartApiConfig', {
        version: '1',
        optionalSettings: {
            packages: ['gantt']
        },
        useGstaticLoader: true,
        gstaticLoaderVersion: 'current'
    });

app.directive(convertToNumberDirective.name, convertToNumberDirective.directive);
app.directive(isolatedFormDirective.name, isolatedFormDirective.directive);

//wizard diretive
app.directive(rgWizardDirective.name, rgWizardDirective.directive);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
}]);

app.controller('wizardController', function ($scope, $http, $attrs, $timeout, $interval, toastr) {
    $scope.model = {};
    $scope.options = summernoteConfigurator().defaults;

    $http.get('/load').then(
        function (response) {
            $scope.model = response.data;
        },
        function () {
            console.error(arguments);
        }
    );
});
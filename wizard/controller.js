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

//wizard directives
app.directive(rgWizardDirective.name, rgWizardDirective.directive);
app.directive(rgWizardStepDirective.name, rgWizardStepDirective.directive);

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

    this.addHobby = function () {
        $scope.model.hobbys.push('');
    };

    this.deleteHobby = function (index) {
        $scope.model.hobbys.splice(index, 1);
    };
});
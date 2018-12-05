'use strict';

//RG 11 Oct 2018 - force the disable of the summernote helpDialog 
//  rendered but never displayed due to the custom summernote configs
$.summernote.options.modules.helpDialog = function(context) {};

var app = angular.module('wizardApp', ['summernote', 'googlechart', 'toastr'])
    .value('googleChartApiConfig', {
        version: '1',
        optionalSettings: {
            packages: ['gantt']
        },
        useGstaticLoader: true,
        gstaticLoaderVersion: 'current'
    });

//other directives
app.directive(convertToNumberDirective.name, convertToNumberDirective.directive);
app.directive(isolatedFormDirective.name, isolatedFormDirective.directive);

//wizard directives
app.directive(rgWizardDirective.name, rgWizardDirective.directive);
app.directive(rgWizardStepDirective.name, rgWizardStepDirective.directive);

//wizard components
// app.component(rgWizardComponent.name, rgWizardComponent.component);
// app.component(rgWizardStepComponent.name, rgWizardStepComponent.component);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    $httpProvider.defaults.headers.common["Content-Type"] = 'application/json';
}]);

app.controller('wizardController', function ($scope, $http, $attrs, $timeout, $interval, $log, $q, toastr) {
    $scope.model = {};
    $scope.options = summernoteConfigurator().defaults;

    $http.get('/load').then(
        function (response) {
            $scope.model = response.data;
        },
        function () {
            $log.error(arguments);
        }
    );

    this.addHobby = function () {
        $scope.model.hobbys.push({ name: '' });
    };

    this.deleteHobby = function (index) {
        $scope.model.hobbys.splice(index, 1);
    };

    this.save1 = function () {
        return this.save('save 1', '/save');
    };

    this.save2 = function () {
        return this.save('save 2', '/fail');
    };

    this.save = function (saveName, method) {
        $log.info(saveName, method);

        var deferred = $q.defer();

        $http.post(method, $scope.model).then(
            function (response) {
                $log.info(response);
                toastr.info('Saving your changes', saveName);

                return deferred.resolve(true);
            },
            function () {
                $log.error(arguments);
                toastr.error('There as a problem loading the submission form.', 'Error', { "timeOut": 0, "extendedTimeOut": 0 });

                deferred.reject(arguments);
            }
        );

        return deferred.promise;
    };
});
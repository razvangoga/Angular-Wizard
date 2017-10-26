'use strict';

var rgWizardStepDirective = {
    name: 'rgWizardStep',
    directive: function ($rootScope, $log) {
        return {
            restrict: 'E',
            require: '^rgWizard',
            transclude: true,
            replace: true,
            scope: {
                toWatch: '@',
                setFormDirtyOn: '@',
                onEnterCallback: '&',
                onLeaveCallback: '&'
            },
            templateUrl: '/wizard/rg-wizard-step-template.html',
            link: function (scope, elem, attrs) {
                scope.name = attrs.stepName;
                scope.stepFormName = scope.name.replace(/[\s|\W]/g, '') + 'StepForm';
                scope.visible = false;
                this.isLastStep = !angular.isUndefined(attrs.lastStep);

                scope.getStepForm = function () {
                    return scope[scope.stepFormName];
                };

                scope.setVisible = function (visible) {
                    scope.visible = visible;
                };

                scope.onEnterStep = function () {
                    var stepForm = scope.getStepForm();

                    if (!angular.isUndefined(stepForm))
                        scope.$parent.setCanChangeStep(stepForm.$valid);

                    if (!angular.isUndefined(scope.onEnterCallback))
                        scope.onEnterCallback();
                };

                scope.onLeaveStep = function () {

                    if (!angular.isUndefined(scope.onLeaveCallback))
                        scope.onLeaveCallback();

                    scope.getStepForm().$setPristine();
                    scope.$parent.setFormIsDirty(false);
                };

                scope.$parent.registerStep({
                    name: scope.name,
                    isLastStep: this.isLastStep,
                    onEnterStep: scope.onEnterStep,
                    onLeaveStep: scope.onLeaveStep,
                    setVisible: scope.setVisible
                });

                scope.$watch(scope.stepFormName + '.$valid', function (newVal, oldVal) {
                    if (scope.visible)
                        scope.$parent.setCanChangeStep(newVal);
                });

                scope.$watch(scope.stepFormName + '.$dirty', function (newVal, oldVal) {
                    if (scope.visible)
                        scope.$parent.setFormIsDirty(newVal);
                });

                if (!angular.isUndefined(scope.toWatch)) {
                    var watchExpression = '$parent.$parent.' + scope.toWatch;
                    scope.$watchCollection(watchExpression, function (newVal, oldVal) {
                        if (scope.visible)
                            scope.$parent.setFormIsDirty(true);
                    });
                }

                if (!angular.isUndefined(scope.setFormDirtyOn))
                    $rootScope.$on(scope.setFormDirtyOn, function () {
                        if (scope.visible)
                            scope.$parent.setFormIsDirty(true);
                    });
            }
        };
    }
};
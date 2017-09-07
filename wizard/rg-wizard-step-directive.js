'use strict';

var rgWizardStepDirective = {
    name: 'rgWizardStep',
    directive: function ($log) {
        return {
            restrict: 'E',
            require: '^rgWizard',
            transclude: true,
            replace: true,
            scope: {
                onLeaveCallback: '&',
                model: '=',
            },
            templateUrl: '/wizard/rg-wizard-step-directive-template.html',
            link: function (scope, elem, attrs) {
                scope.name = attrs.stepName;
                scope.stepFormName = scope.name.replace(' ', '') + 'StepForm';

                scope.canShow = function () {
                    var show = scope.name === scope.$parent.currentStepName;
                    return show;
                };

                scope.onEnterStep = function() {
                    if (!scope.canShow())
                        return true;

                    var stepForm = scope.getStepForm();

                    if(!angular.isUndefined(stepForm))
                        scope.$parent.setCanChangeStep(stepForm.$valid);
                };

                scope.onLeaveStep = function () {
                    scope.onLeaveCallback()
                    scope.getStepForm().$setPristine();
                    scope.$parent.setFormIsDirty(false);
                };

                scope.$watch(scope.stepFormName + '.$valid', function (newVal, oldVal) {
                    if (!scope.canShow())
                        return true;

                    scope.$parent.setCanChangeStep(newVal);
                });

                scope.$watch(scope.stepFormName + '.$dirty', function (newVal, oldVal) {
                    if (!scope.canShow())
                        return true;

                    scope.$parent.setFormIsDirty(newVal);
                });

                scope.getStepForm = function() {
                    return scope[scope.stepFormName];
                };

                scope.$parent.registerStep({
                    name : scope.name, 
                    onEnterStep : scope.onEnterStep,
                    onLeaveStep : scope.onLeaveStep
                });
            }
        };
    }
};
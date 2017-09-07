var rgWizardStepDirective = {
    name: 'rgWizardStep',
    directive: function ($log) {
        return {
            restrict: 'E',
            require: '^rgWizard',
            transclude: true,
            replace: true,
            scope: {
                onLeaveDefferedCallback: '&',
                model: '=',
            },
            templateUrl: '/wizard/rg-wizard-step-directive-template.html',
            link: function (scope, elem, attrs) {
                scope.name = attrs.stepName;
                scope.stepFormName = scope.name.replace(' ', '') + 'StepForm';

                scope.canShow = function () {
                    var show = scope.name === scope.$parent.currentStep;
                    return show;
                };

                scope.onLeaveStep = function () {
                    scope.onLeaveDefferedCallback()
                    eval('scope.' + scope.stepFormName + '.$setPristine()');
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

                scope.$parent.registerStep(scope.name, scope.onLeaveStep);
            }
        };
    }
};
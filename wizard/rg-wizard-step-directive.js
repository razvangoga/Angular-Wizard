var rgWizardStepDirective = {
    name: 'rgWizardStep',
    directive: function ($timeout) {
        return {
            restrict: 'E',
            require: '^rgWizard',
            transclude: true,
            replace: true,
            scope: {
                model: '='
            },
            templateUrl: '/wizard/rg-wizard-step-directive-template.html',
            link: function (scope, elem, attrs) {
                scope.name = attrs.stepName;
                scope.stepFormName = scope.name.replace(' ', '') + 'StepForm';

                scope.$parent.registerStep(scope.name);

                scope.canShow = function () {
                    var show = scope.name === scope.$parent.currentStep;
                    return show;
                }

                scope.$watch(scope.stepFormName + '.$valid', function (newVal, oldVal) {
                    if (!scope.canShow())
                        return true;

                    console.info(scope.stepFormName + ' ' + newVal);
                    scope.$parent.setCanChangeStep(newVal);
                });
            }
        };
    }
};
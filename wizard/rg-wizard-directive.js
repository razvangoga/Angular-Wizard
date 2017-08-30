var rgWizardDirective = {
    name: 'rgWizard',
    directive: function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/wizard/rg-wizard-directive-template.html',
            controller: function () {
                return {
                }
            },
            link: function (scope, elem, attrs) {
                scope.wizardName = attrs.wizardName;

                scope.steps = [];

                var setCurrentStep = function (index) {
                    scope.currentStepIndex = index;
                    scope.currentStep = scope.steps[index];
                };

                scope.registerStep = function(stepName) {
                    scope.steps.push(stepName);
                    setCurrentStep(0);
                };

                scope.onMovePrevious = function () {
                    if (scope.currentStepIndex === 0)
                        return;

                    setCurrentStep(scope.currentStepIndex - 1);
                };

                scope.onMoveNext = function () {
                    if (scope.currentStepIndex === scope.steps.length - 1)
                        return;

                    setCurrentStep(scope.currentStepIndex + 1);
                };
            }
        };
    }
};
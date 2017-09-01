var rgWizardDirective = {
    name: 'rgWizard',
    directive: function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/wizard/rg-wizard-directive-template.html',
            controller: function () {
                return {}
            },
            link: function (scope, elem, attrs) {
                scope.wizardName = attrs.wizardName;
                scope.wizardDescription = attrs.wizardDescription;
                scope.unableToChangeStageDescription = attrs.unableToChangeStageDescription;

                scope.canChangeStep = true;

                scope.steps = [];

                var setCurrentStep = function (index) {
                    scope.currentStepIndex = index;
                    scope.currentStep = scope.steps[index];
                };

                scope.registerStep = function (stepName) {
                    scope.steps.push(stepName);
                    setCurrentStep(0);
                };

                scope.setCanChangeStep = function(show) {
                    scope.canChangeStep = show;
                };

                scope.onMovePrevious = function () {
                    if (scope.currentStepIndex === 0)
                        return;

                    setCurrentStep(scope.currentStepIndex - 1);
                };

                scope.onStepChanged = function () {
                    setCurrentStep(scope.steps.indexOf(scope.currentStep));
                };

                scope.onMoveNext = function () {
                    if (scope.currentStepIndex === scope.steps.length - 1)
                        return;

                    setCurrentStep(scope.currentStepIndex + 1);
                };

                elem.find('.popovers').popover();
            }
        };
    }
};
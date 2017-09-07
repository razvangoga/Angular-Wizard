var rgWizardDirective = {
    name: 'rgWizard',
    directive: function ($log) {
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

                scope.stepFormOkDescription = attrs.stepFormOkDescription;
                scope.stepFormUnsavedChangesDescription = attrs.stepFormUnsavedChangesDescription;
                scope.stepFormErrorsDescription = attrs.stepFormErrorsDescription;

                scope.canChangeStep = true;
                scope.formIsDirty = false;

                scope.steps = [];
                scope.stepLeaveCallbacks = [];

                var setCurrentStep = function (index, invokeStepLeaveCallback = true) {

                    if (invokeStepLeaveCallback && scope.formIsDirty) {
                        var onStepLeaveCallback = scope.stepLeaveCallbacks[scope.currentStepIndex];
                        onStepLeaveCallback();
                    }

                    if (index < scope.currentStepIndex && scope.currentStepIndex === 0)
                        return;

                    if (index > scope.currentStepIndex && scope.currentStepIndex === scope.steps.length - 1)
                        return;

                    scope.currentStepIndex = index;
                    scope.currentStep = scope.steps[index];
                };

                scope.registerStep = function (stepName, onLeaveCallback) {
                    scope.steps.push(stepName);
                    scope.stepLeaveCallbacks.push(onLeaveCallback);
                    setCurrentStep(0, false);
                };

                scope.setCanChangeStep = function (show) {
                    scope.canChangeStep = show;
                };

                scope.setFormIsDirty = function (isDirty) {
                    scope.formIsDirty = isDirty;
                };

                scope.onMovePrevious = function () {
                    setCurrentStep(scope.currentStepIndex - 1);
                };

                scope.onStepChanged = function () {
                    setCurrentStep(scope.steps.indexOf(scope.currentStep));
                };

                scope.onMoveNext = function () {
                    setCurrentStep(scope.currentStepIndex + 1);
                };

                elem.find('.popovers').popover();
            }
        };
    }
};
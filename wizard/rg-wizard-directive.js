'use strict';

var rgWizardDirective = {
    name: 'rgWizard',
    directive: function ($log) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: '/wizard/rg-wizard-template.html',
            controller: function () {
                return {}
            },
            link: function (scope, elem, attrs) {
                scope.wizardName = attrs.wizardName;
                scope.wizardDescription = attrs.wizardDescription;

                scope.stepFormOkDescription = attrs.stepFormOkDescription;
                scope.stepFormUnsavedChangesDescription = attrs.stepFormUnsavedChangesDescription;
                scope.stepFormErrorsDescription = attrs.stepFormErrorsDescription;

                scope.customStepHeaderClass = attrs.customStepHeaderClass;

                scope.canChangeStep = true;
                scope.formIsDirty = false;

                scope.steps = [];
                scope.currentStepIndex = 0;
                scope.currentStepName = '';

                var setCurrentStep = function (index, invokeStepLeaveCallback = true, invokeStepEnterCallback = true) {

                    if (index < scope.currentStepIndex && scope.currentStepIndex === 0)
                        return;

                    if (index > scope.currentStepIndex && scope.currentStepIndex === scope.steps.length - 1)
                        return;

                    if (invokeStepLeaveCallback && scope.formIsDirty)
                        scope.steps[scope.currentStepIndex].onLeaveStep();

                    if (scope.currentStepName !== '')
                        scope.steps[scope.currentStepIndex].setVisible(false);

                    scope.currentStepIndex = index;
                    scope.currentStepName = scope.steps[index].name;

                    if (invokeStepEnterCallback)
                        scope.steps[scope.currentStepIndex].onEnterStep();

                    scope.steps[scope.currentStepIndex].setVisible(true);
                };

                scope.registerStep = function (step) {
                    scope.steps.push(step);
                    setCurrentStep(0, false, false);
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
                    for (var i = 0; i < scope.steps.length; i++) {
                        if (scope.steps[i].name === scope.currentStepName) {
                            setCurrentStep(i);
                            break;
                        }
                    }
                };

                scope.onMoveNext = function () {
                    setCurrentStep(scope.currentStepIndex + 1);
                };

                elem.find('.popovers').popover();
            }
        };
    }
};
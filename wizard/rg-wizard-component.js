'use strict';

var rgWizardComponent = {
    name: 'rgWizard',
    component: {
        templateUrl: '/wizard/rg-wizard-template.html',
        transclude: true,
        controller: function ($scope, $element, $attrs) {
            $scope.wizardName = $attrs.wizardName;
            $scope.wizardDescription = $attrs.wizardDescription;

            $scope.stepFormOkDescription = $attrs.stepFormOkDescription;
            $scope.stepFormUnsavedChangesDescription = $attrs.stepFormUnsavedChangesDescription;
            $scope.stepFormErrorsDescription = $attrs.stepFormErrorsDescription;

            this.customStepHeaderClass = $attrs.customStepHeaderClass;

            $scope.canChangeStep = true;
            $scope.formIsDirty = false;

            $scope.steps = [];
            $scope.currentStepIndex = 0;
            $scope.currentStepName = '';

            $scope.areAllStepsLoaded = false;

            var setCurrentStep = function (index, invokeStepLeaveCallback, triggerOnEnterStep) {

                if (angular.isUndefined(invokeStepLeaveCallback))
                    invokeStepLeaveCallback = true;

                if (angular.isUndefined(invokeStepEnterCallback))
                    invokeStepEnterCallback = true;

                if (index < $scope.currentStepIndex && $scope.currentStepIndex === 0)
                    return;

                if (index > $scope.currentStepIndex && $scope.currentStepIndex === $scope.steps.length - 1)
                    return;

                if (invokeStepLeaveCallback && $scope.formIsDirty)
                    $scope.steps[$scope.currentStepIndex].onLeaveStep();

                if ($scope.currentStepName !== '')
                    $scope.steps[$scope.currentStepIndex].setVisible(false);

                $scope.currentStepIndex = index;
                $scope.currentStepName = $scope.steps[index].name;

                if (triggerOnEnterStep)
                    $scope.steps[$scope.currentStepIndex].onEnterStep();

                $scope.steps[$scope.currentStepIndex].setVisible(true);
            };

            this.registerStep = function (step) {
                $scope.steps.push(step);

                if (step.isLastStep) {
                    setCurrentStep(0, false, false);
                    $scope.areAllStepsLoaded = true;
                }
            };

            this.setCanChangeStep = function (show) {
                $scope.canChangeStep = show;
            };

            this.setFormIsDirty = function (isDirty) {
                $scope.formIsDirty = isDirty;
            };

            $scope.onMovePrevious = function () {
                setCurrentStep($scope.currentStepIndex - 1);
            };

            $scope.onStepChanged = function () {
                for (var i = 0; i < $scope.steps.length; i++) {
                    if ($scope.steps[i].name === $scope.currentStepName) {
                        setCurrentStep(i);
                        break;
                    }
                }
            };

            $scope.onMoveNext = function () {
                setCurrentStep($scope.currentStepIndex + 1);
            };

            $element.find('.popovers').popover();
        }
    },
};
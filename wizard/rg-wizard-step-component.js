'use strict';

var rgWizardStepComponent = {
    name: 'rgWizardStep',
    component: {
        require: {
            parent: '^rgWizard'
        },
        transclude: true,
        bindings: {
            onLeaveCallback: '&'
        },
        controller: function ($scope, $element, $attrs, $log) {
            $scope.name = $attrs.stepName;
            $scope.stepFormName = $scope.name.replace(/[\s|\W]/g, '') + 'StepForm';
            $scope.visible = false;
            this.isLastStep = !angular.isUndefined($attrs.lastStep);

            this.$onInit = function () {
                var parent = this.parent

                parent.registerStep({
                    name: $scope.name,
                    isLastStep: this.isLastStep,
                    onEnterStep: $scope.onEnterStep,
                    onLeaveStep: $scope.onLeaveStep,
                    setVisible: $scope.setVisible
                });

                $scope.$watch($scope.stepFormName + '.$valid', function (newVal, oldVal) {
                    parent.setCanChangeStep(newVal);
                });

                $scope.$watch($scope.stepFormName + '.$dirty', function (newVal, oldVal) {
                    parent.setFormIsDirty(newVal);
                });
            }

            $scope.setVisible = function (visible) {
                $scope.visible = visible;
                $log.info($scope);
            };

            $scope.onEnterStep = function () {
                var stepForm = $scope.getStepForm();

                if (!angular.isUndefined(stepForm))
                    this.parent.setCanChangeStep(stepForm.$valid);
            };

            $scope.onLeaveStep = function () {
                $scope.onLeaveCallback();
                $scope.getStepForm().$setPristine();
                this.parent.setFormIsDirty(false);
            };

            $scope.getStepForm = function () {
                return $scope[$scope.stepFormName];
            };
        }
    },
};
'use strict';

var rgWizardStepDirective = {
    name: 'rgWizardStep',
    component: {
        require: {
            parent: '^rgWizard'
        },
        transclude: true,
        bindings: {
            onLeaveCallback: '&',
            model: '=',
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
    directive: function ($log) {
        return {
            restrict: 'E',
            require: '^rgWizard',
            transclude: true,
            replace: true,
            scope: {
                setFormDirtyOn: '@',
                onEnterCallback: '&',
                onLeaveCallback: '&',
                model: '=',
            },
            templateUrl: '/wizard/rg-wizard-step-directive-template.html',
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

                if (!angular.isUndefined(scope.setFormDirtyOn))
                    $rootScope.$on(scope.setFormDirtyOn, function () {
                        if (scope.visible)
                            scope.$parent.setFormIsDirty(true);
                    });
            }
        };
    }
};
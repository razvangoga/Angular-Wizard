'use strict';

var rgWizardStepDirective = {
    name: 'rgWizardStep',
    directive: function ($rootScope, $log, $timeout) {
        return {
            restrict: 'E',
            require: '^rgWizard',
            transclude: true,
            replace: true,
            scope: {
                watchForChanges: '@',
                setFormDirtyOn: '@',
                onEnterCallback: '&',
                onLeaveCallback: '&'
            },
            templateUrl: '/wizard/rg-wizard-step-template.html',
            link: function (scope, elem, attrs) {
                scope.name = attrs.stepName;
                scope.stepForm = {
                    name: scope.name.replace(/[\s|\W\d]/g, '') + 'StepForm'
                };
                scope.visible = false;
                this.isLastStep = !angular.isUndefined(attrs.lastStep);

                scope.deregisterFormValidWatch = null;
                scope.deregisterFormDirtyWatch = null;
                scope.deregisterWatchCollection = [];

                scope.getStepForm = function () {
                    return scope[scope.stepForm.name];
                };

                scope.setVisible = function (visible) {
                    scope.visible = visible;

                    if (visible) {
                        $timeout(function () {
                            scope.deregisterFormValidWatch = scope.$watch(scope.stepForm.name + '.$valid', function (newVal, oldVal) {
                                scope.$parent.setCanChangeStep(newVal);
                                //$log.info(scope.name, scope.$id, "watch valid", newVal, oldVal);
                            });
                            scope.deregisterFormDirtyWatch = scope.$watch(scope.stepForm.name + '.$dirty', function (newVal, oldVal) {
                                scope.$parent.setFormIsDirty(newVal);
                                //$log.info(scope.name, scope.$id, "watch dirty", newVal, oldVal);
                            });

                            if (!angular.isUndefined(scope.watchForChanges)) {

                                var watchExpressions = scope.watchForChanges.split('|');

                                for (var i = 0; i < watchExpressions.length; i++) {
                                    var propertyToWatch = watchExpressions[i].trim();

                                    if (propertyToWatch.length === 0)
                                        continue;

                                    var watchExpression = '$parent.$parent.' + propertyToWatch;
                                    scope.deregisterWatchCollection.push(scope.$watchCollection(watchExpression, function (newVal, oldVal) {
                                        var equals = angular.equals(newVal, oldVal);
                                        scope.$parent.setFormIsDirty(!equals);
                                        //$log.info(scope.name, scope.$id, "watch collection dirty", equals, newVal, oldVal);
                                    }));
                                }
                            }

                            //if the step was made invisible before we register the watches
                            //deregister them
                            if(!scope.visible)
                                deregisterWatches();

                        }, 
                        //the 1s wait is to allow IE11 to catch up
                        500);
                    } else {
                        deregisterWatches();
                    }
                };

                function deregisterWatches() {
                    if (scope.deregisterFormValidWatch !== null)
                        scope.deregisterFormValidWatch();

                    if (scope.deregisterFormDirtyWatch !== null)
                        scope.deregisterFormDirtyWatch();

                    if (scope.deregisterWatchCollection.length > 0) {
                        for (var i = 0; i < scope.deregisterWatchCollection.length; i++)
                            scope.deregisterWatchCollection[i]();
                    }
                }

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

                if (!angular.isUndefined(scope.setFormDirtyOn))
                    $rootScope.$on(scope.setFormDirtyOn, function () {
                        if (scope.visible)
                            scope.$parent.setFormIsDirty(true);
                    });
            }
        };
    }
};
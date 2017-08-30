var rgWizardStepDirective = {
    name: 'rgWizardStep',
    directive: function () {
        return {
            restrict: 'E',
            require : '^rgWizard',
            scope: {
                model: '='
            },
            transclude:true,
            replace:true,
            templateUrl: '/wizard/rg-wizard-step-directive-template.html',
            link: function (scope, elem, attrs) {
                scope.name = attrs.stepName;
                
                scope.$parent.registerStep(scope.name);

                scope.canShow = function() {
                    var show = scope.name === scope.$parent.currentStep;
                    return show;
                }
            }
        };
    }
};
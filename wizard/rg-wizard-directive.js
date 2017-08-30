var rgWizardDirective = {
    name: 'rgWizard',
    directive: function () {
        return {
            restrict: 'E',
            replace: true,
            transclude:true,
            templateUrl: '/wizard/rg-wizard-directive-template.html',
            controller: function() {return {}}
        };
    }
};
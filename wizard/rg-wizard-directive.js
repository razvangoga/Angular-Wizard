var rgWizardDirective = {
    name: 'rgWizard',
    directive: function () {
        return {
            restrict: 'E',
            scope: {
                model: '=',
                summernoteOptions: '<'
            },
            replace: true,
            templateUrl: '/wizard/rg-wizard-template.html'
        };
    }
};
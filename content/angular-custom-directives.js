'use strict';

var convertToNumberDirective = {
    name: 'convertToNumber',
    directive: function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                ngModel.$parsers.push(function (val) {
                    if (typeof val === 'undefined')
                        return null;
                    else if (val.constructor === Array) {
                        var intArray = Array();

                        for (var i = 0; i < val.length; i++) {
                            intArray.push(parseInt(val[i], 10));
                        }

                        return intArray;
                    }
                    else
                        return parseInt(val, 10);
                });
                ngModel.$formatters.push(function (val) {
                    if (typeof val === 'undefined' || val === null)
                        return '';
                    else if (val.constructor === Array) {
                        var stringArray = Array();

                        for (var i = 0; i < val.length; i++) {
                            stringArray.push('' + val[i]);
                        }

                        return stringArray;
                    }
                    else
                        return '' + val;
                });
            }
        }
    }
};

var dropdownNotSetToZeroDirective = {
    name: 'dropdownNotSetToZero',
    directive: function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elm, attr, ctrl) {

                if (!ctrl)
                    return;

                attr.requiredSelect = true; // force truthy in case we are on non input element

                var validator = function (value) {
                    if (attr.requiredSelect && (ctrl.$isEmpty(value) || parseInt(value) === 0)) {
                        ctrl.$setValidity('dropdownNotSetToZero', false);
                    } else {
                        ctrl.$setValidity('dropdownNotSetToZero', true);
                    }
                    return value;
                };

                ctrl.$formatters.push(validator);
                ctrl.$parsers.push(validator);

                attr.$observe('dropdownNotSetToZero', function () {
                    validator(ctrl.$viewValue);
                });
            }
        };
    }
};

//http://stackoverflow.com/a/24936234/1841836
var isolatedFormDirective = {
    name: 'isolateForm',
    directive: function () {
        return {
            restrict: 'A',
            require: '?form',
            link: function (scope, elm, attrs, ctrl) {
                if (!ctrl) {
                    return;
                }

                // Do a copy of the controller
                var ctrlCopy = {};
                angular.copy(ctrl, ctrlCopy);

                // Get the parent of the form
                var parent = elm.parent().controller('form');
                // Remove parent link to the controller
                parent.$removeControl(ctrl);

                // Replace form controller with a "isolated form"
                var isolatedFormCtrl = {
                    $setValidity: function (validationToken, isValid, control) {
                        ctrlCopy.$setValidity(validationToken, isValid, control);
                        parent.$setValidity(validationToken, true, ctrl);
                    },
                    $setDirty: function () {
                        elm.removeClass('ng-pristine').addClass('ng-dirty');
                        ctrl.$dirty = true;
                        ctrl.$pristine = false;
                    },
                };
                angular.extend(ctrl, isolatedFormCtrl);
            }
        };
    }
};

//inspired from http://stackoverflow.com/a/20984017/1841836
var notContainsDirective = {
    name: 'notContains',
    directive: function () {
        var link = function ($scope, $element, $attrs, ctrl) {

            var validate = function (viewValue) {
                var comparisonModel = $attrs.notContains;

                if (!viewValue || !comparisonModel) {
                    // It's valid because we have nothing to compare against
                    ctrl.$setValidity('notContains', true);
                }

                // It's valid if model is lower than the model we're comparing against
                var index = viewValue.indexOf(comparisonModel);
                ctrl.$setValidity('notContains', index === -1);
                return viewValue;
            };

            ctrl.$parsers.unshift(validate);
            ctrl.$formatters.push(validate);

            $attrs.$observe('notContains', function (comparisonModel) {
                return validate(ctrl.$viewValue);
            });

        };

        return {
            require: 'ngModel',
            link: link
        };
    }
}
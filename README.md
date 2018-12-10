# Angular-Wizard
### Customizable Wizard directive for Angular 1.5.8

This library contains a pair of angular directives that will allow you to easily split large forms into wizards.

The library was started as a refactoring step in an existing fomrs-heavy non-SPA website aimed at having a better UX for large forms pages.

**This is my forst foray into more advanced Angular developemnt so comments / fixes / better practices / pull requests are most welcome :)**

## The main requirements for the components were:
1. Allow the refactoring of large existing forms to the wizard format 
1. The content of each wizard step should constructed in the markup and all are bound to the same model object
1. A custom action should be triggered when exiting a step if the step's content is dirty
1. Moving to a different step should not be possible if the current step has validation errors

## Other requirements
1. Work on Angular 1.5.8 (already used in the project)
1. Work with the [Metronic Twitter Bootstrap Theme](http://keenthemes.com/preview/metronic/) - it should work with vanilla Twitter Bootstrap too
1. Do not interfere with other custom directives used by the project (toastr, summernote, google charts, others)

## Instalation
1. clone the repo
1. make sure you have the 2 prerequisets
   1. Angular 1.5.8
   1. Metronic or Twitter Bootstrap
1. include the directive files
```html
    <script src="/wizard/rg-wizard-directive.js" type="text/javascript"></script>
    <script src="/wizard/rg-wizard-step-directive.js" type="text/javascript"></script>
```

## Usage

### rg-wizard component
* Represents the wizard component
* By it's own will render the header (name, description) and wizard controls (next step button, previous step button, steps list, save button)
* The content of the steps is transcluded inside it

#### In order to user you will need to configure thee properties:
* data-wizard-name - main wizard title
* data-wizard-description - wizard subtitle
* data-step-form-ok-description - icon tooltip used when the current step form is valid and pristine
* data-step-form-unsaved-changes-description - icon tooltip used when the current step form is valid and dirty
* data-step-form-errors-description - icon tooltip used when the current step form is invalid
* data-custom-step-header-class - use this if you need to add custom classes to the h4 where the step title is rendered


### rg-wizard-step component
* Represents one step of the wizard
* It holds the actual content of the step (content is transluded)
* It wraps thecontent inside a form used for validation

#### In order to user you will need to configure thee properties:
* data-step-name - name of the step. Will be used to display the step name and in the steps list
* data-on-leave-callback - controller method that will be called when leaving the step when the form is dirty - intended to persist the changes made
* data-last-step - add only to mark the last step
* data-watch-for-changes - the name of the model collection that is displayed/interacted with in the step. We need to watch it separately as the form does not pick deleting from collections.

## Still to do / nice to have
* Transition from directives to components - i was not able to get the step component to do the transclude content correctly. I think this may be related to the 1.5.8 version of Angular that was a hard requirement
* Transition to Angular 2/4 and TypeScript
* Make the template urls top level **rg-wizard component** parameters - at the moment thy are hardcoded in the directive's JS code
* ~~Add some animation for the startup - slow with large forms~~ oct 14th 2018 : optimized startup / loading of pages

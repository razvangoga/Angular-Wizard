1..30 | ForEach-Object { $props += "someField$_ : null,`n" }
$props

1..30 | ForEach-Object { $directives += "<rg-wizard-step data-step-name='Some Field $_' data-on-leave-callback='c.save2()'><summernote ng-model='model.someField$_' config='options'></summernote></rg-wizard-step>`n" }
$directives
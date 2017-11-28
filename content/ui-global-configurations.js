var summernoteConfigurator = function () {
    var defaults = {
        height: 200,
        emptyValue: null,
        maximumImageFileSize: 5 * 1024 * 1024, //5MB
        toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['insert', ['picture', 'table']]
        ]
    };


    return {
        defaults: defaults,
        withWordCount : function(count) {
            var config = defaults;
            config.customMaxWordCount = count;
            config.toolbar[3][1].push('word-counter');

            return config;
        }
    }
}
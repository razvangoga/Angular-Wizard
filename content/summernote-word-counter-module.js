(function (factory) {
    /* global define */
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(window.jQuery);
    }
}(function ($) {

    // Extends plugins for adding hello.
    //  - plugin is external module for customizing.
    $.extend($.summernote.plugins, {
        /**
         * @param {Object} context - context object has status of editor.
         */
        'hello': function (context) {
            var self = this;

            // ui has renders to build ui elements.
            //  - you can create a button with `ui.button`
            var ui = $.summernote.ui;

            // add hello button
            context.memo('button.word-counter', function () {

                self.counter = $('<span>').text('0');
                var counterContainer = $('<div>')
                  .attr('class', 'note-file pull-right text-right summernote-word-counter')
                  .append(self.counter)
                  .append($('<span>')
                    .text('/' + context.options.customMaxWordCount + ' words'));

                return counterContainer;
            });

            // This events will be attached when editor is initialized.
            this.events = {
                // This will be called after modules are initialized.
                'summernote.init': function (we, e) {
                },
                // This will be called when user releases a key on editable.
                'summernote.keyup': function (we, e) {
                    self.setUsedWordCount(e.currentTarget.innerText);
                },

                'summernote.keydown': function (we, e) {

                },

                'summernote.paste': function (we, e) {
                    self.setUsedWordCount(e.currentTarget.innerText);
                }
            };

            this.setUsedWordCount = function (text) {
                var wordsText = text.replace(/[\n\r\t_\W]+/gmi, ' ');
                var words = wordsText.trim().split(' ');
                var wordsCount = wordsText.length == 0 ? 0 : words.length;

                self.counter.text(wordsCount);

                if (wordsCount > context.options.customMaxWordCount) {
                    self.counter.addClass('text-red');
                }
                else {
                    self.counter.removeClass('text-red');
                }
            }

            // This method will be called when editor is initialized by $('..').summernote();
            // You can create elements for plugin
            this.initialize = function () {
            };

            // This methods will be called when editor is destroyed by $('..').summernote('destroy');
            // You should remove elements on `initialize`.
            this.destroy = function () {
            };
        }
    });
}));

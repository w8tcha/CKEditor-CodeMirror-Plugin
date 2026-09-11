var js_beautify = require('js-beautify/js/lib/beautify.js').js_beautify;
var html_beautify = require('js-beautify/js/lib/beautify-html.js').html_beautify;

if (typeof window !== 'undefined') {
    window.js_beautify = js_beautify;
    window.html_beautify = html_beautify;
}

echo Compress and Combine JS Files

java -jar yuicompressor-2.4.8.jar js/codemirror.js > js/codemirror.min.js

ajaxmin.exe js/mode/xml/xml.js js/mode/javascript/javascript.js js/mode/css/css.js js/mode/htmlmixed/htmlmixed.js js/mode/htmlembedded/htmlembedded.js -term -rename:none -echo -out js/codemirror.mode.htmlmixed.min.js
java -jar yuicompressor-2.4.8.jar -o js/codemirror.mode.htmlmixed.min.js js/codemirror.mode.htmlmixed.min.js

ajaxmin.exe js/mode/htmlmixed/htmlmixed.js js/mode/xml/xml.js js/mode/javascript/javascript.js js/mode/css/css.js js/mode/clike/clike.js js/mode/php/php.js -term -rename:none -echo -out js/codemirror.mode.php.min.js
java -jar yuicompressor-2.4.8.jar -o js/codemirror.mode.php.min.js js/codemirror.mode.php.min.js

java -jar yuicompressor-2.4.8.jar -o js/codemirror.mode.javascript.min.js js/mode/javascript/javascript.js

java -jar yuicompressor-2.4.8.jar -o js/codemirror.mode.bbcode.min.js js/mode/bbcode/bbcode.js

java -jar yuicompressor-2.4.8.jar -o js/codemirror.mode.bbcodemixed.min.js js/mode/xml/xml.js js/mode/javascript/javascript.js js/mode/css/css.js js/mode/htmlmixed/htmlmixed.js js/mode/bbcode/bbcode.js js/mode/bbcode/bbcodemixed.js

ajaxmin.exe js/addon/edit/closebrackets.js js/addon/edit/closetag.js js/addon/edit/continuecomment.js js/addon/edit/matchbrackets.js js/addon/edit/matchtags.js js/addon/edit/trailingspace.js js/addon/fold/foldcode.js js/addon/fold/brace-fold.js js/addon/fold/xml-fold.js js/addon/format/autoFormatAll.js js/addon/format/formatting.js js/addon/selection/active-line.js js/addon/search/match-highlighter.js -out js/codemirror.addons.min.js
ajaxmin.exe js/addon/dialog/dialog.js js/addon/search/search.js js/addon/search/searchcursor.js  -out js/codemirror.addons.search.min.js
ajaxmin.exe js/beautify.js js/beautify-html.js  -out js/beautify.min.js

echo Compress and Combine CSS Files
ajaxmin.exe css/codemirror.css css/codemirror.ckeditor.css -out css/codemirror.min.css

echo Compress and Combine JS Files

ajaxmin.exe js/codemirror.js  -out js/codemirror.min.js
ajaxmin.exe js/mode/css.js js/mode/htmlmixed.js js/mode/javascript.js js/mode/xml.js  -out js/codemirror.modes.min.js
ajaxmin.exe js/addon/edit/closebrackets.js js/addon/edit/closetag.js js/addon/edit/matchbrackets.js js/addon/foldcode/foldcode.js js/addon/format/autoFormatAll.js js/addon/format/formatting.js js/addon/search/match-highlighter.js  -out js/codemirror.addons.min.js
ajaxmin.exe js/addon/dialog/dialog.js js/addon/search/search.js js/addon/search/searchcursor.js  -out js/codemirror.search-addons.min.js

echo Compress and Combine CSS Files
ajaxmin.exe css/codemirror.css css/codemirror.ckeditor.css -out css/codemirror.min.css

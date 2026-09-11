require('codemirror/addon/comment/continuecomment.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/addon/edit/closetag.js');
require('codemirror/addon/edit/matchbrackets.js');
require('codemirror/addon/edit/matchtags.js');
require('codemirror/addon/edit/trailingspace.js');
require('codemirror/addon/fold/foldgutter.js');
require('codemirror/addon/fold/brace-fold.js');
require('codemirror/addon/fold/comment-fold.js');
require('codemirror/addon/fold/indent-fold.js');
require('codemirror/addon/hint/show-hint.js');
require('codemirror/addon/hint/javascript-hint.js');
require('codemirror/addon/hint/css-hint.js');
require('codemirror/addon/hint/html-hint.js');
// These three are repo-local custom addons (not part of the npm
// "codemirror" package), same UMD shape as the upstream ones.
require('../../codemirror/js/addon/format/autoFormatAll.js');
require('../../codemirror/js/addon/format/formatting.js');
require('codemirror/addon/selection/active-line.js');
require('../../codemirror/js/addon/selection/wrap-selection.js');
require('codemirror/addon/search/match-highlighter.js');
require('codemirror/addon/mode/multiplex.js');

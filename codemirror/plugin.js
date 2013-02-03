/*
*  The "codemirror" plugin. It's indented to enhance the
*  "sourcearea" editing mode, which displays the xhtml source code with
*  syntax highlight and line numbers.
* Licensed under the MIT license
* jQuery Embed Plugin Embeds: http://code.google.com/p/jquery-oembed/ (MIT License)
* Plugin for: http://ckeditor.com/license (GPL/LGPL/MPL: http://ckeditor.com/license)
*/

(function () {
    CKEDITOR.plugins.add('codemirror', {
		icons: 'AutoFormat,CommentSelectedRange,UncommentSelectedRange',
        lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en-au,en-ca,en-gb,en,eo,es,et,eu,fa,fi,fo,fr-ca,fr,gl,gu,he,hi,hr,hu,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt-br,pt,ro,ru,sk,sl,sr-latn,sr,sv,th,tr,ug,uk,vi,zh-cn,zh',
		init: function (editor) {
			var rootPath = this.path;
			
			// Default Config
			var defaultConfig = {
				theme: 'default',
				matchBrackets: true,
				lineNumbers: true,
				lineWrapping: true,
				autoCloseTags: false,
				enableSearchTools: true,
				enableCodeFolding: true,
				enableCodeFormatting: true,
				autoFormatOnStart: true,
				autoFormatOnModeChange: true,
				autoFormatOnUncomment: true,
				highlightActiveLine: true,
				highlightMatches: true,
				showTabs: false,
				showFormatButton: true,
				showCommentButton: true,
				showUncommentButton: true
			};
			
            // Get Config & Lang
            var config = CKEDITOR.tools.extend(defaultConfig, editor.config.codemirror || {}, true);
			var   lang = editor.lang.codemirror;
			
            CKEDITOR.document.appendStyleSheet(rootPath + 'css/codemirror.css');
			
            if (config.theme.length && config.theme != 'default') {
                CKEDITOR.document.appendStyleSheet(rootPath + 'theme/' + config.theme + '.css');
            }
			
			if (config.showTabs) {
				CKEDITOR.document.appendStyleSheet(rootPath + 'js/addon/edit/showtabs.css');
			}
			
			if (config.enableSearchTools) {
				CKEDITOR.document.appendStyleSheet(rootPath + 'js/addon/dialog/dialog.css');
			}
			
			CKEDITOR.scriptLoader.load(rootPath + 'js/codemirror.js', function (success) {
				CKEDITOR.scriptLoader.load(getCodeMirrorScripts());
			});
			
            // Source mode isn't available in inline mode yet.
            if (editor.elementMode == CKEDITOR.ELEMENT_MODE_INLINE) return;
			
            var sourcearea = CKEDITOR.plugins.sourcearea;
			
			editor.addMode('source', function (callback) {
				
				if (typeof (CodeMirror) == 'undefined') {
					CKEDITOR.scriptLoader.load([rootPath + 'js/codemirror.js'].concat(getCodeMirrorScripts()), function (success) {
						loadCodeMirror (editor);
						callback();
					});
				}
				else {
					loadCodeMirror (editor);
					callback();
				}
				
            });
			
			function getCodeMirrorScripts() {
				var scriptFiles = [ rootPath + 'js/xml.js', rootPath + 'js/javascript.js', rootPath + 'js/css.js', rootPath + 'js/htmlmixed.js' ];
				
				if (config.autoCloseTags) scriptFiles.push(rootPath + 'js/addon/edit/closetag.js');
				if (config.highlightMatches) scriptFiles.push(rootPath + 'js/addon/edit/match-highlighter.js');
				
				if (config.enableSearchTools) {
					scriptFiles.push(rootPath + 'js/addon/dialog/dialog.js');
					scriptFiles.push(rootPath + 'js/addon/search/search.js');
					scriptFiles.push(rootPath + 'js/addon/search/searchcursor.js');
				}
				
				if (config.enableCodeFolding) scriptFiles.push(rootPath + 'js/addon/edit/foldcode.js');
				if (config.enableCodeFormatting) scriptFiles.push(rootPath + 'js/addon/format/formatting.js');
				
				return scriptFiles;
			}
			
			function loadCodeMirror (editor)
			{
				var contentsSpace = editor.ui.space('contents'),
                    textarea = contentsSpace.getDocument().createElement('textarea');
				
				textarea.setStyles(
                CKEDITOR.tools.extend({
                    // IE7 has overflow the <textarea> from wrapping table cell.
                    width: CKEDITOR.env.ie7Compat ? '99%' : '100%',
                    height: '100%',
                    resize: 'none',
                    outline: 'none',
                    'text-align': 'left'
                },
                CKEDITOR.tools.cssVendorPrefix('tab-size', editor.config.sourceAreaTabSize || 4)));
				
                var ariaLabel = [editor.lang.editor, editor.name].join(',');
				
                textarea.setAttributes({
                    dir: 'ltr',
                    tabIndex: CKEDITOR.env.webkit ? -1 : editor.tabIndex,
                    'role': 'textbox',
                    'aria-label': ariaLabel
                });
				
                textarea.addClass('cke_source cke_reset cke_enable_context_menu');
				
                editor.ui.space('contents').append(textarea);
				
                window["editable_" +  editor.id] = editor.editable(new sourceEditable(editor, textarea));
				
                // Fill the textarea with the current editor data.
                window["editable_" +  editor.id].setData(editor.getData(1));
				
				window["editable_" +  editor.id].editorID = editor.id;
				
				editor.fire('ariaWidget', this);
				
				var delay;
				
                var sourceAreaElement = window["editable_" +  editor.id],
                    holderElement = sourceAreaElement.getParent();
					
                var holderHeight = holderElement.$.clientHeight + 'px';
                var holderWidth = holderElement.$.clientWidth + 'px';
				
                codemirror = editor.id;
				
				window["codemirror_" +  editor.id] = CodeMirror.fromTextArea(sourceAreaElement.$, {
                    mode: 'text/html',
                    matchBrackets: config.matchBrackets,
                    workDelay: 300,
                    workTime: 35,
                    lineNumbers: config.lineNumbers,
                    lineWrapping: config.lineWrapping,
					autoCloseTags: config.autoCloseTags,
					theme: config.theme,
					onKeyEvent : function (codeMirror_Editor, evt) {
						if (config.enableCodeFormatting) {
							if (evt.type=="keydown" && evt.ctrlKey && evt.keyCode == 75 && !evt.shiftKey && !evt.altKey) {
								var range = getSelectedRange();
								window["codemirror_" +  editor.id].commentRange(true, range.from, range.to);
							}
							else if (evt.type=="keydown" && evt.ctrlKey && evt.keyCode == 75 && evt.shiftKey && !evt.altKey) {
								var range = getSelectedRange();
								window["codemirror_" +  editor.id].commentRange(false, range.from, range.to);
								
								if (config.autoFormatOnUncomment) {
									window["codemirror_" +  editor.id].autoFormatRange({line: 0, ch : 0}, {line:window["codemirror_" +  editor.id].lineCount(), ch : 0}, true);
								}
							}
							else if (evt.type=="keydown" && evt.ctrlKey && evt.keyCode == 75 && !evt.shiftKey && evt.altKey) {
								window["codemirror_" +  editor.id].autoFormatRange({line: 0, ch : 0}, {line:window["codemirror_" +  editor.id].lineCount(), ch : 0}, true);
							}
						}
					}
                });
				
				// Store config so we can access it within commands etc.
				window["codemirror_" +  editor.id].config = config;
				
				if (config.autoFormatOnStart) {
					window["codemirror_" +  editor.id].autoFormatRange({line: 0, ch : 0}, {line:window["codemirror_" +  editor.id].lineCount(), ch : 0}, true);
				}
				
                function getSelectedRange() {
					return { from: window["codemirror_" +  editor.id].getCursor(true), to: window["codemirror_" +  editor.id].getCursor(false) };
				}				
				
				window["codemirror_" +  editor.id].on("change", function(cm, change) {
					clearTimeout(delay);
					delay = setTimeout(function () {
						window["codemirror_" +  editor.id].save();
					}, 300);
				});
				
                window["codemirror_" +  editor.id].setSize(holderWidth, holderHeight);
				
				// Enable Code Folding (Requires 'lineNumbers' to be set to 'true')
				if (config.lineNumbers && config.enableCodeFolding) {
					window["codemirror_" +  editor.id].on("gutterClick", CodeMirror.newFoldFunction(CodeMirror.tagRangeFinder));
				}
				
				// Highlight Active Line
				if (config.highlightActiveLine) {
					window["codemirror_" +  editor.id].hlLine = window["codemirror_" +  editor.id].addLineClass(0, "background", "activeline");
					
					window["codemirror_" +  editor.id].on("cursorActivity", function() {
						var cur = window["codemirror_" +  editor.id].getLineHandle(window["codemirror_" +  editor.id].getCursor().line);
						if (cur != window["codemirror_" +  editor.id].hlLine) {
							window["codemirror_" +  editor.id].removeLineClass(window["codemirror_" +  editor.id].hlLine, "background", "activeline");
							window["codemirror_" +  editor.id].hlLine = window["codemirror_" +  editor.id].addLineClass(cur, "background", "activeline");
						}
					});
				}
				
				// Highlight Matches
				if (config.highlightMatches) {
					window["codemirror_" +  editor.id].on("cursorActivity", function() {
						window["codemirror_" +  editor.id].matchHighlight("CodeMirror-matchhighlight");
					});
				}
			}
			
            editor.addCommand('source', sourcearea.commands.source);

            if (editor.ui.addButton) {
                editor.ui.addButton('Source', {
                    label: editor.lang.codemirror.toolbar,
                    command: 'source',
                    toolbar: 'mode,10'
                });
            }
			
			if (config.enableCodeFormatting) {
				editor.addCommand('autoFormat', sourcearea.commands.autoFormat);
				editor.addCommand('commentSelectedRange', sourcearea.commands.commentSelectedRange);
				editor.addCommand('uncommentSelectedRange', sourcearea.commands.uncommentSelectedRange);
				
				if (editor.ui.addButton) {
					if (config.showFormatButton) {
						editor.ui.addButton('AutoFormat', {
							label: lang.autoFormat,
							command: 'autoFormat',
							toolbar: 'mode,20'
						});
					}
					
					if (config.showCommentButton) {
						editor.ui.addButton('CommentSelectedRange', {
							label: lang.commentSelectedRange,
							command: 'commentSelectedRange',
							toolbar: 'mode,30'
						});
					}
					
					if (config.showUncommentButton) {
						editor.ui.addButton('UncommentSelectedRange', {
							label: lang.uncommentSelectedRange,
							command: 'uncommentSelectedRange',
							toolbar: 'mode,40'
						});
					}
				}
			}
			
			editor.on('mode', function () {
				editor.getCommand('source').setState(editor.mode == 'source' ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);
            });

            editor.on('resize', function () {
                if (window["editable_" +  editor.id] && editor.mode == 'source') {
					var holderElement = window["editable_" +  editor.id].getParent();

                	var holderHeight = holderElement.$.clientHeight + 'px';
                	var holderWidth = holderElement.$.clientWidth + 'px';
					
					window["codemirror_" +  editor.id].setSize(holderWidth, holderHeight);
				}
            });
        }
    });

    var sourceEditable = CKEDITOR.tools.createClass({
        base: CKEDITOR.editable,
        proto: {
            setData: function (data) {
                this.setValue(data);
                this.editor.fire('dataReady');
            },
			
			getData: function () {
                return this.getValue();
            },
			
            // Insertions are not supported in source editable.
            insertHtml: function () {},
            insertElement: function () {},
            insertText: function () {},

            // Read-only support for textarea.
            setReadOnly: function (isReadOnly) {
                this[(isReadOnly ? 'set' : 'remove') + 'Attribute']('readOnly', 'readonly');
            },
			
			editorID : null,
			
            detach: function () {
				window["codemirror_" +  this.editorID].toTextArea();
                sourceEditable.baseProto.detach.call(this);
                this.clearCustomData();
                this.remove();

            }
        }
    });
})();

CKEDITOR.plugins.sourcearea = {
    commands: {
        source: {
            modes: {
                wysiwyg: 1,
                source: 1
            },
            editorFocus: false,
            readOnly: 1,
            exec: function (editor) {
                if (editor.mode == 'wysiwyg') editor.fire('saveSnapshot');
				
                editor.getCommand('source').setState(CKEDITOR.TRISTATE_DISABLED);
                editor.setMode(editor.mode == 'source' ? 'wysiwyg' : 'source');
            },

            canUndo: false
        },
		autoFormat: {
            modes: {
                wysiwyg: 0,
                source: 1
            },
            editorFocus: false,
            readOnly: 1,
            exec: function (editor) {
                window["codemirror_" +  editor.id].autoFormatRange({line: 0, ch : 0}, {line:window["codemirror_" +  editor.id].lineCount(), ch : 0}, true);
            },
			
            canUndo: true
        },
		commentSelectedRange: {
            modes: {
                wysiwyg: 0,
                source: 1
            },
            editorFocus: false,
            readOnly: 1,
            exec: function (editor) {
				var range = { from: window["codemirror_" +  editor.id].getCursor(true), to: window["codemirror_" +  editor.id].getCursor(false) };
				window["codemirror_" +  editor.id].commentRange(true, range.from, range.to);
            },
			
            canUndo: true
        },
		uncommentSelectedRange: {
            modes: {
                wysiwyg: 0,
                source: 1
            },
            editorFocus: false,
            readOnly: 1,
            exec: function (editor) {
				var range = { from: window["codemirror_" +  editor.id].getCursor(true), to: window["codemirror_" +  editor.id].getCursor(false) };
				window["codemirror_" +  editor.id].commentRange(false, range.from, range.to);
				
				if (window["codemirror_" +  editor.id].config.autoFormatOnUncomment) {
					window["codemirror_" +  editor.id].autoFormatRange({line: 0, ch : 0}, {line:window["codemirror_" +  editor.id].lineCount(), ch : 0}, true);
				}
            },
			
            canUndo: true
        }
    }
};
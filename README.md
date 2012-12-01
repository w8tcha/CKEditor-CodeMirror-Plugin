CKEditor-CodeMirror-Plugin
==========================

Syntax Highlighting for the CKEditor (Source View) with the CodeMirror Plugin

The Full Theme List can be found here: http://codemirror.net/demo/theme.html

![Screenshot](http://www.watchersnet.de/Portals/0/screenshots/dnn/CKEditorSourceView.png)



This Plugin uses the jquery-oembed-all Plugin  located at https://github.com/starfishmod/jquery-oembed-all.




####License

Licensed under the terms of the MIT License.

Installation

 1. Extract the contents of the file into the "plugins" folder of CKEditor.
 2. In the CKEditor configuration file (config.js) add the following code:

````
config.extraPlugins = '[ codemirror ]';
config.codemirror_theme : 'rubyblue';
````
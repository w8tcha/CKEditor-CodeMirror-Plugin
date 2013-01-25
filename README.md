CKEditor-CodeMirror-Plugin
==========================

Syntax Highlighting for the CKEditor (Source View) with the CodeMirror Plugin

### Available Shortcuts
* 'Ctrl-K' to comment the currently selected text
* 'Ctrl-Shift-K' to uncomment currently selected text
* 'Ctrl-Shift-F' to autoformat currely selected text

The Full Theme List can be found here: http://codemirror.net/demo/theme.html

![Screenshot](http://www.watchersnet.de/Portals/0/screenshots/dnn/CKEditorSourceView.png)



This Plugin uses the jquery-oembed-all Plugin  located at https://github.com/starfishmod/jquery-oembed-all.




####License

Licensed under the terms of the MIT License.

####Installation

 1. Extract the contents of the file into the "plugins" folder of CKEditor.
 2. In the CKEditor configuration file (config.js) add the following code:

````
config.extraPlugins = '[ codemirror ]';

// If you want to use a theme set the theme here 
// config.codemirror_theme : 'rubyblue';

// Extra Option to disable/enable Automatic Code Formatting every time the source view is opened (By Default its enabled)
// config.codemirror_autoFormatOnStart : true; 
````
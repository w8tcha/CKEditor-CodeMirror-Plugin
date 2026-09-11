const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// CopyWebpackPlugin passes these through unmodified from node_modules,
// exactly like the Gruntfile's `copy` task did -- they must not be minified.
const COPIED_ASSETS = /codemirror[\\/](js[\\/](addon|mode)|theme)[\\/]/;

// Must match build-src/entries/addons.js.
const addons = [
    'addon/comment/continuecomment.js',
    'addon/edit/closebrackets.js',
    'addon/edit/closetag.js',
    'addon/edit/matchbrackets.js',
    'addon/edit/matchtags.js',
    'addon/edit/trailingspace.js',
    'addon/fold/foldgutter.js',
    'addon/fold/brace-fold.js',
    'addon/fold/comment-fold.js',
    'addon/fold/indent-fold.js',
    'addon/hint/show-hint.js',
    'addon/hint/javascript-hint.js',
    'addon/hint/css-hint.js',
    'addon/hint/html-hint.js',
    'addon/format/autoFormatAll.js',
    'addon/format/formatting.js',
    'addon/selection/active-line.js',
    'addon/selection/wrap-selection.js',
    'addon/search/match-highlighter.js',
    'addon/mode/multiplex.js'
];

// Each built bundle, when loaded by a RequireJS-compatible loader (see
// codemirror/plugin.js), must register the exact AMD module name that
// plugin.js's `bundles`/`packages` config expects. These wrapper strings are
// carried over verbatim from the old Gruntfile's per-target `wrap`/`footer`
// options -- the guard (`"function"==typeof window.define &&`) is what lets
// the same built file also work as a plain <script> with no AMD loader
// present (plugin.js's non-RequireJS fallback path), since it never calls
// `define(...)` unless one already exists.
const FOOTERS = {
    core: `(function(window){
    "function"==typeof window.define &&
    window.define("codemirror.js", [], function (){
        return window.CodeMirror;
    }) &&
    window.define("core", ["codemirror.js"], function (codemirror){
        window.CodeMirror = codemirror;
    });
})(this)`,
    modeHandlebars: `(function(window){
    "function"==typeof window.define &&
    window.define("modeHandlebars", ["mode/handlebars/handlebars.js"], function (){
    });
})(this)`,
    modeTwig: `(function(window){
    "function"==typeof window.define &&
    window.define("modeTwig", ["mode/twig/twig.js"], function (){
    });
})(this)`,
    modeSql: `(function(window){
    "function"==typeof window.define &&
    window.define("modeSql", ["mode/sql/sql.js"], function (){
    });
})(this)`,
    // Preserves the Gruntfile's original inconsistency: this one guards on
    // bare `define` and calls bare `define(...)` instead of `window.define`.
    modeHtml: `(function(window){
    "function"==typeof define &&
    define("modeHtml",["mode/htmlembedded/htmlembedded.js"], function (){
    });
})(this)`,
    modePHP: `(function(window){
    "function"==typeof window.define &&
    window.define("modePHP",["mode/php/php.js"], function (){
    });
})(this)`,
    // Literal name "modeJs" (lowercase s) preserved to match plugin.js's
    // getCodeMirrorDependencies(), even though plugin.js's own `bundles` map
    // has a pre-existing mismatched entry for "modeJS" -- not this
    // migration's concern to fix.
    modeJs: `(function(window){
    "function"==typeof window.define &&
    window.define("modeJs",["mode/javascript/javascript.js"], function (){
    });
})(this)`,
    addons: `(function(window){
    "function"==typeof window.define &&
    window.define("addons",["${addons.join('","')}"], function (){
    });
})(this)`,
    addonSearch: `(function(window){
    "function"==typeof window.define &&
    window.define("addonSearch",["addon/search/search.js"], function (){
    });
})(this)`,
    beautify: `(function(window){
    if("function"==typeof window.define){
    window.define("beautify",["beautify.js"], function (b){return b;});
    window.define("beautify-css",[], function (){return {css_beautify:undefined};});
    window.define("beautifyModule",["beautify", "beautify-html.js"], function (js_beautify, html_beautify){
        window.js_beautify = js_beautify.js_beautify;
        window.html_beautify = html_beautify.html_beautify;
    });}
})(this)`,
    modeBBCode: `(function(window){
    "function"==typeof window.define &&
    window.define("modeBBCode", [], function (){
    });
})(this);`,
    modeBBCodeMixed: `(function(window){
    "function"==typeof window.define &&
    window.define("modeBBCodeMixed", [], function (){
    });
})(this);`
};

module.exports = {
    mode: 'production',
    target: 'web',
    devtool: false,
    entry: {
        core: {
            import: './build-src/entries/core.js',
            filename: 'codemirror/js/codemirror.min.js',
            library: { type: 'window', name: 'CodeMirror' }
        },
        modeHandlebars: { import: './build-src/entries/modeHandlebars.js', filename: 'codemirror/js/codemirror.mode.handlebars.min.js' },
        modeTwig: { import: './build-src/entries/modeTwig.js', filename: 'codemirror/js/codemirror.mode.twig.min.js' },
        modeSql: { import: './build-src/entries/modeSql.js', filename: 'codemirror/js/codemirror.mode.sql.min.js' },
        modeHtml: { import: './build-src/entries/modeHtml.js', filename: 'codemirror/js/codemirror.mode.htmlmixed.min.js' },
        modePHP: { import: './build-src/entries/modePHP.js', filename: 'codemirror/js/codemirror.mode.php.min.js' },
        modeJs: { import: './build-src/entries/modeJs.js', filename: 'codemirror/js/codemirror.mode.javascript.min.js' },
        addons: { import: './build-src/entries/addons.js', filename: 'codemirror/js/codemirror.addons.min.js' },
        addonSearch: { import: './build-src/entries/addonSearch.js', filename: 'codemirror/js/codemirror.addons.search.min.js' },
        beautify: { import: './build-src/entries/beautify.js', filename: 'codemirror/js/beautify.min.js' },
        modeBBCode: { import: './build-src/entries/modeBBCode.js', filename: 'codemirror/js/codemirror.mode.bbcode.min.js' },
        modeBBCodeMixed: { import: './build-src/entries/modeBBCodeMixed.js', filename: 'codemirror/js/codemirror.mode.bbcodemixed.min.js' },
        mergeAddon: { import: './build-src/entries/mergeAddon.js', filename: 'codemirror/js/codemirror.addon.merge.min.js' },
        // Throwaway JS chunk mini-css-extract-plugin requires per CSS entry;
        // the real output is the extracted CSS file below. Kept outside the
        // committed codemirror/ tree and gitignored.
        styles: { import: './build-src/entries/styles.js', filename: '.webpack-tmp/styles-entry.js' }
    },
    output: {
        path: __dirname,
        clean: false
    },
    externalsType: 'window',
    externals: [
        ({ request }, callback) => {
            if (/\/lib\/codemirror$/.test(request)) {
                return callback(null, 'CodeMirror');
            }
            callback();
        }
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, import: false } }
                ]
            }
        ]
    },
    plugins: [
        // beautify-html.js unconditionally requires beautify-css.js; the
        // Gruntfile excluded it (`paths: {'beautify-css': 'empty:'}`) since
        // this plugin never needs CSS beautification.
        new webpack.NormalModuleReplacementPlugin(
            /beautify-css\.js$/,
            path.resolve(__dirname, 'build-src/stubs/beautify-css-stub.js')
        ),
        new MiniCssExtractPlugin({ filename: 'codemirror/css/codemirror.min.css' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'node_modules/codemirror/addon', to: 'codemirror/js/addon' },
                { from: 'node_modules/codemirror/mode', to: 'codemirror/js/mode' },
                { from: 'node_modules/codemirror/theme', to: 'codemirror/theme' }
            ]
        }),
        new webpack.BannerPlugin({
            footer: true,
            raw: true,
            test: /\.js$/,
            banner: (data) => FOOTERS[data.chunk.name] || ''
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({ exclude: COPIED_ASSETS }),
            new CssMinimizerPlugin({ exclude: COPIED_ASSETS })
        ]
    }
};

module.exports = function(grunt) {

	var yuiCompressor = require('./lib/yui-compressor.js').init(grunt);

	grunt.registerMultiTask('min', 'Minify JavaScript files with YUI Compressor.', function() {
		var done = this.async();
		var files = this.files;
		var length = files.length;
		var count = 0;
		var options = this.options({
			'report': 'gzip'
		});
		files.forEach(function(file) {
			yuiCompressor({
				'type': 'js',
				'source': file.src,
				'destination': file.dest,
				'fn': function() {
					if (++count == length) {
						done();
					}
				},
				'report': options.report
			});
		});
	});

	grunt.registerMultiTask('cssmin', 'Minify CSS files with YUI Compressor.', function() {
		var done = this.async();
		var files = this.files;
		var length = files.length;
		var count = 0;
		var options = this.options({
			'report': 'gzip'
		});
		files.forEach(function(file) {
			yuiCompressor({
				'type': 'css',
				'source': file.src,
				'destination': file.dest,
				'fn': function() {
					if (++count == length) {
						done();
					}
				},
				'report': options.report
			});
		});
	});

};

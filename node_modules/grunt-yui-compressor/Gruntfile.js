module.exports = function(grunt) {

	grunt.initConfig({
		'min': {
			'dist': {
				'options': {
					'report': 'gzip'
				},
				'files': [{
					'src': 'examples/example.js',
					'dest': 'examples/example.min.js'
				}]
			}
		},
		'cssmin': {
			'dist': {
				'options': {
					'report': false
				},
				'files': [{
					'src': 'examples/example.css',
					'dest': 'examples/example.min.css'
				}]
			}
		},
		'lint': {
			'files': ['gruntFile.js', 'tasks/*.js', 'tasks/lib/*.js']
		}
	});

	grunt.loadTasks('tasks');

	grunt.registerTask('default', [
		'min',
		'cssmin'
	]);

};

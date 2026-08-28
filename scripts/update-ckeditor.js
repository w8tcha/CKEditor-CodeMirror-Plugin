#!/usr/bin/env node
// Syncs the ckeditor/ folder with the version of ckeditor4 installed in node_modules.
'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const sourceDir = path.join(rootDir, 'node_modules', 'ckeditor4');
const targetDir = path.join(rootDir, 'ckeditor');

// npm packaging files that aren't needed by the website.
const EXCLUDE = new Set(['package.json', 'bower.json', 'composer.json']);

// The "codemirror" plugin is this project's own plugin (not part of the
// ckeditor4 package) and must survive every sync.
const PRESERVE_PLUGINS = ['codemirror'];

if (!fs.existsSync(sourceDir)) {
	console.error('ckeditor4 not found in node_modules. Run "npm install" first.');
	process.exit(1);
}

const { version } = require(path.join(sourceDir, 'package.json'));

const backupDir = fs.mkdtempSync(path.join(require('os').tmpdir(), 'ckeditor-update-'));
for (const plugin of PRESERVE_PLUGINS) {
	const pluginDir = path.join(targetDir, 'plugins', plugin);
	if (fs.existsSync(pluginDir)) {
		fs.cpSync(pluginDir, path.join(backupDir, plugin), { recursive: true });
	}
}

fs.rmSync(targetDir, { recursive: true, force: true });

fs.cpSync(sourceDir, targetDir, {
	recursive: true,
	filter: (src) => !EXCLUDE.has(path.basename(src))
});

for (const plugin of PRESERVE_PLUGINS) {
	const backupPluginDir = path.join(backupDir, plugin);
	if (fs.existsSync(backupPluginDir)) {
		fs.cpSync(backupPluginDir, path.join(targetDir, 'plugins', plugin), { recursive: true });
	}
}
fs.rmSync(backupDir, { recursive: true, force: true });

console.log(`ckeditor/ updated to ckeditor4 v${version} (preserved plugins: ${PRESERVE_PLUGINS.join(', ')})`);

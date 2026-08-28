#!/usr/bin/env node
// Syncs ckeditor/plugins/codemirror with the built plugin in codemirror/ on the master branch.
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const targetDir = path.join(rootDir, 'ckeditor', 'plugins', 'codemirror');
const SOURCE_REF = 'origin/master';
const SOURCE_PATH = 'codemirror';

function git(args) {
	return execFileSync('git', args, { cwd: rootDir });
}

git(['fetch', 'origin', 'master', '--quiet']);

let listing;
try {
	listing = git(['ls-tree', '-r', `${SOURCE_REF}:${SOURCE_PATH}`]).toString('utf8');
} catch (err) {
	console.error(`Could not read "${SOURCE_PATH}/" from ${SOURCE_REF}.`);
	process.exit(1);
}

const files = listing
	.trim()
	.split('\n')
	.filter(Boolean)
	.map((line) => {
		// <mode> SP <type> SP <hash> TAB <path>
		const [meta, filePath] = line.split('\t');
		const hash = meta.split(' ')[2];
		return { hash, filePath };
	});

if (files.length === 0) {
	console.error(`No files found under "${SOURCE_PATH}/" on ${SOURCE_REF}.`);
	process.exit(1);
}

fs.rmSync(targetDir, { recursive: true, force: true });

for (const { hash, filePath } of files) {
	const destPath = path.join(targetDir, filePath);
	fs.mkdirSync(path.dirname(destPath), { recursive: true });
	fs.writeFileSync(destPath, git(['cat-file', 'blob', hash]));
}

const { version } = JSON.parse(git(['show', `${SOURCE_REF}:package.json`]).toString('utf8'));

console.log(`ckeditor/plugins/codemirror updated to v${version} from ${SOURCE_REF}`);

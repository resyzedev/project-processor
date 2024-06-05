#!/usr/bin/env node

const ProjectProcessor = require("../index");

const projectDir = process.cwd();

// add extra files to ignore (pass as arguments when creating class instance)
const additionalIgnores = process.argv.slice(2);

const projectProcessor = new ProjectProcessor(projectDir, additionalIgnores);
projectProcessor.generateOutput();

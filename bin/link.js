#!/usr/bin/env node
"use strict";

const fs = require('fs');
const globSync = require('glob').sync;
const execSync = require('child_process').execSync;
const intersect = require('intersect');
const path = require('path');
const resolveFrom = require('resolve-from');

const LINK_COMMAND = 'yarn link';
const VM_PKGS = [
  '@glimmer/compiler',
  '@glimmer/interfaces',
  '@glimmer/object',
  '@glimmer/object-reference',
  '@glimmer/reference',
  '@glimmer/runtime',
  '@glimmer/syntax',
  '@glimmer/util',
  '@glimmer/wire-format'
];
const CACHE = VM_PKGS.reduce((memo, pkg) => {
  memo[pkg] = null;
  return memo;
}, {});

const allPackages = process.argv.slice(2);

let vmIndex = allPackages.indexOf('@glimmer/vm');
if (vmIndex > -1) {
  allPackages.splice(vmIndex, 1, ...VM_PKGS);
}
allPackages.forEach(pkg => link(pkg, process.cwd()));

function link(name, cwd) {
  let packageJSON = require(path.join(cwd, 'package'));

  if (!Object.assign({}, packageJSON.dependencies, packageJSON.devDependencies)[name]) {
    return;
  }

  let command = `${LINK_COMMAND} ${name}`;

  console.log(cwd, ':', command);
  execSync(command, { cwd });

  // Bail out of linking dependencies if we've already been here.
  if (CACHE[name] === null) {
    return;
  }
  CACHE[name] = null;

  let linkedPackageDir = path.dirname(resolveFrom(cwd, path.join(name, 'package')));
  let dependencies = buildDependencies(linkedPackageDir);

  dependencies.forEach(dep => link(dep, linkedPackageDir));
}

function buildDependencies(dir) {
  let packageJSON = require(path.join(dir, 'package'));
  let dependencies = [];

  if (packageJSON.dependencies) {
    dependencies = dependencies.concat(Object.keys(packageJSON.dependencies));
  }
  if (packageJSON.devDependencies) {
    dependencies = dependencies.concat(Object.keys(packageJSON.devDependencies));
  }

  return intersect(dependencies, allPackages);
}

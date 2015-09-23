#!/usr/bin/env node

/**
 * Install script.
 *
 * Run by npm as the post-install step. This file is an ES5 wrapper around
 * lib/Install.js to avoid transpiling this executable.
 */
require('./lib/Installer').install()

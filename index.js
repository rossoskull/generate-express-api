#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const chalk = require('chalk')

// Get arguments
const [, node_bin, dir] = process.argv
console.log(process.argv)

const template_dir = path.join(__dirname, 'template')
// Read template files
const server = fs.readFileSync(path.join(template_dir, 'server.js')).toString()
const package = fs.readFileSync(path.join(template_dir, 'package.json')).toString()
const login = fs.readFileSync(path.join(template_dir, 'api', 'routes', 'login.js')).toString()
const register = fs.readFileSync(path.join(template_dir, 'api', 'routes', 'register.js')).toString()
const connection = fs.readFileSync(path.join(template_dir, 'api', 'db', 'connection.js')).toString()
const User = fs.readFileSync(path.join(template_dir, 'api', 'db', 'models', 'User.js')).toString()

// Create directories
let base_path = path.join(process.cwd())
if ( dir !== '.' ) { base_path = path.join(base_path, dir) }

// Main function
const main = () => {
    console.log('This is the main function')
}

main()
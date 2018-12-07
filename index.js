#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const chalk = require('chalk')

// Get arguments
const [, node_bin, dir] = process.argv
if (dir === undefined) {
    console.log(chalk.red('Please specify a directory where you would like to install the files.'))
    process.exit()
}

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
mkdirp.sync(path.join(base_path, 'api'))
console.log(chalk.green('Created directory ') + chalk.yellow('api'))

mkdirp.sync(path.join(base_path, 'api', 'db'))
console.log(chalk.green('Created directory ') + chalk.yellow('api/db'))

mkdirp.sync(path.join(base_path, 'api', 'routes'))
console.log(chalk.green('Created directory ') + chalk.yellow('api/routes'))

mkdirp.sync(path.join(base_path, 'api', 'db', 'models'))
console.log(chalk.green('Created directory ') + chalk.yellow('api/db/routes'))

console.log(chalk.green.bold('Created all directories.'))

// Write to files
fs.writeFileSync(path.join(base_path, 'server.js'), server)
console.log(chalk.green('Created file ') + chalk.yellow('api/server.js'))
fs.writeFileSync(path.join(base_path, 'package.json'), package)
console.log(chalk.green('Created file ') + chalk.yellow('api/package.json'))
fs.writeFileSync(path.join(base_path, 'api', 'routes', 'login.js'), login)
console.log(chalk.green('Created file ') + chalk.yellow('api/routes/login.js'))
fs.writeFileSync(path.join(base_path, 'api', 'routes', 'register.js'), register)
console.log(chalk.green('Created file ') + chalk.yellow('api/routes/register.js'))
fs.writeFileSync(path.join(base_path, 'api', 'db', 'connection.js'), connection)
console.log(chalk.green('Created file ') + chalk.yellow('api/db/connection.js'))
fs.writeFileSync(path.join(base_path, 'api', 'db', 'models', 'User.js'), User)
console.log(chalk.green('Created file ') + chalk.yellow('api/db/models/User.js'))
console.log(chalk.green.bold('Created all files.'))
console.log('You can now install the dependencies using npm install')
console.log(chalk.cyan.bold('\n\nThank you for using generate-express-api'))
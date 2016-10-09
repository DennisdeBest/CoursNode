#!/usr/bin/node
const program = require('commander')
const scrapper = require('./scrapper.js')
const reader = require('./reader.js')

program
.version('1.0.0')
.option('-w, --world', 'Show hello world')
.option('-r, --read [number]', 'Show available articles')
.option('-s, --scrap', 'Scrap SudOuest.fr')
// On parse (convertit en format utilisable) les options
// fonction synchrone
program.parse(process.argv)

if (program.world) {
console.log('Hello world!')
} else if (program.read) {
	console.log(program.read);
	if(program.read == true) {
		reader.list();
	}
	else {
		if(isNaN(program.read)){
			console.log("not a valid number")
		}
		else {
			reader.one(program.read);
		}
	}
} else if (program.scrap) {
scrapper.run();
} else {
program.help()
}
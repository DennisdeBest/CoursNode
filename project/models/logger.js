const fs = require ('fs')
const path = require('path')

var logger = function(){
	this.dir = path.join(__dirname,"..", "logs/");
}

logger.info = function(message){
		console.log(this.dir);
		console.log(message);
}

module.exports = logger;
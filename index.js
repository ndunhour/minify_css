
var fs = require('fs');  // read file as a readeable stream
var Transform = require('stream').Transform;
var inherits = require('util').inherits;

function Minify(){
  Transform.call(this);
}
// taking the Minify class and tranforms it into a transform stream
inherits(Minify, Transform);

// a method called by the stream
Minify.prototype._transform = function (chunk, enc, done) {
  // removes retruns, new line, and extra spaces
  chunk = chunk.toString().replace(/(\r\n|\n|\r|\s)/gm,"");
  // pushes the revised chunk into this
  this.push(chunk);
  // indicates when process is done
  done();
};

// original file
var read = fs.createReadStream('app.css');

// new file with the condensed file
var write = fs.createWriteStream('app.min.css');

// read original file and move it through Minify function and move it to write file
read.pipe(new Minify()).pipe(write);

/*
references
  https://www.youtube.com/watch?v=yOSNQZm3Trw,
  http://www.textfixer.com/tutorials/javascript-line-breaks.php
    someText = someText.replace(/(\r\n|\n|\r)/gm," ");,
*/

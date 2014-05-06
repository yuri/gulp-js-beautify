// Adapted from 'gulp-beautify';
var eventStream = require('event-stream');
var beautify = require('js-beautify').js_beautify;

module.exports = function(options){
  return eventStream.map(function (file, done){
    var fileContent;
    var beautified;

    if (file.isNull()) {
      return done(null, file); // pass along
    }
    if (file.isStream()) {
      return done(new Error('gulp-js-beautify: Streaming not supported'));
    }

    fileContent = file.contents.toString('utf8');
    beautified = beautify(fileContent, options);
    file.contents = new Buffer(beautified);
    done(null, file);
  });
};

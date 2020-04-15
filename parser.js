const fs = require('fs');
const es = require('event-stream')

async function parse(file) {
  return new Promise(resolve => {
    var lineNumber = 0;
    let uniqueWords = new Set();
    var stream = fs.createReadStream(file)
      .pipe(es.split())
      .pipe(es.mapSync(function (line) {
        stream.pause();
        let characterCount = 0;
        let word = "";
        while (characterCount < line.length) {
          if (line[characterCount] === " ") {
            uniqueWords.add(word);
            word = "";
          } else {
            word += line[characterCount];
          }
          characterCount += 1;
        }
        lineNumber += 1;
        stream.resume();
      })
        .on('error', function (error) {
          console.log('Error: ', error);
        })
        .on('end', function () {
          console.log('Result: ', uniqueWords)
        })
      );
  });
}

parse("./file.csv");

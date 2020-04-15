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
          switch (line[characterCount]) {
            case "a":
            case "b":
            case "c":
            case "d":
            case "e":
            case "f":
            case "g":
            case "h":
            case "i":
            case "j":
            case "k":
            case "l":
            case "m":
            case "n":
            case "o":
            case "p":
            case "q":
            case "r":
            case "s":
            case "t":
            case "u":
            case "v":
            case "w":
            case "x":
            case "y":
            case "z":
              word += line[characterCount];
              break;
            default:
              uniqueWords.add(word);
              word = "";
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

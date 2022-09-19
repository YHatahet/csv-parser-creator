const CsvParserCreator = require("../src/CsvParserCreator");

(() => {
  const parser = new CsvParserCreator(__dirname + "/data.csv", true);

  console.log(parser.getOutput(["0", "0", "0"])); // A
  console.log(parser.getOutput(["0", "1", "1"])); // D
  console.log(parser.getOutput(["1", "1", "0"])); // G
  console.log(parser.getOutput(["1", "1", "1"])); // H

  console.log(parser.getOutput(["1", "4", "1"])); // undefined - no parser exists for that path
})();

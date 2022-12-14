const CsvParserCreator = require("../src/CsvParserCreator");

(() => {
  const parser = new CsvParserCreator(__dirname + "/data.csv", true);

  console.log(parser.getOutput(["0", "0", "0"])); // A
  console.log(parser.getOutputJSON({ A: "0", B: "0", C: "0" })); // Should also print A

  console.log(parser.getOutput(["0", "1", "1"])); // D
  console.log(parser.getOutput(["1", "1", "0"])); // G
  console.log(parser.getOutput(["1", "1", "1"])); // H

  console.log(parser.getOutputJSON({ A: "0", B: "0" })); // undefined - missing header
  console.log(parser.getOutputJSON({ A: "0", B: "0", C: "4" })); // undefined - value doesn't exist

  console.log(parser.getPaths());
})();

/**
 * 
 * 
 * Example:
 * 
 * Expected input
 *   A   |   B   |   C   |   out   |
------------------------------------
 *   0   |   0   |   0   |   A     |
 *   0   |   0   |   1   |   B     |
 *   0   |   1   |   0   |   C     |
 *   0   |   1   |   1   |   D     |
 *   1   |   0   |   0   |   E     |
 *   1   |   0   |   1   |   F     |
 *   1   |   1   |   0   |   G     |
 *   1   |   1   |   1   |   H     |
 *
 * Expected Output:
 *                         option    
 *                    /              \
 *                   0                1
 *                /     \          /     \
 *               0       1        0       1
 *              / \     / \      / \     / \
 *             0   1   0   1    0   1   0   1
 *             |   |   |   |    |   |   |   |
 *             A   B   C   D    E   F   G   H
 * 
 *  Function that takes in A,B,C then emits the output based on the path.
 * 
 * Approach:
 * 1) import csv file
 * 2) Arrange each row as an array
 * 3) Create a trie from the formed arrays 
 * 4) Last column will be the answer, not a node in the trie 
 */

const CsvParserCreator = require("../src/CsvParserCreator");

(async () => {
  console.log(__dirname);
  const parser = new CsvParserCreator(__dirname + "/data.csv");
  await parser.init();

  console.log(parser.getOutput(["0", "0", "0"])); // A
  console.log(parser.getOutput(["0", "1", "1"])); // D
  console.log(parser.getOutput(["1", "1", "0"])); // G
  console.log(parser.getOutput(["1", "1", "1"])); // H

  console.log(parser.getOutput(["1", "4", "1"])); // undefined - no parser exists for that path
})();

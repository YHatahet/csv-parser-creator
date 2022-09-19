const fs = require("fs");
const Trie = require("./Trie");

class CsvParserCreator {
  /**
   *
   * @param {String} pathToCsvFile Absolute or relative path to the CSV file
   * @param {Boolean} headerExists Choosing this as true will allow you to pass in a JSON object
   *  for parsing if header actually exists, otherwise will omit the first row of the csv table.
   *
   */
  constructor(pathToCsvFile, headerExists = false) {
    this.pathToCsvFile = pathToCsvFile;
    this.trie = new Trie();
    this.headerExists = headerExists;
    const csvData = this.#readCsvFileAsArray(this.pathToCsvFile);
    if (headerExists) {
      this.order = csvData[0]; // take header row
      this.order.pop(); // remove "expected result" string
    }

    for (let i = headerExists ? 1 : 0; i < csvData.length; i++) {
      this.trie.insert(csvData[i]);
    }
  }

  /**
   *
   * @param {String[]} path array of choices
   * @return {String}
   */
  getOutput(path) {
    return this.trie.search(path)?.answer;
  }

  /**
   *
   * @param {Object} obj object containing all entries of the header and their values
   * @return {String | undefined}
   */
  getOutputJSON(obj) {
    if (!(this.headerExists === true)) return;
    const orderedInput = [];
    for (const entry of this.order) orderedInput.push(obj[entry]);
    return this.getOutput(orderedInput);
  }

  /**
   *
   * @param {String} path
   * @returns
   */
  #readCsvFileAsArray(path) {
    let data = fs.readFileSync(path, "ascii").trim(); //remove any extra lines
    data = data.split("\n"); // every line will be an entry in the array
    for (const i in data) data[i] = data[i].split(","); // each entry is split into an array
    return data;
  }
}

module.exports = CsvParserCreator;

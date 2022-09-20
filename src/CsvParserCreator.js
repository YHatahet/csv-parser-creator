const fs = require("fs");
const Trie = require("./Trie");

class CsvParserCreator {
  /**@type {String[]} */ #order = [];
  /**@type {Boolean} */ #headerExists = false;
  /**@type {Trie} */ #trie = undefined;
  /**@type {String} */ #pathToCsvFile = "";

  /**
   *
   * @param {String} pathToCsvFile Absolute or relative path to the CSV file
   * @param {Boolean} headerExists Choosing this as true will allow you to pass in a JSON object
   *  for parsing if header actually exists, otherwise will omit the first row of the csv table.
   *
   */
  constructor(pathToCsvFile, headerExists = false) {
    this.#pathToCsvFile = pathToCsvFile;
    this.#trie = new Trie();
    this.#headerExists = headerExists;
    const csvData = this.#readCsvFileAsArray(this.#pathToCsvFile);
    if (headerExists) {
      this.#order = csvData[0]; // take header row
      this.#order.pop(); // remove "expected result" string
    }

    for (let i = headerExists ? 1 : 0; i < csvData.length; i++) {
      this.#trie.insert(csvData[i]);
    }
  }

  /**
   *
   * @param {String[]} path array of choices
   * @return {String}
   */
  getOutput(path) {
    return this.#trie.search(path)?.answer;
  }

  /**
   *
   * @param {Object} obj object containing all entries of the header and their values
   * @return {String | undefined}
   */
  getOutputJSON(obj) {
    if (!(this.#headerExists === true)) return;
    const orderedInput = [];
    for (const entry of this.#order) orderedInput.push(obj[entry]);
    return this.getOutput(orderedInput);
  }

  /**
   *
   * @param {String} path
   * @returns {String[][]}
   */
  #readCsvFileAsArray(path) {
    //remove any extra lines then make every line will be an entry in the array
    const data = fs.readFileSync(path, "ascii").trim().split("\n");
    /**@type {String[][]} */ const output = [];
    for (const i in data) output[i] = data[i].split(","); // each entry is split into an array
    return output;
  }
  
  /**
   *
   * @returns {String[][]}
   */
  getPaths() {
    const output = [];
    if (this.#headerExists) output.push(this.#order.concat(["Ans"]));
    output.push(...this.#trie.getPaths());
    return output;
  }
}

module.exports = CsvParserCreator;

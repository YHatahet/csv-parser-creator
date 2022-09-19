const fs = require("fs");
const Trie = require("./Trie");

class CsvParserCreator {
  /**
   *
   * @param {String} pathToCsvFile
   * @param {Boolean} skipHeader Choosing this as true will not allow you to pass in a JSON object for parsing. //TODO ignore
   *
   */
  constructor(pathToCsvFile, skipHeader = false) {
    this.pathToCsvFile = pathToCsvFile;
    this.skipHeader = skipHeader;
    this.csvData = this.#readCsvFileAsArray(this.pathToCsvFile);
    this.trie = new Trie();

    for (const path of this.csvData) this.trie.add(path);
  }

  /**
   *
   * @param {String[] | Number[]} path
   */
  getOutput(path) {
    return this.trie.navigate(path)?.answer;
  }

  /**
   *
   * @param {String} path
   * @returns
   */
  #readCsvFileAsArray(path) {
    let data = fs.readFileSync(path, "ascii");
    data = data.split("\n"); // every line will be an entry in the array
    for (const i in data) data[i] = data[i].split(","); // each entry is split into an array
    return data;
  }
}

module.exports = CsvParserCreator;

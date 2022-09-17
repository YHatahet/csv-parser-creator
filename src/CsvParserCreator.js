const csvToJson = require("csvtojson");
const Trie = require("./Trie");

class CsvParserCreator {
  /**
   *
   * @param {String} pathToCsvFile
   * @param {Boolean} skipHeader
   */
  constructor(pathToCsvFile, skipHeader = false) {
    this.pathToCsvFile = pathToCsvFile;
    this.skipHeader = skipHeader;
    this.csvData = [];
  }
  async init() {
    await csvToJson({ output: "csv", noheader: this.skipHeader })
      .fromFile(this.pathToCsvFile)
      .then((csvRows) => {
        this.csvData = csvRows;
      });

    this.trie = new Trie();
    for (const path of this.csvData) {
      this.trie.add(path);
    }
  }

  /**
   *
   * @param {String[] | Number[]} path
   */
  getOutput(path) {
    return this.trie.navigate(path)?.answer;
  }
}

module.exports = CsvParserCreator;

class TrieNode {
  constructor() {
    this.children = {};
    this.answer;
  }
}

class Trie {
  #root;
  constructor() {
    this.#root = new TrieNode();
  }

  /**
   *
   * @param {String[] | Number[]} path
   */
  insert(path) {
    // if not array or incorrect length
    if (!(Array.isArray(path) && path.length > 1)) return;

    let currentNode = this.#root;
    const output = path.pop();

    for (const item of path) {
      if (currentNode.children[item] === undefined) {
        // if no path, create it
        currentNode.children[item] = new TrieNode(item);
      }
      // move to child node
      currentNode = currentNode.children[item];
    }
    currentNode.answer = output;
    currentNode.isEnd = true;
  }

  /**
   *
   * @param {String[]} path
   * @returns {TrieNode}
   */
  search(path) {
    // if not array or incorrect length
    if (!(Array.isArray(path) && path.length > 1)) return;
    let currentNode = this.#root;
    for (const item of path) {
      currentNode = currentNode.children[item];
      if (currentNode === undefined) return undefined; //TODO appropriate response?
    }
    return currentNode;
  }
}

module.exports = Trie;

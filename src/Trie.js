class TrieNode {
  constructor(value = undefined, children = {}) {
    this.value = value;
    this.children = children;
    this.isEnd = false;
    this.answer = undefined;
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
  add(path) {
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
   * @param {*} path 
   * @returns 
   */
  navigate(path) {
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

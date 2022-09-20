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
    const output = path.pop(); // answer is the final entry in array

    for (const item of path) {
      const { children } = currentNode;
      // if one of the children is "*", ignore input
      if (children["*"]) {
        currentNode = children["*"];
        continue;
      }

      // if no path, create it
      if (children[item] === undefined) children[item] = new TrieNode();

      // Pass children from other parents to the new "any" parent node and delete others
      if (item === "*") {
        const childrenKeys = Object.keys(children);
        for (const childKey of childrenKeys) {
          if (childKey === "*") continue;
          Object.assign(children["*"], children[childKey]);
          delete children[childKey];
        }
      }

      // move to child node
      currentNode = children[item];
    }
    // avoid overwriting answers on next iterations
    if (currentNode.answer === undefined) currentNode.answer = output;
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
      // if child has "any", take it
      currentNode = currentNode.children["*"] || currentNode.children[item];
      if (currentNode === undefined) return undefined;
    }
    return currentNode;
  }
}

module.exports = Trie;

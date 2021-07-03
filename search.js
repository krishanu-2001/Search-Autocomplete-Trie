/*---------- Implemeting trie based search auto complete feature ----------*/
/*
  Algorithm preprocesses the input stringArray []
  Creates a trie with unique ID (eg oaktree3517) for redis storage
  Search function will return set of matching strings like auto-complete
*/

const alphabet_size = 26;

class trieNode {
  constructor(value) {
    this.children = {};
    this.character = value;
    this.endNode = false;
  }

  setEndNode(boolval) {
    const setEndNodeHelper = (node, val) => {
      node.endNode = val;
    };
    setEndNodeHelper(this, boolval);
  }

  addChildren(newNode) {
    const addChildrenHelper = (node, newNode) => {
      node.children[newNode.character] = newNode;
    };
    addChildrenHelper(this, newNode);
  }
}

class trie {
  constructor() {
    this.root = new trieNode(null);
  }

  addWord(str) {
    const addWordHelper = (root, str) => {
      console.log(str);
      let i = 0;
      let curNode = root;
      while (i < str.length) {
        let flag = 0;
        const keys = Object.keys(curNode.children);

        for (let j = 0; j < keys.length; j++) {
          const cnode = curNode.children[keys[j]];
          if (cnode.character === str[i]) {
            curNode = cnode;
            flag = 1;
            break;
          }
        }
        if (flag === 0) {
          const cnode = new trieNode(str[i]);
          curNode.addChildren(cnode);
          curNode = cnode;
        }
        if (i === str.length - 1) {
          curNode.setEndNode(true);
        }
        i++;
      }
    };
    addWordHelper(this.root, str);
  }

  createTrie(stringArray) {
    const createTrieHelper = (stringArray) => {
      const root = new trieNode(null);
      stringArray.forEach((str) => {
        this.addWord(str, root);
      });
    };
    createTrieHelper(stringArray);
  }

  displayTrie() {
    const displayTrieHelper = (root, prev, top) => {
      console.log(root.character, prev.character, root.endNode);
      const keys = Object.keys(root.children);
      for (let j = 0; j < keys.length; j++) {
        const cnode = root.children[keys[j]];
        displayTrieHelper(cnode, root, top + j + 1);
      }
    };
    displayTrieHelper(this.root, this.root, this.root);
  }

  autocomplete(str) {
    const foundTrie = (root, str) => {
      let curNode = root;
      let i = 0;
      while (i < str.length) {
        if (str[i] in curNode.children) {
          curNode = curNode.children[str[i]];
          i++;
        } else {
          return undefined;
        }
      }
      return curNode;
    };

    const itemList = [];

    const itemListFinder = (str, node) => {
      // dfs like algorithm
      if (node.endNode) {
        itemList.push(str);
      }
      for (let i in node.children) {
        const child = node.children[i];
        const newstring = str + child.character;
        itemListFinder(newstring, child);
      }
    };

    const matchFoundTrie = foundTrie(this.root, str);

    if (matchFoundTrie) {
      itemListFinder(str, matchFoundTrie);
    } else {
      console.log("No Prefix match!");
    }

    return itemList;
  }
}

const data = ["baby", "food", "best"];

const oaktree3517 = new trie();
oaktree3517.createTrie(data);
oaktree3517.displayTrie();
console.log(oaktree3517.autocomplete("bab"));

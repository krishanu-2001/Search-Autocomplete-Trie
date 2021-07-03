# Search-Autocomplete-Trie
Trie based real time autocomplete algorithm in javascript.  
  
  
Run in root directory
```bash
$ node search.js
```
  
Sample data - ['baby', 'food', 'best']

### Api Documentation  
1. class **trieNode**  
```javascript
/* Data Items */ 
this.children : Dictionary;
this.character : Char;
this.endNode : Boolean;

/* Member Functions */
setEndNode(Boolean) : void  
addChildren(trieNode) : void  
```  
2. class **trie**  
```javascript
/* Data Items */ 
this.root : trieNode

/* Member Functions */
addWord(String) : void  
createTrie(string []) : void  
displayTrie(void) : void + logs  
autocomplete(string) : string []  
```
      

export class Node {
    constructor() {
      this.children = new Map(); 
      this.isEnd = false;
    }
  }
  
  export class Trie {
    constructor() {
      this.root = new Node();
    }
  
    insert(word) {
      if (!word) return; 
      
      let current = this.root;
      const normalizedWord = word.toLowerCase();
      
      for (const ch of normalizedWord) {
        if (!current.children.has(ch)) {
          current.children.set(ch, new Node());
        }
        current = current.children.get(ch);
      }
      current.isEnd = true;
    }
  
    search(word) {
      if (!word) return false;
      
      let current = this.root;
      const normalizedWord = word.toLowerCase();
      
      for (const ch of normalizedWord) {
        if (!current.children.has(ch)) return false;
        current = current.children.get(ch);
      }
      return current.isEnd;
    }
  
    suggestions(prefix, limit = 10) {
      if (!prefix) return [];
      
      const results = [];
      let current = this.root;
      const normalizedPrefix = prefix.toLowerCase();
      
      // Navigate to prefix node
      for (const ch of normalizedPrefix) {
        if (!current.children.has(ch)) return results;
        current = current.children.get(ch);
      }
      
      // DFS to collect all words with this prefix
      const dfs = (word, node) => {
        if (results.length >= limit) return; // Early exit for better performance xD
        
        if (node.isEnd) {
          results.push(word);
        }
        
        for (const [char, childNode] of node.children) {
          if (results.length >= limit) break;
          dfs(word + char, childNode);
        }
      };
      
      dfs(normalizedPrefix, current);
      return results;
    }
  
    // Check if any word starts with prefix
    hasPrefix(prefix) {
      if (!prefix) return true;
      
      let current = this.root;
      const normalizedPrefix = prefix.toLowerCase();
      
      for (const ch of normalizedPrefix) {
        if (!current.children.has(ch)) return false;
        current = current.children.get(ch);
      }
      return true;
    }
  
    // Get all words in the trie
    getAllWords() {
      const results = [];
      
      const dfs = (word, node) => {
        if (node.isEnd) results.push(word);
        
        for (const [char, childNode] of node.children) {
          dfs(word + char, childNode);
        }
      };
      
      dfs('', this.root);
      return results;
    }
  
    //Clear the trie
    clear() {
      this.root = new Node();
    }
  }
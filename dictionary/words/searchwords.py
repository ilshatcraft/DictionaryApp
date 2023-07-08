

class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False
        
class Trie:
    def __init__(self):
        self.root = TrieNode()
        
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True
        
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_word
    
    def autocomplete(self, prefix, max_distance):
        results = []
        node = self.root

    # Traverse the trie to find the node corresponding to the prefix
        for char in prefix:
          if char not in node.children:
            return results
          node = node.children[char]

    # Use depth-first search to find all words with distance <= max_distance
        stack = [(node, prefix, 0)]
        while stack:
            node, word, distance = stack.pop()
            if node.is_word and distance <= max_distance:
              results.append((word, distance))
            if distance >= max_distance:
              continue
            for char, child in node.children.items():
             new_distance = distance + (char != word[len(prefix)+distance] if len(word) > len(prefix)+distance else 1)
             stack.append((child, word+char, new_distance))

    # Sort results by distance (best match first)
        results.sort(key=lambda x: x[1])

        return [result[0] for result in results]

    
    
trie = Trie()
with open(r'E:\ILSHAT\work\python\backend\dictionary\words\english.txt', encoding='utf-8') as file:
    for line in file:
        word = line.strip()
        trie.insert(word)
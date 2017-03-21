(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "goodOne.json": {
    "alice": [1],
    "falls": [1],
    "and": [1],
    "enters": [1],
    "a": [1,3],
    "world": [1],
    "an": [2],
    "unusual": [2],
    "alliance": [2],
    "of": [2],
    "man": [2],
    "rabbit": [3],
    "with": [3],
    "wizarding": [3],
    "powers": [3]
  },
  "goodThree.json": {
    "full": [1],
    "of": [1],
    "imagination": [1],
    "a": [2,3],
    "powerful": [2],
    "ring": [2],
    "rabbit": [3],
    "with": [3],
    "an": [3],
    "usual": [3],
    "spoon": [3]
  },
  "goodTwo.json": {
    "a": [1,3],
    "rabbit": [1],
    "hole": [1],
    "man": [2],
    "elf": [2],
    "dwarf": [2],
    "wizard": [2],
    "and": [2,3],
    "hobbit": [2],
    "alice": [3],
    "falls": [3],
    "enters": [3],
    "world": [3],
    "imagination": [4],
    "of": [4],
    "an": [4],
    "usual": [4],
    "spoon": [4]
  }
}
},{}],2:[function(require,module,exports){
/* eslint-disable no-undef */

const invalidKeys = require('./invalidKeys.json'); // bad content
const validBook = require('./validBook.json'); // good content
const fileTextString = require('./fileTextString.json'); // text objects
const fileTextArray = require('./fileTextArray.json'); // text Arrays
const allText = require('./allText.json'); // search object

const invertedIndex = new InvertedIndex();
describe('INVERTED INDEX CLASS TESTS', () => {
  describe('Inverted Index classes', () => {
    it('should check that it the class has a createIndex method', () => {
      expect(typeof InvertedIndex.prototype.createIndex).toBe('function');
    });

    it('should check that class has a validateContent method', () => {
      expect(typeof InvertedIndex.validateContent).toBe('function');
    });

    it('should check that it has a normalizeAllText method', () => {
      expect(typeof InvertedIndex.prototype.normalizeAllText).toBe('function');
    });

    it('should check that it has a normalizeAllText method', () => {
      expect(typeof InvertedIndex.normalizeText).toBe('function');
    });

    it('should check that it has a populateIndex method', () => {
      expect(typeof InvertedIndex.prototype.populateIndex).toBe('function');
    });

    it('should check that it has a searchIndex method', () => {
      expect(typeof InvertedIndex.prototype.searchIndex).toBe('function');
    });
  });

  describe('Search Index Function', () => {
    it('should return undefined for words not in book', () => {
      expect(invertedIndex.searchIndex(
        'enters,alliance, truck', 'goodOne.json', allText))
        .toEqual(
        {
          enters: [1],
          alliance: [2],
          truck: undefined
        }
        );
    });
    it('should return undefined for words not in each book in file', () => {
      expect(invertedIndex.searchIndex(
        'alice,full,power,powerfull, magnificent', 'All', allText))
        .toEqual(
        {
          'goodOne.json': [
            {
              alice: [1],
              full: undefined,
              power: undefined,
              powerfull: undefined,
              magnificent: undefined
            }
          ],
          'goodThree.json': [
            {
              alice: undefined,
              full: [1],
              power: undefined,
              powerfull: undefined,
              magnificent: undefined
            }
          ],
          'goodTwo.json': [
            {
              alice: [3],
              full: undefined,
              power: undefined,
              powerfull: undefined,
              magnificent: undefined
            }
          ]
        }
        );
    });
  });

  describe('Populate Index Function', () => {
    it('should return an object with all words and their respective indexes',
    () => {
      expect(invertedIndex.populateIndex(fileTextArray))
        .toEqual(
        {
          a: [1, 3],
          rabbit: [1],
          hole: [1],
          man: [2],
          elf: [2],
          dwarf: [2],
          wizard: [2],
          and: [2, 3],
          hobbit: [2],
          alice: [3],
          falls: [3],
          enters: [3],
          world: [3],
          imagination: [4],
          of: [4],
          an: [4],
          usual: [4],
          spoon: [4]
        }
        );
    });
  });

  describe('Normalize Text Function', () => {
    it("should separate words, remove special characters and possesive ('s)",
    () => {
      expect(InvertedIndex.normalizeText(fileTextString))
        .toEqual(
        {
          1: ['a', 'rabbit', 'with', 'an', 'usual', 'spoon'],
          2: ['full', 'of', 'imagination'],
          3: ['an', 'unusual', 'alliance', 'of', 'man']
        }
        );
    });
  });

  describe('Normalize All Text Function', () => {
    it('should return an array with all words from all books', () => {
      expect(invertedIndex.normalizeAllText(fileTextArray))
        .toEqual(
        ['a', 'rabbit', 'hole', 'man', 'elf', 'dwarf', 'wizard',
        'and', 'hobbit', 'alice', 'falls', 'and', 'enters', 'a',
        'world', 'imagination', 'of', 'an', 'usual', 'spoon']
        );
    });
  });

  describe('Create Function', () => {
    it('should return an object with all words and their respective indexes',
    () => {
      expect(invertedIndex.createIndex(validBook, 'validBook.json'))
        .toEqual(
        {
          alice: [1],
          falls: [1],
          and: [1],
          enters: [1],
          a: [1, 3],
          world: [1],
          an: [2],
          unusual: [2],
          alliance: [2],
          of: [2],
          man: [2],
          rabbit: [3],
          with: [3],
          wizarding: [3],
          powers: [3]
        }
        );
    });
  });

  describe('Validate Content Function', () => {
    it('should return true when given a valid book as input', () => {
      expect(InvertedIndex.validateContent(validBook))
        .toBe(true);
    });
    it('should return false when given an invalid book as input', () => {
      expect(InvertedIndex.validateContent(invalidKeys))
        .toBe(false);
    });
  });
});

},{"./allText.json":1,"./fileTextArray.json":3,"./fileTextString.json":4,"./invalidKeys.json":5,"./validBook.json":6}],3:[function(require,module,exports){
module.exports={
    "1":["a","rabbit","hole"],
    "2":["man","elf","dwarf","wizard","and","hobbit"],
    "3":["alice","falls","and","enters","a","world"],
    "4":["imagination","of","an","usual","spoon"]
}
},{}],4:[function(require,module,exports){
module.exports={
    "1": "A rabbit with an usual spoon.",
    "2": "full of imagination.",
    "3": "An unusual alliance of man"
}
},{}],5:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "textis": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "title": "Marvel's agents of sheild.",
    "text": "A rabbit with wizarding powers and an imagination of an usual spoon."
  }
]
},{}],6:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice",
    "text": "Alice falls and enters a world ."
  },

  {
    "title": "The Fellowship of the Ring.",
    "text": "An unusual alliance of man"
  },
  {
    "title": "Marvel's .",
    "text": "A rabbit with wizarding powers."
  }
]
},{}]},{},[2])
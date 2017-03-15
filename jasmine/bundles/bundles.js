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
module.exports={
  "goodOne.json": {
    "1": "Alice",
    "2": "The Fellowship of the Ring.",
    "3": "Marvel's ."
  },
  "goodThree.json": {
    "1": "Wonderland",
    "2": "The Lord.",
    "3": "agents of sheild."
  },
  "goodTwo.json": {
    "1": "Aliceland",
    "2": "Rings: The Fellowship.",
    "3": "Alice",
    "4": "agents."
  }
}
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },

  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  },
  {
    "titl": "Marvel's agents of sheild.",
    "tex": "A rabbit with wizarding powers and an imagination of an usual spoon."
  }
]
},{}],5:[function(require,module,exports){
module.exports=[]
},{}],6:[function(require,module,exports){
// bad content
const badOne = require('./badOne.json');
const badTwo = require('./badTwo.json');
// good content
const goodOne = require('./goodOne.json');
const goodTwo = require('./goodTwo.json');
const goodThree = require('./goodThree.json');
// empty
const empty = require('./empty.json');
// text objects
const textObjOne = require('./textObjOne.json');
const textObjTwo = require('./textObjTwo.json');
// text Arrays
const textArrayOne = require('./textArrayOne.json');
const textArrayTwo = require('./textArrayTwo.json');
// text objects with array values
const textObjWordArrayOne = require('./textObjWordArrayOne.json');
const textObjWordArrayTwo = require('./textObjWordArrayTwo.json');
// search objects
const allText = require('./allText.json');
const allTitles = require('./allTitles.json');


const invertedIndex = new InvertedIndex();
describe('INVERTED INDEX CLASS TESTS', () => {
  describe('Inverted Index classes', () => {
    it('should check that it the class has a createIndex method', () => {
      expect(typeof InvertedIndex.prototype.createIndex).toBe('function');
    });

    it('should check that class has a getIndex method', () => {
      expect(typeof InvertedIndex.validateContent).toBe('function');
    });

    it('should check that it has a searchIndex method', () => {
      expect(typeof InvertedIndex.prototype.transformToArray).toBe('function');
    });

    it('should check that it has a searchIndex method', () => {
      expect(typeof InvertedIndex.transformToSingles).toBe('function');
    });

    it('should check that it has a searchIndex method', () => {
      expect(typeof InvertedIndex.prototype.tokenize).toBe('function');
    });

    it('should check that it has a searchIndex method', () => {
      expect(typeof InvertedIndex.prototype.searchIndex).toBe('function');
    });
  });

  describe('Searh Index Function', () => {
    it('should return an object with undefined for words not in book as value', () => {
      expect(invertedIndex.searchIndex('enters,alliance, truck', 'goodOne.json', allText))
        .toEqual(
        {
          enters: [1],
          alliance: [2],
          truck: undefined
        }
        );
    });
    it('should return an object with name of books and undefined for words not in book as value', () => {
      expect(invertedIndex.searchIndex('alice,full,power,powerfull, magnificent', 'All', allText))
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

  describe('Tokenize Function', () => {
    it('should return an object with all words as keys and the indexes', () => {
      expect(invertedIndex.tokenize(textObjWordArrayOne))
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
    it('should return an object with all words as keys and the indexes', () => {
      expect(invertedIndex.tokenize(textObjWordArrayTwo))
        .toEqual(
        {
          full: [1],
          of: [1],
          imagination: [1],
          a: [2, 3],
          powerful: [2],
          ring: [2],
          rabbit: [3],
          with: [3],
          an: [3],
          usual: [3],
          spoon: [3]
        }
        );
    });
  });

  describe('Transform To Array Function', () => {
    it('should return an object with all words in array', () => {
      expect(invertedIndex.transformToArray(textArrayOne))
        .toEqual(
        ['a', 'rabbit', 'with', 'an', 'usual', 'spoon', 'full',
          'of', 'imagination', 'an', 'unusual', 'alliance', 'of', 'man']
        );
    });
    it('should return an object with all words in array', () => {
      expect(invertedIndex.transformToArray(textArrayTwo))
        .toEqual(
        ['man', 'elf', 'dwarf', 'wizard', 'and', 'hobbit', 'full', 'of',
          'imagination', 'imagination', 'of', 'an', 'usual', 'spoon']
        );
    });
  });

  describe('Transform To Singles Function', () => {
    it('should return an object with all words in an array', () => {
      expect(InvertedIndex.transformToSingles(textObjOne))
        .toEqual(
        {
          1: ['a', 'rabbit', 'with', 'an', 'usual', 'spoon'],
          2: ['full', 'of', 'imagination'],
          3: ['an', 'unusual', 'alliance', 'of', 'man']
        }
        );
    });
    it('should return an object with all words in an array', () => {
      expect(InvertedIndex.transformToSingles(textObjTwo))
        .toEqual(
        {
          1: ['man', 'elf', 'dwarf', 'wizard', 'and', 'hobbit'],
          2: ['full', 'of', 'imagination'],
          3: ['imagination', 'of', 'an', 'usual', 'spoon']
        }
        );
    });
  });

  describe('Create Function', () => {
    it('should return an object with all words tokenized', () => {
      expect(invertedIndex.createIndex(goodOne, 'goodOne.json'))
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
    it('should return an object with all words tokenized', () => {
      expect(invertedIndex.createIndex(goodTwo))
        .toEqual(
        {
          a: [1, 3],
          rabbit: [1],
          hole: [1],
          and: [2, 3],
          man: [2],
          elf: [2],
          dwarf: [2],
          wizard: [2],
          hobbit: [2],
          alice: [3],
          falls: [3],
          enters: [3],
          world: [3],
          an: [4],
          of: [4],
          imagination: [4],
          usual: [4],
          spoon: [4]
        }
        );
    });
  });

  describe('Validate Content Function', () => {
    it('should return true when given a valid book as input', () => {
      expect(InvertedIndex.validateContent(goodOne))
        .toBe(true);
    });
    it('should return true when given a valid book as input', () => {
      expect(InvertedIndex.validateContent(goodTwo))
        .toBe(true);
    });
    it('should return true when given a valid book as input', () => {
      expect(InvertedIndex.validateContent(goodThree))
        .toBe(true);
    });
    it('should return false when given an invalid book as input', () => {
      expect(InvertedIndex.validateContent(badOne))
        .toBe(false);
    });
    it('should return false when given an invalid book as input', () => {
      expect(InvertedIndex.validateContent(badTwo))
        .toBe(false);
    });
  });
});

},{"./allText.json":1,"./allTitles.json":2,"./badOne.json":3,"./badTwo.json":4,"./empty.json":5,"./goodOne.json":7,"./goodThree.json":8,"./goodTwo.json":9,"./textArrayOne.json":10,"./textArrayTwo.json":11,"./textObjOne.json":12,"./textObjTwo.json":13,"./textObjWordArrayOne.json":14,"./textObjWordArrayTwo.json":15}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
module.exports=[
  {
    "title": "Wonderland",
    "text": "full of imagination."
  },

  {
    "title": "The Lord.",
    "text": "a powerful ring."
  },
  {
    "title": "agents of sheild.",
    "text": "A rabbit with an usual spoon."
  }
]
},{}],9:[function(require,module,exports){
module.exports=[
  {
    "title": "Aliceland",
    "text": "a rabbit hole."
  },
  {
    "title": "Rings: The Fellowship.",
    "text": "man, elf, dwarf, wizard and hobbit"
  },
  {
    "title": "Alice",
    "text": "Alice falls and enters a world ."
  },
  {
    "title": "agents.",
    "text": "imagination of an usual spoon."
  }
]
},{}],10:[function(require,module,exports){
module.exports={ 
    "1": [ "a", "rabbit", "with", "an", "usual", "spoon" ], 
    "2": [ "full", "of", "imagination" ], 
    "3": [ "an", "unusual", "alliance", "of", "man" ] 
}
},{}],11:[function(require,module,exports){
module.exports={ 
    "1": [ "man", "elf", "dwarf", "wizard", "and", "hobbit" ], 
    "2": [ "full", "of", "imagination" ], 
    "3": [ "imagination", "of", "an", "usual", "spoon" ]
}

},{}],12:[function(require,module,exports){
module.exports={
    "1": "A rabbit with an usual spoon.",
    "2": "full of imagination.",
    "3": "An unusual alliance of man"
}
},{}],13:[function(require,module,exports){
module.exports={
    "1": "man, elf, dwarf, wizard and hobbit",
    "2": "full of imagination.",
    "3": "imagination of an usual spoon."
}
},{}],14:[function(require,module,exports){
module.exports={
    "1":["a","rabbit","hole"],
    "2":["man","elf","dwarf","wizard","and","hobbit"],
    "3":["alice","falls","and","enters","a","world"],
    "4":["imagination","of","an","usual","spoon"]
}
},{}],15:[function(require,module,exports){
module.exports={
    "1":["full","of","imagination"],
    "2":["a","powerful","ring"],
    "3":["a","rabbit","with","an","usual","spoon"]
}
},{}]},{},[6])
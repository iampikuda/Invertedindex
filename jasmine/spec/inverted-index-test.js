// bad content
const invalidKeysOne = require('./invalidKeysOne.json');
const invalidKeysTwo = require('./invalidKeysTwo.json');
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

    it('should check that class has a validateContent method', () => {
      expect(typeof InvertedIndex.validateContent).toBe('function');
    });

    it('should check that it has a normalizeAllText method', () => {
      expect(typeof InvertedIndex.prototype.normalizeAllText).toBe('function');
    });

    it('should check that it has a normalizeText method', () => {
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
      expect(invertedIndex.searchIndex('enters,alliance, truck', 'goodOne.json', allText))
        .toEqual(
        {
          enters: [1],
          alliance: [2],
          truck: undefined
        }
        );
    });
    it('should return undefined for words not in book', () => {
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

  describe('Populate Index Function', () => {
    it('should return an object with all words and their respective indexes', () => {
      expect(invertedIndex.populateIndex(textObjWordArrayOne))
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
    it('should return an object with all words and their respective indexes', () => {
      expect(invertedIndex.populateIndex(textObjWordArrayTwo))
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
    it('should return array with all words', () => {
      expect(invertedIndex.normalizeAllText(textArrayOne))
        .toEqual(
        ['a', 'rabbit', 'with', 'an', 'usual', 'spoon', 'full',
          'of', 'imagination', 'an', 'unusual', 'alliance', 'of', 'man']
        );
    });
    it('should return array with all words', () => {
      expect(invertedIndex.normalizeAllText(textArrayTwo))
        .toEqual(
        ['man', 'elf', 'dwarf', 'wizard', 'and', 'hobbit', 'full', 'of',
          'imagination', 'imagination', 'of', 'an', 'usual', 'spoon']
        );
    });
  });

  describe('Transform To Singles Function', () => {
    it('should return an object with all words in an array separated by book', () => {
      expect(InvertedIndex.normalizeText(textObjOne))
        .toEqual(
        {
          1: ['a', 'rabbit', 'with', 'an', 'usual', 'spoon'],
          2: ['full', 'of', 'imagination'],
          3: ['an', 'unusual', 'alliance', 'of', 'man']
        }
        );
    });
    it('should return an object with all words in an array separated by book', () => {
      expect(InvertedIndex.normalizeText(textObjTwo))
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
    it('should return an object with all words and their respective indexes', () => {
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
    it('should return an object with all words and their respective indexes', () => {
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
      expect(InvertedIndex.validateContent(invalidKeysOne))
        .toBe(false);
    });
    it('should return false when given an invalid book as input', () => {
      expect(InvertedIndex.validateContent(invalidKeysTwo))
        .toBe(false);
    });
  });
});

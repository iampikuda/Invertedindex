class InvertedIndex {

// readFile: Reads the data from the file being uploaded
// validateFile: Ensures all the documents in a particular file is valid........
// tokenize: Strips out special characters from documents to be indexed 
// createIndex: Creates the index for documents.......
// getIndex: Get’s indices created for particular files
// searchIndex: Searches through one or more indices for words

  constructor() {
    this.index = {};
    this.documentWholeText = {};
    this.documentWholeTitle = {};
    this.documentRange = {};
    this.all = false;
    this.get = false;
    this.search = false;
  };

  validateContent (file) {
    if (typeof (file) === 'object') {
      // if ()
      for (let i in file) {
        if (typeof (file[i].title) === 'undefined' || typeof (file[i].text) === 'undefined') {
          return false;
        };
      };
      return true;
    };
    return false;
  };

  createIndex (file, fileName) {

    const titleObj = {};
    const textObj = {};

    let count = 1;

    file.forEach((book) => {
      titleObj[count] = book.title
      textObj[count] = book.text
      count++
    });

    this.transformToSingles(textObj);
    this.tokenize(textObj);
    this.documentWholeText[fileName] = this.tokenize(textObj);
    this.documentWholeTitle[fileName] = titleObj;
    return this.tokenize(textObj);
  };

  transformToSingles(file) {
    Object.keys(file).forEach((words) => {
      file[words] = file[words].replace(/'\w+\s/g, " ").replace(/[.,/#!+$%^&@*?;:'{}=\-_`~()]/g, '').trim().toLowerCase().split(' ')
    });
    return file
  };

  transformToArray(file) {
    this.textArray = [];
    Object.keys(file).forEach((key) => {
      this.textArray = this.textArray.concat(file[key]);
    });
    return this.textArray;
  };

  tokenize(obj) {
    let wordArray = this.transformToArray(obj);
    this.wordSet = new Set(wordArray);
    this.wordSet = Array.from(this.wordSet).sort();

    this.index = {};
    Object.keys(obj).forEach((key) => {
      wordArray.forEach((word) => {
        if (obj[key].includes(word)) {
          if (this.index[word] === undefined) {
            this.index[word] = [];
            this.index[word].push(parseInt(key));
          } else if (this.index[word].includes(parseInt(key))) {
            return;
          } else {
            this.index[word].push(parseInt(key));
          };
        } else {
          return;
        }
      });
    });
    return this.index;
  };

  searchIndex(words, indexedFile, allText) {
    
    this.searchAll = {};

    
    this.searchText = {};
    words = words.split(/[\s,]+/);

    if (indexedFile === "All") {
      this.all = true;
      this.get = false;
      this.search = false;
      Object.keys(allText).forEach((key) => {
        let tempObj = {};
        let tempArray = [];
        words.forEach((i) => {
          let word = i
          tempObj[word]= allText[key][word];
        });
        tempArray.push(tempObj);
        this.searchAll[key] = tempArray;
        
      });
      return this.searchAll;
    }  else {
      
      this.get = false;
      this.search = true;
      this.all = false;
      words.forEach((i) => {
        let word = i;
        this.searchText[word] = allText[indexedFile][word];
      });
      return this.searchText;
    };
  };
}
class InvertedIndex {

// readFile: Reads the data from the file being uploaded
// validateFile: Ensures all the documents in a particular file is valid........
// tokenize: Strips out special characters from documents to be indexed 
// createIndex: Creates the index for documents
// getIndex: Get’s indices created for particular files
// searchIndex: Searches through one or more indices for words

  constructor() {
    this.index = {};
    this.badExt = [];
    this.goodExt = [];
    this.badContent = [];
    this.goodContent = [];
    this.documentWholeText = {};
    this.documentWholeTitle = {};
    this.documentRange = {};
    this.all = false;
    this.get = false;
    this.search = false;
  };
  
  validateExt (name) {
    if (!name.toLowerCase().match(/\.json$/)) {
      name =  " " + name;
      this.badExt.push(name);
      document.getElementById('createError').innerHTML = "(" + this.badExt + ") is/are not a JSON file(s)";
      document.getElementById('createError').style.visibility = "visible";
      return false
    } else {
      name =  " " + name;
      this.goodExt.push(name);
      document.getElementById('createNoError').innerHTML = "(" + this.goodExt + ") is/are GOOD TO GO &reg;";
      document.getElementById('createNoError').style.visibility = "visible";
      return true;
    };
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
  
  readFile (event, fileName) {
        const reader = new FileReader();
        reader.onload =  (event) => {
          if (event.target.result === ""){
            this.badContent.push(fileName);
            document.getElementById('createError').innerHTML = "(" + this.badContent + ") is/are not a valid JSON file(s)";
            document.getElementById('createError').style.visibility = "visible";
          } else if (this.validateContent(JSON.parse(event.target.result))) {
            this.createIndex(JSON.parse(event.target.result), fileName);
            this.goodContent.push(fileName);
            document.getElementById('createError').innerHTML = "(" + this.goodContent + ") successfully added";
            document.getElementById('createError').style.visibility = "visible";
          } else {
            this.badContent.push(fileName);
            document.getElementById('createError').innerHTML = "(" + this.badContent + ") is/are not a valid JSON file(s)";
            document.getElementById('createError').style.visibility = "visible";
          };

        };
        reader.readAsText(event);

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
    let wordArray = this.transformToArray(textObj);
    this.wordSet = new Set(wordArray);
    this.wordSet = Array.from(this.wordSet).sort();

    console.log(JSON.stringify(textObj));
    this.tokenize(textObj);
    this.documentWholeText[fileName] = this.index;
    this.documentWholeTitle[fileName] = titleObj;
    return this.index;
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
    this.index = {};
    // console.log(obj);
    // console.log(JSON.stringify(obj));
    // console.log(Object.keys(obj))
    Object.keys(obj).forEach((key) => {
      console.log(obj[key]);
      this.textArray.forEach((word) => {
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
    console.log(JSON.stringify(this.index))
    return this.index;
  };


  getIndex () {
    this.indexedFile = document.getElementById('createIndex').value.trim();
    this.text = this.documentWholeText[this.indexedFile];
    this.titles = this.documentWholeTitle[this.indexedFile];
    this.fileRange = [];
    if ((document.getElementById('createIndex').value) == '? undefined:undefined ?') {
      document.getElementById('createError').innerHTML = "*Select a JSON file please*";
      document.getElementById('createError').style.visibility = "visible";
      return false; 
    } else if (this.documentRange[this.indexedFile]) {
      return true;
    } else {
      Object.keys(this.titles).forEach((i) => {
        this.fileRange.push(parseInt(i));
      });
      this.documentRange[this.indexedFile] = this.fileRange;
      return true;
    };
  };

  searchIndex() {
    let empty = /^\s+$|^$/;
    this.searchAll = {};
    let words = document.getElementById('wordInput').value.trim();
    this.indexedFile = document.getElementById('searchIndex').value.trim();
    this.searchTitle = this.documentWholeTitle[this.indexedFile];
    this.searchText = {};
    words = words.split(/[\s,]+/);

    if ((document.getElementById('searchIndex').value) == '? undefined:undefined ?') {
      document.getElementById('searchError').innerHTML = "*Select a JSON file please*";
      document.getElementById('searchError').style.visibility = "visible";
      return false;

    } else if ((empty.test(document.getElementById('wordInput').value))){
      document.getElementById('searchError').innerHTML = "*Input a search term please*";
      document.getElementById('searchError').style.visibility = "visible";
      return false;

    } else if (this.indexedFile === "All") {
      this.all = true;
      this.get = false;
      this.search = false;
      Object.keys(this.documentWholeText).forEach((key) => {
        let tempObj = {};
        let tempArray = [];
        words.forEach((i) => {
          let word = i
          tempObj[word]= this.documentWholeText[key][word];
        });
        tempArray.push(tempObj);
        this.searchAll[key] = tempArray;
        
      });
      return true;
    } else if (this.documentRange[this.indexedFile] === undefined) {
        document.getElementById('searchError').innerHTML = "*Please create index first to search through file*";
        document.getElementById('searchError').style.visibility = "visible";

        return false;

    } else {
      this.get = false;
      this.search = true;
      this.all = false;
      words.forEach((i) => {
        let word = i;
        this.searchText[word] = this.documentWholeText[this.indexedFile][word];
      });
      return true;
    };
  };


}
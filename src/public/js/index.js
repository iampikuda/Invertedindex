class InvertedIndex {

// readFile: Reads the data from the file being uploaded
// validateFile: Ensures all the documents in a particular file is valid
// tokenize: Strips out special characters from documents to be indexed 
// createIndex: Creates the index for documents
// getIndex: Get’s indices created for particular files
// searchIndex: Searches through one or more indices for words

  constructor() {
    this.textArray = [];
    this.index = {};
    this.badExt = [];
    this.badContent = [];
    this.goodContent = [];
    this.documentWholeText = {};
    this.documentWholeTitle = {};
    this.documentRange = {};
    this.all = false;
    this.get = false;
    this.search = false;
  };

  // noRepeat (file) {
  //   if (Object.keys($scope.documentWholeText).includes($scope.fileName)) {
  //     console.log('it contains');
  //   } else {
  //     console.log("it's empty");
  //   }
  // };
  
  validateExt (name) {
    if (!name.toLowerCase().match(/\.json$/)) {
      name =  " " + name;
      this.badExt.push(name);
      document.getElementById('createError').innerHTML = "(" + this.badExt + ") is/are not a JSON file(s)";
      document.getElementById('createError').style.visibility = "visible";
      return false
    } else {
      // document.getElementById('createError').innerHTML = "Good to go";
      // document.getElementById('createError').style.visibility = "visible";
      return true;
    };
  };

  validateContent (file) {
    if (typeof (file) === 'object') {
      for (let i in file) {
        // console.log((file));
        // console.log((file[i].text));
        if (typeof (file[i].title) === 'undefined' || typeof (file[i].text) === 'undefined') {
          return false;
        };
      };
      return true;
    };
  };
  
  readFile (event, fileName) {
        // const fileName = event.name;
        const reader = new FileReader();
        reader.onload =  (event) => {
          // console.log(event);
          // console.log(event.target.result);
          // console.log(JSON.parse(event.target.result));

          if (this.validateContent(JSON.parse(event.target.result))) {
            this.createIndex(event, fileName);
            this.goodContent.push(fileName);
            document.getElementById('createError').innerHTML = "(" + this.goodContent + ") successfully added";
            document.getElementById('createError').style.visibility = "visible";
            console.log('here');
          } else {
            this.badContent.push(fileName);
            document.getElementById('createError').innerHTML = "(" + this.badContent + ") is/are not a valid JSON file(s)";
            document.getElementById('createError').style.visibility = "visible";
          };

        };
        reader.readAsText(event);

  };

  createIndex (event, fileName) {

    const titleObj = {};
    const textObj = {};
    const file = JSON.parse(event.target.result)

    console.log(event);
    console.log(event.target.result);
    

    let count = 1;
    console.log('whaaaaaaaaaaaaaaat');

    for (let book in file) {
      titleObj[parseInt(count)] = file[book].title
      textObj[parseInt(count)] = file[book].text
      count++
    };

    // console.log(textObj);
    this.transformToSingles(textObj);
    let wordArray = this.transformToArray(textObj);

    this.wordSet = new Set(wordArray);
    this.wordSet = Array.from(this.wordSet).sort();
    // $apply();
    // console.log(wordSet);

    this.tokenize(textObj);
    console.log (titleObj);
    this.documentWholeText[fileName] = this.index;
    this.documentWholeTitle[fileName] = titleObj;
    console.log(this.documentWholeText);
    console.log(this.documentWholeTitle);
    // console.log(JSON.stringify(this.documentWholeTitle));


  };


  transformToSingles(file) {
    for (let words in file) {
      file[words] = file[words].replace(/'\w+\s/g, " ").replace(/[.,/#!+$%^&@*?;:'{}=\-_`~()]/g, '').trim().toLowerCase().split(' ')

    };
  };

  transformToArray(file) {
    for (let key in file) {
      this.textArray = this.textArray.concat(file[key]);
    };
    return this.textArray;
  };

  tokenize(obj) {
    this.index = {};
    for (let key in obj) {
      for (let word in this.textArray) {
        
        if (obj[key].includes(this.textArray[word])) {
          if (this.index[this.textArray[word]] === undefined) {
            this.index[this.textArray[word]] = [];
            this.index[this.textArray[word]].push(parseInt(key));
          }
          else if (this.index[this.textArray[word]].includes(parseInt(key))) {
            continue;
          }
          else {
            // console.log("here");
            this.index[this.textArray[word]].push(parseInt(key));
          };
        } else {
          // console.log("nope");
          continue;
        }
      };
    };
    console.log(this.index);
    // console.log(this.textArray);
  };


  getIndex () {
    // console.log(document.getElementById('createIndex').value);
    if ((document.getElementById('createIndex').value) == '? undefined:undefined ?') {
      document.getElementById('createError').innerHTML = "*Select a JSON file please*";
      document.getElementById('createError').style.visibility = "visible";
      console.log('false');
      return false; 
    } else {
      this.indexedFile = document.getElementById('createIndex').value.trim();

      this.text = this.documentWholeText[this.indexedFile];
      this.titles = this.documentWholeTitle[this.indexedFile];

      this.fileRange = [];
      for (let i in this.titles) {
        
        this.fileRange.push(parseInt(i));
      };
      this.documentRange[this.indexedFile] = this.fileRange;
      console.log(this.documentWholeTitle);
      console.log(this.documentWholeText);
      console.log(this.fileRange);
      console.log(this.documentRange);
      return true

    };
  };
  searchIndex(file) {
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
      for (let key in this.documentWholeText){
        let tempObj = {};
        let tempArray = [];
        for (let i in words) {
          let word = words[i]
          tempObj[word]= this.documentWholeText[key][word];
        };
        tempArray.push(tempObj);
        console.log(this.documentWholeTitle);
        this.searchAll[key] = tempArray;
        
      };
      return true;
    } else if (this.documentRange[this.indexedFile] === undefined) {
        document.getElementById('searchError').innerHTML = "*Please create index first to search through file*";
        document.getElementById('searchError').style.visibility = "visible";

        return false;

    } else {
      this.get = false;
      this.search = true;
      this.all = false;
      for (let i in words) {
        let word = words[i];
        this.searchText[word] = this.documentWholeText[this.indexedFile][word];
      };
      // console.log(this.searchText);
      return true;
    };
  };


}
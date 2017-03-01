class InvertedIndex {

  constructor() {
    this.textArray = [];
    this.index = {};
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

  searchIndex(obj) {
    for (let key in obj) {
      for (let word in this.textArray) {

        if (obj[key].includes(this.textArray[word])) {
          if (this.index[this.textArray[word]] === undefined) {
            this.index[this.textArray[word]] = [];
            this.index[this.textArray[word]].push(key);
          }
          else if (this.index[this.textArray[word]].includes(key)) {
            continue;
          }
          else {
            console.log("here");
            this.index[this.textArray[word]].push(key);
          };
        } else {
          console.log("nope");
          continue;
        }
      };
    };
    console.log(this.index);
    console.log(JSON.stringify(this.index));
  };
}
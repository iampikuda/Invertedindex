let textArray = [];
const index = {};

function transformToSingles(file) {
  for (words in file) {
    file[words] = file[words].replace(/'\w+\s/g, " ").replace(/[.,/#!+$%^&@*?;:'{}=\-_`~()]/g, '').trim().toLowerCase().split(' ')

  };
};

function transformToArray(file) {
  for (key in file) {
    textArray = textArray.concat(file[key]);
  };
  return textArray;
};

function searchIndex(obj) {
  for (key in obj) {
    for (word in textArray) {

      if (obj[key].includes(textArray[word])) {
        if (index[textArray[word]] === undefined) {
          index[textArray[word]] = [];
          index[textArray[word]].push(key);
        }
        else if (index[textArray[word]].includes(key)) {
          continue;
        }
        else {
          console.log("here");
          index[textArray[word]].push(key);
        };
      } else {
        console.log("nope");
        continue;
      }
    };
  };
  console.log(index);
  console.log(JSON.stringify(index));
};
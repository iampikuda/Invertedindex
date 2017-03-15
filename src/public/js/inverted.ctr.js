(function () {
  angular.module('ngInverted')
    .controller('UploadFile', ['$scope', '$http','$timeout', ($scope, $http, $timeout) => {
      $scope.titleObj = {};
      $scope.textObj = {};
      $scope.fileName = '';
      $scope.documentWholeText = {};
      $scope.documentWholeTitle = {};
      $scope.document = false;
      $scope.indexedFile = '';
      $scope.text = {};
      let temp = {};
      let tempo;
      $scope.documentRange = {};
      let badExt = [];
      let goodExt = [];
      let badContent = [];
      let goodContent = [];


      const invertedIndex = new InvertedIndex();

      const hideSearchError = () => {
        document.getElementById("searchError").style.visibility = "hidden";
        document.getElementById("searchError").innerHTML = "";
      };

      const hideCreateError = () => {
        document.getElementById("createError").style.visibility = "hidden";
        document.getElementById("createError").innerHTML = "";
      }

      $scope.validateExt = (name) => {
        if (!name.toLowerCase().match(/\.json$/)) {
          name =  " " + name;
          badExt.push(name);
          document.getElementById('createError').innerHTML = "(" + badExt + ") is/are not a JSON file(s)";
          document.getElementById('createError').style.visibility = "visible";
          return false
        } else {
          name =  " " + name;
          goodExt.push(name);
          document.getElementById('createNoError').innerHTML = "(" + goodExt + ") is/are GOOD TO GO &reg;";
          document.getElementById('createNoError').style.visibility = "visible";
          return true;
        };
      };

      $scope.getFiles = () => {
        hideCreateError();
        $scope.fileInput = document.getElementById('uploadBtn');
        $scope.loadedFiles= [];
        badExt = [];
        goodExt = [];
        $scope.filesPicked = true;

        Object.keys($scope.fileInput.files).forEach((file) => {
          $scope.fileName = $scope.fileInput.files[file].name;
          if ($scope.validateExt($scope.fileName)) {
            $scope.loadedFiles.push($scope.fileInput.files[file]);
          } else {
            $timeout(hideCreateError, 10000);
          };
        });
        $scope.$apply();
      };

      $scope.readFile = (event) => {
        document.getElementById("createNoError").innerHTML = "";
        invertedIndex.badContent = [];
        invertedIndex.goodContent = [];
        if ($scope.loadedFiles.length === 0) {
          document.getElementById('createError').innerHTML = "No files selected";
          document.getElementById('createError').style.visibility = "visible";
        } else {
          Object.keys($scope.loadedFiles).forEach((file) => {
            $scope.readSingleFile($scope.loadedFiles[file], $scope.loadedFiles[file].name);
          });
          $scope.loadedFiles = [];
          $scope.filesUploaded = true;
          $scope.$apply();
        };
      };

      $scope.readSingleFile = (event, fileName) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target.result === "") {
            badContent.push(fileName);
            document.getElementById('createError').innerHTML = "(" + badContent + ") is/are not a valid JSON file(s)";
            document.getElementById('createError').style.visibility = "visible";
            return;
          } else if (invertedIndex.validateContent(JSON.parse(event.target.result))) {
            invertedIndex.createIndex(JSON.parse(event.target.result), fileName);
            goodContent.push(fileName);
            document.getElementById('createError').innerHTML = "(" + goodContent + ") successfully added";
            document.getElementById('createError').style.visibility = "visible";
          } else {
            badContent.push(fileName);
            document.getElementById('createError').innerHTML = "(" + badContent + ") is/are not a valid JSON file(s)";
            document.getElementById('createError').style.visibility = "visible";
            return;
          };
          $timeout(() => {
            $scope.documentWholeText = invertedIndex.documentWholeText
            $scope.documentWholeTitle = invertedIndex.documentWholeTitle;
            $scope.wordSet = invertedIndex.wordSet;
          }, 1000);
        };
        reader.readAsText(event);
        $scope.$apply();
      };

      
      $scope.getIndex = () => {
        $scope.indexedFile = document.getElementById('createIndex').value.trim();
        $scope.text = $scope.documentWholeText[$scope.indexedFile];
        $scope.titles = $scope.documentWholeTitle[$scope.indexedFile];
        
        if ($scope.indexedFile == '? undefined:undefined ?') {
          document.getElementById('createError').innerHTML = "*Select a JSON file please*";
          document.getElementById('createError').style.visibility = "visible";
          $timeout(hideCreateError, 5000);
          return;
        } else if ($scope.documentRange[$scope.indexedFile]) {
          $scope.fileRange = $scope.documentRange[$scope.indexedFile];
          $scope.$apply();
        } else {
          $scope.fileRange = [];
          Object.keys($scope.titles).forEach((i) => {
            $scope.fileRange.push(parseInt(i));
          });
          $scope.documentRange[$scope.indexedFile] = $scope.fileRange;
        };
        
        $scope.document = true;
        $scope.get = true;
        $scope.search = false;
        $scope.all = false;
        $scope.$apply();
      };
      

      $scope.searchIndex = () => {
        let empty = /^\s+$|^$/;
        let words = document.getElementById('wordInput').value.trim();
        let indexedFile = document.getElementById('searchIndex').value.trim();

        if (indexedFile == '? undefined:undefined ?') {
          document.getElementById('searchError').innerHTML = "*Select a JSON file please*";
          document.getElementById('searchError').style.visibility = "visible";
          $timeout(hideSearchError, 4000);
          return;
        } else if ((empty.test(words))) {
          document.getElementById('searchError').innerHTML = "*Input a search term please*";
          document.getElementById('searchError').style.visibility = "visible";
          $timeout(hideSearchError, 4000);
          return;
        } else if (indexedFile === "All") {
          invertedIndex.searchIndex(words, indexedFile, $scope.documentWholeText);
        } else if ($scope.documentRange[indexedFile] === undefined) {

          document.getElementById('searchError').innerHTML = "*Please create index first to search through file*";
          document.getElementById('searchError').style.visibility = "visible";
          $timeout(hideSearchError, 4000);
          return;
        } else {
          invertedIndex.searchIndex(words, indexedFile, $scope.documentWholeText);
          $scope.searchTitle = $scope.documentWholeTitle[indexedFile];
        } 
        $timeout(() => {
          $scope.all = invertedIndex.all;
          $scope.get = invertedIndex.get;
          $scope.search = invertedIndex.search;
          $scope.searchText = invertedIndex.searchText;
          $scope.indexedFile = indexedFile;
          $scope.searchAll = invertedIndex.searchAll;
        }, 1000);
        $scope.$apply();
      };
    }]);
}());

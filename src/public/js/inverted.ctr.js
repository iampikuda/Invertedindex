(function () {
  angular.module('ngInverted')
    .controller('UploadFile', ['$scope', '$http','$timeout', ($scope, $http, $timeout) => {
      $scope.titleObj = {};
      $scope.textObj = {};
      $scope.fileName = '';
      $scope.documentWhole = {};
      $scope.documentWholeTitle = {};
      $scope.document = false;
      $scope.indexedFile = '';
      $scope.fileRange = [];
      $scope.wordSet;
      $scope.text = {};


      const inverted_index = new InvertedIndex();

      $scope.noRepeat = (file) => {
        if (Object.keys($scope.documentWhole).includes($scope.fileName)) {
          console.log('it contains');
        } else {
          console.log("it's empty");
        }
      };

      $scope.validateExt = (file) => {
        if (!$scope.fileName.toLowerCase().match(/\.json$/)) {
          alert('Upload a JSON file please');
          return false
        } else {
          return true;
        };

      };

      $scope.validateContent = (file) => {
        if (typeof (file) === 'object') {
          for (i in file) {
            // console.log(typeof (file[i].title))
            if (typeof (file[i].title) === 'undefined' || typeof (file[i].text) === 'undefined') {
              alert('Upload a VALID JSON file please');
              return false;
            } else {
              return true;
            }
          }
        };
      };


      $scope.collectFiles = (event) => {
        const files = event.target.files;

        for (file of files) {
          ((file) => {
            $scope.fileName = file.name;
            $scope.$apply();
            // console.log($scope.fileName);
            const reader = new FileReader();
            reader.onload = function (event) {
              if ($scope.validateExt(event.target.result)) {

                if ($scope.validateContent(JSON.parse(event.target.result))) {
                  onFileComplete(JSON.parse(event.target.result));
                  document.getElementById('createError').innerHTML = "";
                  $scope.$apply();
                } else {
                  document.getElementById('createError').innerHTML = "*Upload a Valid JSON file please*";
                };
              } else {
                document.getElementById('createError').innerHTML = "*Upload a JSON file please*";
              };
            };
            reader.readAsText(file);
            $scope.$apply();
          })(file);
        };
      };


      const onFileComplete = (response) => {

        $scope.titleObj = {};
        $scope.textObj = {};
        // $scope.$apply();
        // console.log($scope.textObj);

        let count = 1;
        console.log('whaaaaaaaaaaaaaaat');

        for (let batter in response) {
          $scope.titleObj[count] = response[batter].title
          $scope.textObj[count] = response[batter].text
          count++
          $scope.$apply();
        };
        
        // console.log($scope.textObj);
        inverted_index.transformToSingles($scope.textObj);
        inverted_index.transformToArray($scope.textObj);

        $scope.wordSet = new Set(inverted_index.transformToArray($scope.textObj));
        $scope.wordSet = Array.from($scope.wordSet).sort();
        // $scope.$apply();
        console.log($scope.wordSet);

        inverted_index.createIndex($scope.textObj);
        console.log ($scope.textObj);
        $scope.documentWhole[$scope.fileName] = inverted_index.index;
        $scope.documentWholeTitle[$scope.fileName] = $scope.titleObj;
        console.log($scope.documentWhole);
        console.log($scope.documentWholeTitle);
        // console.log(Object.keys($scope.documentWholeTitle[$scope.fileName]).length);
        $scope.$apply();

      };

      $scope.showIndex = () => {
        // console.log(document.getElementById('createIndex').value);
        if ((document.getElementById('createIndex').value) == '? undefined:undefined ?') {
          document.getElementById('createError').innerHTML = "*Select a JSON file please*";

        } else {
          $scope.document = true;
          $scope.create = true;
          $scope.search = false;
          $scope.indexedFile = document.getElementById('createIndex').value.trim();
          $scope.header = $scope.indexedFile.replace(/\.[^/.]+$/, "");

          let jsonKey = $scope.indexedFile;
          let docsNow = $scope.documentWhole;
          $scope.text = docsNow[jsonKey];
          $scope.title = $scope.documentWholeTitle[jsonKey];

          $scope.fileRange = [];
          $scope.$apply();
          for (let i in ($scope.documentWholeTitle[jsonKey])) {
            
            $scope.fileRange.push(parseInt(i));
          };
          $scope.$apply(); 
          // console.log($scope.text);

          // console.log($scope.documentWhole);
        };
      };

      const hideSearchError = () => {
        document.getElementById("searchError").style.visibility = "hidden";
      }

      $scope.searchIndex = () => {
        let empty = /^\s+$|^$/;
        if ((document.getElementById('searchIndex').value) == '? undefined:undefined ?') {
          document.getElementById('searchError').innerHTML = "*Select a JSON file please*";
          document.getElementById('searchError').style.visibility = "visible";
          $timeout(hideSearchError, 4000);

        } else {
          if ((empty.test(document.getElementById('wordInput').value))){
            document.getElementById('searchError').innerHTML = "*Input a search term please*";
            document.getElementById('searchError').style.visibility = "visible";
            $timeout(hideSearchError, 4000);
          }else{
            let searchText = {};
            let docsNow = $scope.documentWhole;
            $scope.create = false;
            $scope.search = true;
            let words = document.getElementById('wordInput').value.trim();
            let indexedFile = document.getElementById('searchIndex').value.trim();
            // $scope.searchTitle = $scope.documentWholeTitle[indexedFile];
            $scope.searchTitle = $scope.documentWholeTitle[indexedFile];
            $scope.searchText = {};
            words = words.split(/[\s,]+/);
            // console.log(words);
            const search = (letters) => {
              for (let i in letters) {
                console.log($scope.documentWhole);
                console.log($scope.documentWholeTitle);
                console.log(letters[i]);
                console.log(indexedFile);
                let word = letters[i]
                console.log(($scope.documentWhole[indexedFile][word]));
                $scope.searchText[word] = $scope.documentWhole[indexedFile][word];
              };
            };
             if(indexedFile === "All") {
               
              } else {
                search(words)
              }
            $scope.$apply();
          }
        };
      };

    }]);


}());

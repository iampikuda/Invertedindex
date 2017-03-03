(function () {
  angular.module('ngInverted')
    .controller('UploadFile', ['$scope', '$http', ($scope, $http) => {
      $scope.titleObj = {};
      $scope.textObj = {};
      $scope.fileName = '';
      $scope.documentWhole = {};
      $scope.documentWholeTitle = {};
      $scope.document = true;
      $scope.indexedFile = '';
      $scope.fileRange = [];


      const inverted_index = new InvertedIndex();

      // $scope.kondoChange = () => {
      //   // $scope.kondo = 'ppppppppppp';
      //   // $scope.$apply();
      //   // console.log($scope.kondo)
      // };

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

                  

                  document.getElementById('errors').innerHTML = "";
                  $scope.$apply();
                } else {
                  document.getElementById('errors').innerHTML = "*Upload a Valid JSON file please*";
                };
              } else {
                document.getElementById('errors').innerHTML = "*Upload a JSON file please*";
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
        // console.log(document.getElementById('selectIndex').value);
        if ((document.getElementById('selectIndex').value) == '? undefined:undefined ?') {
          document.getElementById('errors').innerHTML = "*Select a JSON file please*";

        } else {
          $scope.indexedFile = document.getElementById('selectIndex').value.trim();
          $scope.$apply();

          const jsonKey = $scope.indexedFile;
          const docsNow = $scope.documentWhole;
          
          console.log(docsNow);
          console.log(docsNow[jsonKey]);
          $scope.text = docsNow[jsonKey];
          $scope.title = $scope.documentWholeTitle[jsonKey];
          console.log($scope.title)

          for (let i in ($scope.documentWholeTitle[jsonKey])) {
            console.log(i);
            $scope.fileRange.push(parseInt(i));
            console.log($scope.fileRange);
          }
          console.log($scope.fileRange);
          // console.log(Object.keys($scope.documentWholeTitle[jsonKey]))
          $scope.$apply();

          // console.log($scope.documentWhole[0]);
          // for (let i in keys) {
          //   console.log(keys[i]);
          //   console.log($scope.indexedFile);
          //   if (keys[i] = $scope.indexedFile){
          //     console.log($scope.indexedFile);
          //     console.log($scope.documentWhole[i]);
          //   }
          // }
        }

      };

    }]);


}());

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
      $scope.fileRange = [];
      $scope.wordSet;
      $scope.text = {};
      let temp = {};
      let tempo;
      $scope.documentRange = {};


      const invertedIndex = new InvertedIndex();

      const hideSearchError = () => {
        document.getElementById("searchError").style.visibility = "hidden";
        document.getElementById("searchError").innerHTML = "";
      };

      const hideCreateError = () => {
        document.getElementById("createError").style.visibility = "hidden";
        document.getElementById("createError").innerHTML = "";
      }

      $scope.getFiles = () => {
        hideCreateError();
        $scope.fileInput = document.getElementById('uploadBtn');
        invertedIndex.badExt= [];
        invertedIndex.goodExt= [];
        $scope.loadedFiles= [];
        $scope.$apply();

        Object.keys($scope.fileInput.files).forEach((file) => {
          $scope.fileName = $scope.fileInput.files[file].name;
          console.log($scope.fileName);
          if (invertedIndex.validateExt($scope.fileName)) {
            $scope.loadedFiles.push($scope.fileInput.files[file]);
            $scope.$apply();

          } else {
            $timeout(hideCreateError, 10000);
          };
        });
      };

      $scope.readFile = (event) => {
        document.getElementById("createNoError").innerHTML = "";
        invertedIndex.badContent = [];
        invertedIndex.goodContent = [];
        Object.keys($scope.loadedFiles).forEach((file) => {
          console.log($scope.loadedFiles[file]);
          invertedIndex.readFile($scope.loadedFiles[file],$scope.loadedFiles[file].name);
          $timeout($scope.documentWholeText = invertedIndex.documentWholeText, 1000); //hmmmm
        });
        $scope.loadedFiles = [];
      };
      
      $scope.getIndex = () => {
        if(!invertedIndex.getIndex()) {
          $timeout(hideCreateError, 5000);
          console.log('bad');
        } else {
          console.log('good');
          $scope.document = true;
          $scope.get = true;
          $scope.search = false;
          $scope.all = false
          $timeout(() => {
            $scope.indexedFile = invertedIndex.indexedFile;
            $scope.titles = invertedIndex.documentWholeTitle[invertedIndex.indexedFile];
            $scope.text = invertedIndex.documentWholeText[invertedIndex.indexedFile];
            $scope.fileRange = invertedIndex.documentRange[invertedIndex.indexedFile];
            $scope.wordSet = invertedIndex.wordSet;
          }, 1000);
        };
      };
      

      $scope.searchIndex = () => {
        if (!invertedIndex.searchIndex()){
          $timeout(hideSearchError, 4000);
        } else {
          $timeout(() => {
            $scope.all = invertedIndex.all;
            $scope.get = invertedIndex.get;
            $scope.search = invertedIndex.search;
            $scope.searchText = invertedIndex.searchText;
            $scope.searchTitle = invertedIndex.searchTitle;
            $scope.indexedFile = invertedIndex.indexedFile;
            $scope.documentRange = invertedIndex.documentRange;
            $scope.searchAll = invertedIndex.searchAll;
            $scope.documentWholeTitle = invertedIndex.documentWholeTitle;
          }, 1000);
        }
      };

    }]);


}());

(function () {
  angular.module('ngInverted')
    .controller('UploadFile', ['$scope', '$http', ($scope, $http) => {
      const titleObj = {};
      const textObj = {};
      $scope.fileName = '';

      const inverted_index = new InvertedIndex();

      $scope.collectFiles = (event) => {
        const files = event.target.files;

        for (file of files) {
          ((file) => {
          $scope.fileName = file.name;
            console.log($scope.fileName);
            const reader = new FileReader();
            reader.onload = function (event) {
              onFileComplete(JSON.parse(event.target.result));
              console.log($scope.fileName);
              if ($scope.documentWhole) {
                $scope.documentWhole[$scope.fileName] = inverted_index.index;
                console.log(JSON.stringify($scope.documentWhole));
              }
              else {
                $scope.documentWhole = {};
                $scope.documentWhole[$scope.fileName] = inverted_index.index;
                console.log(JSON.stringify($scope.documentWhole));
              };
            };
            reader.readAsText(file);
          })(file);
        }
      }


      const onFileComplete = (response) => {

        console.log($scope.fileName);


        let count = 1;
        console.log('whaaaaaaaaaaaaaaat');

        for (let batter in response) {
          titleObj[count] = response[batter].title
          textObj[count] = response[batter].text
          count++
        };



        inverted_index.transformToSingles(textObj);
        inverted_index.transformToArray(textObj);
        inverted_index.searchIndex(textObj);






      };

    }]);


}());

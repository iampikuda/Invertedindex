(function () {
	angular.module('ngInverted', [])
		.controller('UploadFile', ['$scope', '$http', ($scope, $http) => {
			const titleArray = {};
			const textArray = {};

			const onFileComplete = (response) => {
				let upload = response.data;
				let count = 1;

				function transforming(file){
					for(let words in file){
						file[words] = file[words].replace(/'\w+\s/g," ").replace(/[.,/#!+$%^&@*?;:'{}=\-_`~()]/g, '').trim().toLowerCase().split(' ')
						 
					}
					return file;
				};
				// .replace(/'\w+\s/g," ").replace(/[.,/#!+$%^&@*?;:'{}=\-_`~()]/g, '').trim().toLowerCase().split(' ')

				
				for (let batter in upload) {
					titleArray[count] = upload[batter].title
					textArray[count] = upload[batter].text
					console.log(titleArray);
					count++
				};

				transforming(textArray);
				console.log(textArray);

				$scope.pasta = titleArray;

			};

			const onError = (reason) => {
				$scope.error = "Not valid json";
			};

			$http.get("https://gist.githubusercontent.com/q-ode/72019451b98f079a8d737eb7a412bf14/raw/bd3b75398c2f95adfef10f48f43c36475e950890/books.json")
				.then(onFileComplete, onError);
			// const onJson = (response) => {
			// 	$scope.title = response.data;
			// };







		}]);



}());

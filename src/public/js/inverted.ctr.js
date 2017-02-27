(function () {
	angular.module('ngInverted')
		.controller('UploadFile', ['$scope', '$http', ($scope, $http) => {
			const titleObj = {};
			const textObj = {};

			const onFileComplete = (response) => {
				const upload = response.data;
				let count = 1;
				console.log('whaaaaaaaaaaaaaaat');

				for (batter in upload) {
					titleObj[count] = upload[batter].title
					textObj[count] = upload[batter].text
					count++
				};

				$scope.pasta = titleObj;
				transformToSingles(textObj);
				transformToArray(textObj);
				searchIndex(textObj);


			};

			const onError = (reason) => {
				$scope.error = "Not valid json";
			};
			$http.get('https://raw.githubusercontent.com/andela-opikuda/Invertedindex/switch/JSON.json')
				.then(onFileComplete, onError);

			// $http.get("https://raw.githubusercontent.com/andela-opikuda/Invertedindex/switch/JSONbad.json")
			// 	.then(onFileComplete, onError);



		}]);


}());

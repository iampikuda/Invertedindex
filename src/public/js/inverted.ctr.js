(function(){
	angular.module('ngInverted', [])
		.controller('UploadFile',['$scope','$http', ($scope, $http) => {

		const onFileComplete = (response) => {
			$scope.user = response.data;
			
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
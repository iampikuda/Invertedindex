application.controller('Upload', ['$scope','$http', ($scope, $http) => {

		const onFileComplete = (response) => {
			$scope.user = response.data;
		};

		const onError = (reason) => {
			$scope.error = "I could not fetch the user";
		};

		$http.get('https://api.github.com/users/andela-opikuda')
					.then(onFileComplete, onError);

		$scope.message = 'helloworld!';
	}]);
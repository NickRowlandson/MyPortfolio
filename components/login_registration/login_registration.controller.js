(function () {

    angular.module('login_registration', [])
        .controller('login_registrationCtrl', LoginRegController);

    LoginRegController.$inject = ['$scope', '$http', '$location'];

    function LoginRegController($scope, $http, $location) {
		var path = $location.path();
		if(path == "/login"){
			$scope.state = "login";
		}else{
			$scope.state = "registration";
		}
		
		$scope.loginUser = {};
		$scope.regUser = {};
		
		$scope.login = function(){
			$http.post('http://nickrowlandson.me:8080/login', $scope.loginUser)
				.then(function(data){
					if(data.status == 200){
						console.log("LOGGED IN");
					}else{
						console.log("LOGIN FAILED",data)
						$scope.error = "THERE WAS A LOGIN ERROR"
					}
				}, function(data){
					console.log("LOGIN ERROR",data);
				})
		};
		
		$scope.register = function(){
			$http.post('http://nickrowlandson.me:8080/register', $scope.regUser)
				.then(function(data){
					if(data.status == 200){
						console.log("REGISTERED");
					}else{
						console.log("REGISTRATION FAILED", data)
					}
				}, function(data){
					console.log("REGISTRATION ERROR",data);
				})
			};
    };

}());
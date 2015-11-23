(function () {

    angular.module('login_registration', [])
        .controller('login_registrationCtrl', LoginRegController);

    LoginRegController.$inject = ['$scope', '$http', '$location', '$rootScope'];

    function LoginRegController($scope, $http, $location, $rootScope) {
		var path = $location.path();
		if(path == "/login"){
			$scope.state = "login";
		}else{
			$scope.state = "registration";
		}
		
		$scope.loginUser = {};
		$scope.regUser = {};
		
		$scope.getUsers = function(){
			console.log("get users")
			$http.get('http://127.0.0.1:8080/users')
				.then(function(data){
					console.log(data.data);
					$scope.userList = data.data;
				}, function(data){
					console.log("ERROR");
				})
		}
		
		$scope.login = function(){
			$http.post('http://127.0.0.1:8080/login', $scope.loginUser)
				.then(function(data){
					if(data.status == 200){
						console.log("LOGGED IN");
						$scope.loginUser = {};
						$scope.msg = "LOGGED IN";
						$scope.state = "loggedIn";
					}else{
						console.log("LOGIN FAILED",data);
						$scope.error = "THERE WAS A LOGIN ERROR";
					}
				}, function(data){
					console.log("LOGIN ERROR",data);
				})
		};
		
		$scope.register = function(){
			$http.post('http://127.0.0.1:8080/register', $scope.regUser)
				.then(function(data){
					if(data.status == 200){
						console.log("REGISTERED");
						$scope.regUser = {};
						$scope.msg = "REGISTERED";
					}else{
						console.log("REGISTRATION FAILED", data)
					}
				}, function(data){
					if(data.status == 422){
						$scope.error = "USER ALREADY EXISTS. PLEASE ENTER A DIFFERENT USER NAME.";
					}
					console.log("REGISTRATION ERROR",data);
				})
			};
	
		$scope.delete = function(userID){
			$http.delete('http://127.0.0.1:8080/user/'+userID)
				.then(function(data){
					if(data.status == 200){
						console.log("DELETED");
						$scope.msg = "DELETED";
					}else{
						console.log("DELETE USER FAILED", data)
					}
				}, function(data){
					console.log("DELETE ERROR",data);
				});
		};
		
    };


}());
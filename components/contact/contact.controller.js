/*
Project Name: Assignment 1 (Personal Portfolio)
By: Nick Rowlandson
Student ID: 200167125

Contact Controller
*/

(function () {

    angular.module('contact', [])
        .controller('contactCtrl', ContactController);

    ContactController.$inject = ['$scope', '$http'];

    function ContactController() {
        $scope.contactData = {};

        $scope.sendContactEmail = function () {
            $http.post('http://localhost:3000/contact', $scope.contactData)
                .then(function (data) {
                    //Success Callback
                    console.log(data);
                }, function (err) {
                    //failure callback
                    console.log(err);
                });
        };

    };

}());
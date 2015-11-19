/*
Project Name: Assignment 1 (Personal Portfolio)
By: Nick Rowlandson
Student ID: 200167125

Footer Controller
*/

(function () {

    angular.module('footer', [])
        .controller('footerCtrl', FooterController)
        .directive('footer', FooterDirective);

    FooterController.$inject = ['$scope'];

    function FooterController() {

    };

    function FooterDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/footer/footer.template.html',
            controller: 'footerCtrl'
        };
    };

}());
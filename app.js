/*
Project Name: Assignment 1 (Personal Portfolio)
By: Nick Rowlandson
Student ID: 200167125

*/

(function () {

    angular.module('NickPortfolio', ['ngRoute', 
                                     'home', 
                                     'navbar', 
                                     'footer',
                                     'projects',
                                     'skills',
                                     'interests',
                                     'contact',
                                     'login_registration'])
        .config(Config);

    Config.$inject = ['$routeProvider'];

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'components/home/home.template.html',
                controller: 'homeCtrl'
            })
            .when('/projects', {
                templateUrl: 'components/projects/projects.template.html',
                controller: 'projectsCtrl'
            })
            .when('/skills', {
                templateUrl: 'components/skills/skills.template.html',
                controller: 'skillsCtrl'
            })
            .when('/interests', {
                templateUrl: 'components/interests/interests.template.html',
                controller: 'interestsCtrl'
            })
            .when('/contact', {
                templateUrl: 'components/contact/contact.template.html',
                controller: 'contactCtrl'
            })
            .when('/login', {
                templateUrl: 'components/login_registration/login_registration.template.html',
                controller: 'login_registrationCtrl'
            })
            .when('/registration', {
                templateUrl: 'components/login_registration/login_registration.template.html',
                controller: 'login_registrationCtrl'
            })
            .otherwise({
                templateUrl: 'views/404.html'
             });
    };

}());
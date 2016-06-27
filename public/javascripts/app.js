(function(window) {
    var app = angular.module("testapplication", ['ui.router']);

    //app.config(function($locationProvider) {
    //    $locationProvider.html5Mode(true).hashPrefix('!');
    //});

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("home");

        $stateProvider
            .state('home', {
                url: "/home",
                templateUrl: "views/index.html"
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "views/signup.html",
                controller: 'AuthenticationController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Signup'
                }
            })
            .state('signin', {
                url: "/signin",
                templateUrl: "views/signin.html",
                controller: 'AuthenticationController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Signin'
                }
            });
    });
}(window));
(function () {
    'use strict';

    angular.module('testapplication')
        .controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$state', '$http', '$location', '$window', 'Authentication'];

    function AuthenticationController($scope, $state, $http, $location, $window, Authentication) {
        var vm = this;

        vm.authentication = Authentication;
        vm.signup = signup;
        vm.signin = signin;
        vm.callOauthProvider = callOauthProvider;

        vm.error = $location.search().err;

        if (vm.authentication.user) {
            $location.path('/');
        }

        function signup(isValid) {
            vm.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');
                return false;
            }

            $http.post('/users/signup', vm.credentials).success(function (response) {
                vm.authentication.user = response;
                $state.go('home');
            }).error(function (response) {
                vm.error = response.message.errmsg;
            });
        }

        function signin(isValid) {
            vm.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');
                return false;
            }

            $http.post('/users/signin', vm.credentials).success(function (response) {
                vm.authentication.user = response;
                $state.go('home');
            }).error(function (response) {
                vm.error = response.message;
            });
        }

        function callOauthProvider(url) {
            if ($state.previous && $state.previous.href) {
                url += '?redirect_to=' + encodeURIComponent($state.previous.href);
            }

            $window.location.href = url;
        }
    }
}());

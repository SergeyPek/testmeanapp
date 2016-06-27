(function () {
    'use strict';

    angular.module('testapplication')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$state', 'Authentication'];

    function HeaderController($scope, $state, Authentication) {
        var vm = this;

        vm.authentication = Authentication;
        vm.isCollapsed = false;

        $scope.$on('$stateChangeSuccess', function() {
            vm.isCollapsed = false;
        });

        $scope.vm = vm;
    }
}());
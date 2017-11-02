(function () {
    'use strict';

    angular
        .module('forms')
        .controller('NavBarController', NavBarController);

    NavBarController.$inject = ['$scope'];

    function NavBarController($scope) {
        $scope.previous = 0;
        $scope.stateOptions= [
            {
                state: 'forms.undergrad',
                selected: 'bg-info text-white',
                name: "Undergraduate"
            },
            {
                state: 'forms.master',
                selected: '',
                name: 'Master'
            },
            {
                state: 'forms.phd',
                selected: '',
                name: 'Ph.D'
            }
        ];

        $scope.changeColors = function(index){
            //TODO: previous and currently not working
            $scope.$evalAsync(function () {
                if ($scope.previous!= undefined){
                    $scope.stateOptions[$scope.previous].selected = "";
                }
                $scope.stateOptions[index].selected = 'bg-info text-white';
                $scope.previous = index;
            });
        }
    }

}());


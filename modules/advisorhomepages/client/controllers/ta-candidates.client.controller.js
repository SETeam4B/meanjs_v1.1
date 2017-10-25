(function () {
    'use strict';

    angular
        .module('advisorhomepages')
        .controller('TACandidatesController', TACandidates);

    TACandidates.inject = ['$scope'];

    function TACandidates($scope) {
        var vm = this;

        $scope.yolo = "hello World";

        $scope.fakeData = [
            {
                "id": 1,
                "name": "Lionel Messi",
                "type": 123,
                "yolo1": "exra Parameter"
            },
            {
                "id": 2,
                "name": "Ronaldinho",
                "type": 456,
                "yolo1": "exra Parameter"
            },
            {
                "id": 3,
                "name": "Zinedine Zidan",
                "type": 789,
                "yolo1": "exra Parameter"
            },
            {
                "id": 4,
                "name": "Luis Suarez",
                "type": 987,
                "yolo1": "exra Parameter"
            },
            {
                "id": 0,
                "name": "Maradona",
                "type": 1,
                "yolo1": "exra Parameter"
            }
        ];
    };
}());

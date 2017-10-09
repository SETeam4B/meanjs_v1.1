(function () {
    'use strict';

    angular
        .module('advisorhomepages')
        .controller('TACandidates', ['$scope', function ($scope) {
            $scope.yolo = "hello World";

            $scope.fakeData = [
                {
                    "id": 0,
                    "name": "jordi Hdez",
                    "type": 123,
                    "yolo1": "exra Parameter"
                },
                {
                    "id": 0,
                    "name": "jordi Hdez",
                    "type": 123,
                    "yolo1": "exra Parameter"
                },
                {
                    "id": 0,
                    "name": "jordi Hdez",
                    "type": 123,
                    "yolo1": "exra Parameter"
                },
                {
                    "id": 0,
                    "name": "jordi Hdez",
                    "type": 123,
                    "yolo1": "exra Parameter"
                },
                {
                    "id": 0,
                    "name": "jordi Hdez",
                    "type": 123,
                    "yolo1": "exra Parameter"
                }
            ];


        }]);
}());

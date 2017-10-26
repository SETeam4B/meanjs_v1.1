(function () {
    'use strict';

    angular
        .module('advisorhomepages')
        .controller('TACandidatesController', TACandidates);

    TACandidates.inject = ['$scope'];

    function TACandidates($scope) {

        $scope.yolo = "hello World";

        $scope.TACandidateForms = [{}];

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

        $scope.tryingNew = function (index) {
            $scope.saveWithBody($scope.TACandidateForms[index]).then(function (res) {
                if(index!=undefined) {
                    $scope.fakeData[index].name = res.name;
                }
                alert(res.name + "'s information was updated");
            });
        }
    };


}());

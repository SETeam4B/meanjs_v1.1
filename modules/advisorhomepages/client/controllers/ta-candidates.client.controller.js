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

        $scope.tryingNew2 = function (index) {
            update(index);
        }

        $scope.tryingNew = function (index) {
            checkId(index).then(function (res) {
                alert("can't add a student with that id since it is already in the db");
                console.log("can't add a student with that id since it is already in the db");
            }).catch(function (err) {
                addNewStudent(index);
                alert("new student added");
            });
        }

        function checkId(index) {
            return new Promise(function (resolve, reject) {
                $scope.getWithStudentId($scope.TACandidateForms[index].studentId).then(function (res) {
                   return resolve(res);
                }).catch(function (err) {
                    console.log("Id passed is wrong not in db, so cant update");
                    return reject(err);
                });
            });
        }

        function update(index) {
            $scope.updateStudent($scope.TACandidateForms[index]).then(function (res) {
                if (index != undefined) {
                    $scope.fakeData[index].name = res.name;
                }
                alert(res.name + "'s information was updated");
            });
        }

        function addNewStudent(index) {
            $scope.saveWithBody($scope.TACandidateForms[index]).then(function (res) {
                if (index != undefined) {
                    $scope.fakeData[index].name = res.name;
                }
                alert(res.name + "' was added to the considering student list");
            });
        }
    };


}());

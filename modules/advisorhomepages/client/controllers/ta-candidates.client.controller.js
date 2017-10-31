(function () {
    'use strict';

    angular
        // .module('advisorhomepages')
        .module('forms')
        .controller('TACandidatesController', TACandidates);

    TACandidates.inject = ['$scope', '$modal', '$state','FormsService'];

    function TACandidates($scope, $modal, $state, FormsService) {

        $scope.yolo = "hello World";

        $scope.isAdvisorForm = true;
        $scope.TACandidateForms = [{}];
        var fs = new FormsService();

        $scope.fakeData = [
            {
                "id": 1,
                "name": "Lionel Messi",
                "category": 123,
                "hourTA": "exra Parameter"
            },
            {
                "id": 2,
                "name": "Ronaldinho",
                "category": 123,
                "hourTA": "exra Parameter"
            },
            {
                "id": 3,
                "name": "Zinedine Zidan",
                "category": 123,
                "hourTA": "exra Parameter"
            },
            {
                "id": 4,
                "name": "Luis Suarez",
                "category": 123,
                "hourTA": "exra Parameter"
            },
            {
                "id": 0,
                "name": "Maradona",
                "category": 123,
                "hourTA": "exra Parameter"
            }
        ];


        fs.$getAll().then(function (res) {
            $scope.fakeData = res.data;
        });


        $scope.openModal = function () {
            $modal.open({
                // template: '<div ng-show="$state.includes(forms.master)"/>'
                templateUrl: "modules/advisorhomepages/client/views/newStudentModal.client.view.html",
                controller: 'FormsController',
                controllerAs: 'vm',
                resolve: {
                    formResolve: formHandler
                }

            }).result.then(function (res) {
                // when modal is closed then call a function
            });
        }

        $scope.submitModifiedForm = function (form,vm) {
            debugger;
            vm.form = form;
            console.log("submittion");
            vm.save(true);
            vm.form = {};
        }

        $scope.tryingNew3 = function (index) {
            // update(index);
            debugger;
            console.log($scope.allStudentForms);
            debugger;
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

        $scope.pullAllConsideredStudents = function () {
            $scope.pullAllStudents().then(function (res) {

                res.data.forEach(function (obj) {
                    $scope.fakeData.push(obj);
                });

                console.log(res);
            }).catch(function (err) {
                console.log(err);
            });
        }

    };

    formHandler.$inject = ['$stateParams', 'FormsService', 'Authentication'];
    function formHandler($stateParams, FormsService, Authentication){
        /*
        FormsService.get({
            username: Authentication.user.username
        }).$promise.then(function (result) {
            console.log(result);
            return result;
        }, function(reason) {
            return new FormsService();
        });
        */
        console.log("WTF IS GOING ON HERE WTF IS THIS ");
        console.log("username->" );
        console.log(Authentication.user);
        return FormsService.get({
            username: Authentication.user.username
        }).$promise;
    }


}());

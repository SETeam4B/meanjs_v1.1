(function () {
    'use strict';

    angular
    // .module('advisorhomepages')
        .module('forms')
        .controller('TACandidatesController', TACandidates);

    TACandidates.inject = ['$scope', '$modal', '$state', 'FormsService', 'Authentication'];

    function TACandidates($scope, $modal, $state, FormsService, Authentication) {

        $scope.yolo = "hello World";
        $scope.authentication = Authentication;
        $state.isAdvisorForm = true;
        $scope.TACandidateForms = [];
        var fs = new FormsService();
        $scope.formBooleans = [];

        $scope.fakeData = [
            {
                "ufid": 1,
                "name": "Lionel Messi",
                "category": 123,
                "hourTA": "exra Parameter"
            },
            {
                "ufid": 2,
                "name": "Ronaldinho",
                "category": 123,
                "hourTA": "exra Parameter"
            },
            {
                "ufid": 3,
                "name": "Zinedine Zidan",
                "category": 123,
                "hourTA": "exra Parameter"
            },
            {
                "ufid": 4,
                "name": "Luis Suarez",
                "category": 123,
                "hourTA": "exra Parameter"
            },
            {
                "ufid": 0,
                "name": "Maradona",
                "category": 123,
                "hourTA": "exra Parameter"
            }
        ];
        $scope.hoursArray = [];

        /**
         * When the page is loaded, the hourTA are retrieved from fakeData and placed on the hours input label
         * located in the right side of the accordion
         */
        $scope.updateHours = function(){
            for (var i = 0; i < $scope.fakeData.length; i++){
                var temp= Object.assign({}, $scope.fakeData[i]);
                // $scope.TACandidateForms[i] = {hourTA: temp};
                $scope.hoursArray[i] = temp.hourTA;
            }

        };

        /**
         *  When the hours are updated on the accordion header this function is triggered
         *  It is used so that the TACandidateForms and the fakeDAta fields are properly updated with this
         * @param index
         */
        $scope.clickUpdateHour = function (index) {
            var form = Object.assign({}, $scope.fakeData[index]);
            form.hourTA = $scope.hoursArray[index];

            var service = new FormsService(form);
            service.$updateFromAdvisor(success, reject);
            // var service = new FormsService(form);
            // FormsService.update(user, success, reject);

            function success() {
                $scope.TACandidateForms[index].hourTA = $scope.hoursArray[index];
                // $scope.fakeData[index].hourTA =
                alert("hours are updated");
            }

            function reject() {
                alert("hours were not updated");
            }

            // FormsService.update()
        }

        /**
         * Takes care of requesting to the database the students info
         * places the students info on the accordions
         */
        function updateAccordionInformation () {
            fs.$getAll().then(function (res) {
                $scope.fakeData = res.data;
                $scope.updateHours();
            });
        }

        updateAccordionInformation();

        /**
         * Places the information in the body of the accordion
         * Takes care of only placing information in TACandidateForms only if the accordion is opened
         * so that memory is not wasted
         * @param index
         */
        $scope.populateTACandidatesForm = function (index) {
            if ($scope.TACandidateForms[index] == undefined) {
                $scope.updateTemporaryForm(index);
                $scope.formBooleans[index] = false;
            }
        }

        /**
         * Opens the modal
         */
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
                updateAccordionInformation();
            });
        };

        /**
         * takes care of submitting the form
         * accesses the FormsService and saves the form to the database
         * @param form
         * @param vm
         * @param index
         */
        $scope.submitModifiedForm = function (form, vm, index) {
            form.username = $scope.fakeData[index].username;
            var tempForm = form;
            var service = new FormsService(form);
            vm.form = service;
            vm.updateWithAdvisor(index, tempForm,assignValues);
        };

        /**
         * does a shallow copy of the form that is been received and updates the fakeData object
         * and the hoursArray object
         * @param index
         * @param form
         * @param isValid
         */
        function assignValues(index, form, isValid) {
            if(isValid){
                $scope.fakeData[index] = Object.assign({}, form);
                $scope.hoursArray[index] = $scope.fakeData[index].hourTA;
            }
        }

        /**
         * updates fakeData whenever the update is successful
         * @param index
         */
        $scope.updateTemporaryForm = function (index) {
            $scope.TACandidateForms[index] = Object.assign({}, $scope.fakeData[index]);

            // debugger;
            // $scope.TACandidateForms[index].hourTA = $scope.hoursArray[index];

        }

        /**
         * hides and shows the form
         * @param index
         */
        $scope.toggleForm = function (index) {
            // debugger;
            $scope.formBooleans[index] = !$scope.formBooleans[index];
        }

        /**
         * from here on out all the functions below were used to learn how the
         * MEAN.js app worked
         * @param index
         */
        $scope.tryingNew3 = function (index) {
            // update(index);
            debugger;
            console.log($scope.allStudentForms);
            debugger;
        };

        $scope.tryingNew = function (index) {
            checkId(index).then(function (res) {
                alert("can't add a student with that id since it is already in the db");
                console.log("can't add a student with that id since it is already in the db");
            }).catch(function (err) {
                addNewStudent(index);
                alert("new student added");
            });
        };


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

    //
    formHandler.$inject = ['$stateParams', 'FormsService', 'Authentication'];

    function formHandler($stateParams, FormsService, Authentication) {
        return FormsService.get({
            username: Authentication.user.username
        }).$promise;
    }


}());

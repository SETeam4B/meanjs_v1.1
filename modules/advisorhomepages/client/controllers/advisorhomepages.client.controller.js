(function () {
    'use strict';

    // Advisorhomepages controller
    angular
        .module('advisorhomepages')
        .controller('AdvisorhomepagesController', AdvisorhomepagesController);

    AdvisorhomepagesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'advisorhomepageResolve'];

    function AdvisorhomepagesController($scope, $state, $window, Authentication, advisorhomepage) {
        var vm = this;

        vm.authentication = Authentication;
        vm.advisorhomepage = advisorhomepage;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;


        // Remove existing Advisorhomepage
        function remove() {
            if ($window.confirm('Are you sure you want to delete?')) {
                vm.advisorhomepage.$remove($state.go('advisorhomepages.list'));
            }
        }

        // Save Advisorhomepage
        function save(isValid) {
            console.log("jordi save");
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.advisorhomepageForm');
                return false;
            }
            console.log("Jorge save");
            // TODO: move create/update logic to service
            if (vm.advisorhomepage._id) {
                vm.advisorhomepage.$update(successCallback, errorCallback);
            } else {
                vm.advisorhomepage.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('advisorhomepages.view', {
                    advisorhomepageId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }

        /**
         * saves the student
         * TODO: check that the ufId is not already there, if it is make it invalid
         * @param body
         * @returns {*}
         */
        $scope.saveWithBody = function (body) {
            console.log(body);
            vm.advisorhomepage.form = body;
            return new Promise(function (resolve, reject) {
                vm.advisorhomepage.$save().then(function (res) {
                    return resolve(res);
                }).catch(function (err) {
                    return reject(err);
                });
            })
        }

        /**
         * pass the student id and returns the student
         * @param studentId
         * @returns {*}
         */
        $scope.getWithStudentId = function (studentId) {
            // vm.advisorhomepage.studentId = studentId;
            // vm.advisorhomepage.$get({studentId:studentId});
            return new Promise(function (resolve, reject) {
                 vm.advisorhomepage.$get({studentId:studentId}).then(function (res) {
                     console.log(res);
                    return resolve(res);
                }).catch(function (err) {
                    return reject(err);
                });
            })
        }
    }
}());

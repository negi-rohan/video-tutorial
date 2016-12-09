(function() {
    'use strict';

    angular
        .module('web')
        .controller('StudentListController', StudentListController);

    /** @ngInject */
    function StudentListController($http, CommonInfo, $state, growl, _) {
        var vm = this;
        var perPage = 40;
        var test;

        vm.currentTestUserPage = 1;
        vm.sarchText = '';
        vm.testUsers = [];
        vm.testUserCount = 0;
        vm.lastTestUserPage = 0;

        vm.searchStudent = searchStudent;
        vm.showAnswers = showAnswers;
        vm.editAnswers = editAnswers;
        vm.getTestUsers = getTestUsers;

        activate();

        function activate() {
            test = CommonInfo.getInfo('testResultList');
            if (test && test.id) {
                getTestUsers(1);
            }
        }

        function getTestUsers(pageNo) {
            $http.post(CommonInfo.getAppUrl() + '/api/test/users', { 'testId': test.id, 'searchText': vm.searchText, 'page': pageNo }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testUsers = response.data.testUsers;
                    _.forEach(vm.testUsers, function(value) {
                        value.timeSpent = moment.duration(value.timeSpent, 'seconds').format("HH:mm:ss");
                    });
                    vm.testUserCount = response.data.recordCount;
                    vm.lastTestUserPage = Math.ceil(vm.testUserCount / perPage) || 1;
                    vm.currentTestUserPage = pageNo;
                }
            }, function(response) {});
        }

        function searchStudent() {
            getTestUsers(1);
        }

        function showAnswers(userId) {
            var data = { userId: userId, testId: test.id };
            CommonInfo.setInfo('testAnswer', data);
            $state.go('main.examAnswers');
        }

        function editAnswers(userId) {
            var data = { userId: userId, testId: test.id };
            CommonInfo.setInfo('testAnswer', data);
            $state.go('main.test.editTestAnswer');
        }
    }
})();

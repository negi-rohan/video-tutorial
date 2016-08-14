(function() {
    'use strict';

    angular
        .module('web')
        .controller('StudentListController', StudentListController);

    /** @ngInject */
    function StudentListController($http, CommonInfo, $state, growl) {
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
                    vm.testUserCount = response.data.recordCount;
                    vm.lastTestUserPage = Math.ceil(vm.testUserCount / perPage) || 1;
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
    }
})();

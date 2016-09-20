(function() {
    'use strict';

    angular
        .module('web')
        .controller('StudentSeriesListController', StudentSeriesListController);

    /** @ngInject */
    function StudentSeriesListController($http, CommonInfo, $state, _) {
        var vm = this;

        vm.showExam = showExam;

        activate();

        function activate() {
            vm.user = CommonInfo.getInfo('testUser');
            CommonInfo.setInfo('userTestSeries', '');
            if (vm.user && vm.user.id)
                getAllTestSeries();
        }

        function getAllTestSeries() {
            $http.post(CommonInfo.getAppUrl() + '/api/testSeries/byUser', { 'userId': vm.user.id, type: 'byUser' }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testSeries = response.data.testSeries;
                }
            }, function(response) {});
        }

        function showExam(testSeries) {
            if (testSeries && testSeries.id) {
                CommonInfo.setInfo('userTestSeries', testSeries);
                $state.go('main.test.userExamsList');
            }
        }
    }
})();

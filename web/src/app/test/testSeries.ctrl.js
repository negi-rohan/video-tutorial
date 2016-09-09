(function() {
    'use strict';

    angular
        .module('web')
        .controller('TestSeriesListController', TestSeriesListController);

    /** @ngInject */
    function TestSeriesListController($http, CommonInfo, $state, _) {
        var vm = this;

        vm.showExam = showExam;

        activate();

        function activate() {
            vm.user = CommonInfo.getInfo('user');
            CommonInfo.setInfo('testSeries', '');
            if(vm.user && vm.user.id)
                getAllTestSeries();
        }

        function getAllTestSeries(){
            $http.post(CommonInfo.getAppUrl() + '/api/testSeries/byUser', { 'userId': vm.user.id }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testSeries = response.data.testSeries;
                }
            }, function(response) {});
        }

        function showExam(testSeries) {
            if(testSeries && testSeries.id){
                CommonInfo.setInfo('testSeries', testSeries);
                $state.go('main.examsList');
            }
        }
    }
})();

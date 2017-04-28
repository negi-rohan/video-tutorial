(function() {
    'use strict';

    angular
        .module('web')
        .controller('TestSeriesListController', TestSeriesListController);

    /** @ngInject */
    function TestSeriesListController($http, CommonInfo, $state, _) {
        var vm = this;

        vm.showExam = showExam;
        vm.subscribeTestSeries = subscribeTestSeries;

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

        function subscribeTestSeries(series) {
            if (series.id && vm.user.id) {
                var data = {
                    testSeriesId: series.id,
                    users: [vm.user.id],
                    testSeriesName: series.name
                };
                $http.post(CommonInfo.getAppUrl() + '/api/testSeries/addUsers', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        showExam(series);
                    } else if(response && response.data && response.data.Error){
                        growl.info(response.data.Message);
                    }
                }, function(response) {});
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('web')
        .controller('SeriesTestController', SeriesTestController);

    /** @ngInject */
    function SeriesTestController($http, CommonInfo, $state, growl, $uibModal) {
        var vm = this;
        //var perPage = 40;
        var series;

        //vm.currentTestPage = 1;
        vm.searchText = '';
        vm.tests = [];
        vm.testsCount = 0;
        //vm.lastTestPage = 0;

        // vm.searchTest = searchTest;
        vm.getSeriesTest = getSeriesTest;
        vm.editSeriesTest = editSeriesTest;

        activate();

        function activate() {
            series = CommonInfo.getInfo('series');
            if (series && series.id) {
                getSeriesTest(1);
            }
        }

        function getSeriesTest(pageNo) {
            $http.post(CommonInfo.getAppUrl() + '/api/testSeries/getTests', { 'testSeriesId': series.id }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.tests = response.data.tests;
                    //vm.testsCount = response.data.recordCount;
                    //vm.lastTestPage = Math.ceil(vm.testsCount / perPage) || 1;
                    //vm.currentTestPage = pageNo;
                }
            }, function(response) {});
        }

        function editSeriesTest(test) {
            var data = {
                testSeries: series,
                tests: [{
                    id: test.id,
                    title: test.title,
                    startDate: test.startDate ? new Date(test.startDate) : '',
                    endDate: test.endDate ? new Date(test.endDate) : '',
                    resultDate: test.resultDate ? new Date(test.resultDate) : ''
                }]
            };
            console.log(data)
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/test/addTestToSeries.html',
                size: 'lg',
                controller: function($scope, item) {
                    $scope.data = item;
                    $scope.ok = function() {
                        var values = {
                            testSeriesId: data.testSeries.id,
                            tests: []
                        };
                        _.forEach(data.tests, function(value) {
                            values.tests.push({
                                id: value.id,
                                startDate: value.startDate ? moment(value.startDate).format('YYYY-MM-DD HH:mm:SS') : null, //moment(value.startDate).format('YYYY-MM-DD HH:mm:SS')
                                endDate: value.endDate ? moment(value.endDate).format('YYYY-MM-DD HH:mm:SS') : null,
                                resultDate: value.resultDate ? moment(value.resultDate).format('YYYY-MM-DD HH:mm:SS') : null
                            });
                        });
                        $http.post(CommonInfo.getAppUrl() + '/api/testSeries/addTest', values).then(function(response) {
                            if (response && response.data && !response.data.Error) {
                                growl.success(response.data.Message);
                                getSeriesTest();
                            }
                        }, function(response) {});
                    }
                },
                resolve: {
                    item: function() {
                        return data;
                    }
                }
            });
        }

        function searchTest() {
            getSeriesTest(1);
        }
    }
})();

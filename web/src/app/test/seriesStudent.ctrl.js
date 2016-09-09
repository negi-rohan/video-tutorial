(function() {
    'use strict';

    angular
        .module('web')
        .controller('SeriesStudentController', SeriesStudentController);

    /** @ngInject */
    function SeriesStudentController($http, CommonInfo, $state, growl) {
        var vm = this;
        var perPage = 40;
        var series;

        vm.currentStudentPage = 1;
        vm.sarchText = '';
        vm.students = [];
        vm.studentsCount = 0;
        vm.lastStudentPage = 0;

        vm.searchStudent = searchStudent;
        vm.getSeriesStudent = getSeriesStudent;

        activate();

        function activate() {
            series = CommonInfo.getInfo('series');
            if (series && series.id) {
                getSeriesStudent(1);
            }
        }

        function getSeriesStudent(pageNo) {
            $http.post(CommonInfo.getAppUrl() + '/api/testSeries/userList', { 'testSeriesId': series.id, 'searchText': vm.searchText, 'page': pageNo }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.students = response.data.students;
                    vm.studentsCount = response.data.recordCount;
                    vm.lastStudentPage = Math.ceil(vm.studentsCount / perPage) || 1;
                    vm.currentStudentPage = pageNo;
                }
            }, function(response) {});
        }

        function searchStudent() {
            getSeriesStudent(1);
        }
    }
})();

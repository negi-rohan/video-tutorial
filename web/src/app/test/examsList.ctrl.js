(function() {
    'use strict';

    angular
        .module('web')
        .controller('ExamListController', ExamListController);

    /** @ngInject */
    function ExamListController($http, CommonInfo, $state, _) {
        var vm = this;

        vm.startExam = startExam;
        vm.showAnswers = showAnswers;

        activate();

        function activate() {
            CommonInfo.setInfo('exam', '');
            vm.user = CommonInfo.getInfo('user');
            vm.testSeries = CommonInfo.getInfo('testSeries');
            getAllExams();
        }

        function getAllExams() {
            $http.post(CommonInfo.getAppUrl() + '/api/exam/all', { 'userId': vm.user.id, 'testSeriesId': vm.testSeries.id }).then(function(response) {
                if (response && response.data) {
                    _.forEach(response.data.tests, function(value) {
                        value.durationInHrs = moment.duration(value.duration, 'seconds').format("HH:mm:ss");
                        value.isUpcoming = moment().isBefore(value.startDate);
                        value.attachment = value.attachment ? value.attachment.split(',') : [];
                        value.isOver = moment().isAfter(value.endDate);
                    });
                    vm.exams = response.data.tests;
                }
            }, function(response) {});
        }

        function startExam(test) {
            if (!test.status || test.status == 'pending') {
                test.userId = vm.user.id;
                test.userName = vm.user.fullName;
                CommonInfo.setInfo('exam', test);
                $state.go('main.exam');
            }
        }

        function showAnswers(test) {
            CommonInfo.setInfo('testAnswer', { userId: vm.user.id, testId: test.id });
            $state.go('main.examAnswers');
        }
    }
})();

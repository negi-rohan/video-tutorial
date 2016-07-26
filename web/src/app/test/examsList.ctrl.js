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
            getAllExams();
        }

        function getAllExams() {
            $http.post(CommonInfo.getAppUrl() + '/api/exam/all', { 'userId': vm.user.id }).then(function(response) {
                if (response && response.data) {
                    _.forEach(response.data.tests, function(value){
                        value.durationInHrs = moment.duration(value.duration, 'seconds').format("HH:mm:ss")
                    });
                    vm.exams = response.data.tests;
                }
            }, function(response) {});
        }

        function startExam(test) {
            CommonInfo.setInfo('exam', test);
            $state.go('main.exam');
        }

        function showAnswers(test) {
            CommonInfo.setInfo('exam', test);
            $state.go('main.examAnswers');
        }
    }
})();

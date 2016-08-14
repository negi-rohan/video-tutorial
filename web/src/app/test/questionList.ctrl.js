(function() {
    'use strict';

    angular
        .module('web')
        .controller('QuestionListController', QuestionListController);

    /** @ngInject */
    function QuestionListController($http, CommonInfo) {
        var vm = this;
        var questionPaper;
        var perPage = 40;

        vm.questions = [];
        vm.currentPage = 1;
        vm.questionCount;
        vm.lastPage;

        vm.getAllQuestions = getAllQuestions;

        activate();

        function activate() {
            questionPaper = CommonInfo.getInfo('selectedQuestionPaper');
            if(questionPaper && questionPaper.id){
                getAllQuestions(1);
            }
        }

        function getAllQuestions(pageNo) {
            $http.post(CommonInfo.getAppUrl() + '/api/question/byQPId', { page: pageNo, perPage: perPage, questionPaperId: questionPaper.id }).then(function(response) {
                if (response && response.data) {
                    vm.currentPage = pageNo
                    vm.questions = response.data.questions;
                    vm.questionCount = response.data.recordCount;
                    vm.lastPage = Math.ceil(vm.questionCount / perPage) || 1;
                }
            }, function(response) {});
        }
    }
})();

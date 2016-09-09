(function() {
    'use strict';

    angular
        .module('web')
        .controller('QuestionListController', QuestionListController);

    /** @ngInject */
    function QuestionListController($http, CommonInfo, $state) {
        var vm = this;
        var questionPaper;
        var perPage = 40;

        vm.questions = [];
        vm.currentPage = 1;
        vm.questionCount;
        vm.lastPage;

        vm.getAllQuestions = getAllQuestions;
        // vm.getQuestionById = getQuestionById;
        // vm.updateQuestion = updateQuestion;


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

        function getQuestionById(questionId) {
            if (questionId) {
                $http.post(CommonInfo.getAppUrl() + '/api/question/byId', { 'questionId': questionId }).then(function(response) {
                    if (response && response.data && response.data.question) {
                        vm.question = response.data.question;
                        editQuestion('edit', vm.question);
                    }
                }, function(response) {});
            }
        }

        function editQuestion(mode, question) {
            vm.objMode = mode;
            vm.question = question || {};
            vm.question.correctAnswer = vm.question.correctAnswer || '';
            if (!vm.question.answers) {
                vm.question.answers = getNewAnswerSet();
            }
            if (!vm.question.childQuestions) {
                vm.question.childQuestions = [{ correctAnswer: '', question: '', isDeleted: 0, answers: getNewAnswerSet() }];
            }
            if (mode == 'edit') {
                $state.go('main.test.editQuestion');
            } else if (mode == 'insert') {
                $state.go('main.test.createQuestion');
            }
        }

        function addChildQuestion() {
            vm.question.childQuestions.push({ correctAnswer: '', question: '', isDeleted: 0, answers: getNewAnswerSet() });
        }

        function getNewAnswerSet() {
            var answers = [];
            for (var i = 0; i < 4; i++)
                answers.push({ answerText: '', isDeleted: 0 });
            return answers;
        }

        function updateQuestion(addNew) {
            if (vm.question) {
                $http.post(CommonInfo.getAppUrl() + '/api/question', vm.question).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Question added successfully');
                        if (!addNew) {
                            $state.go('main.test.home');
                            getAllQuestions();
                        } else {
                            vm.question = {
                                answers: getNewAnswerSet(),
                                childQuestions: [{ question: '', isDeleted: 0, answers: getNewAnswerSet() }]
                            };
                        }
                    }
                }, function(response) {});
            }
        }

        function deleteQuestion(questionId) {
            if (confirm('Are you sure, you want to delete question')) {
                $http.post(CommonInfo.getAppUrl() + '/api/question/delete', { 'questionId': questionId }).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Question deleted successfully');
                        getAllQuestions();
                    }
                }, function(response) {});
            }
        }
    }
})();

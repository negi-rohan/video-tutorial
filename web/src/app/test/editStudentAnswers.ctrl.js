(function() {
    'use strict';

    angular
        .module('web')
        .controller('EditAnswersController', EditAnswersController);

    /** @ngInject */
    function EditAnswersController($http, CommonInfo, _, growl) {
        var vm = this;

        var testUser = {};

        vm.saveUserAnswer = saveUserAnswer;

        activate();

        function activate() {
            getUserAnswers();
        }

        function getUserAnswers() {
            testUser = CommonInfo.getInfo('testAnswer');
            var data = {
                userId: testUser.userId, //vm.user.id,
                testId: testUser.testId //vm.exam.id
            };
            $http.post(CommonInfo.getAppUrl() + '/api/exam/userAnswers', data).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.userAnswers = response.data.userAnswers;
                    vm.selectedLang = vm.userAnswers.selectedLang;
                    if (vm.userAnswers && vm.userAnswers.questions && vm.userAnswers.questions.length > 0) {
                        if (vm.userAnswers.userInfo && vm.userAnswers.userInfo.length > 0) {
                            _.forEach(vm.userAnswers.questions, function(value) {
                                if (value.type != 'Passage') {
                                    var userAnswer = _.find(vm.userAnswers.userInfo, { 'questionId': value.id });
                                    value.userAnsKey = userAnswer ? userAnswer.answer : null;
                                }
                            });
                            vm.questions = [];
                            _.forEach(vm.userAnswers.questions, function(value) {
                                if (value.type == 'MCQ') {
                                    vm.questions.push(value);
                                } else if (value.type == 'Passage') {
                                    var childQuestions = _.filter(vm.userAnswers.questions, { 'parentQuestionId': value.id });
                                    childQuestions[0].passage = value.question;
                                    vm.questions = vm.questions.concat(childQuestions);
                                }
                            });
                            console.log(vm.questions)
                        }
                    }
                }
            }, function(response) {});
        }

        function saveUserAnswer() {
            var data = {
                userId: testUser.userId,
                testId: testUser.testId,
                answers: [] 
            };
            _.forEach(vm.questions, function(value) {
                var answer = {
                    questionId: value.id,
                    answer: value.userAnsKey
                }
                data.answers.push(answer);
            });
            $http.post(CommonInfo.getAppUrl() + '/api/exam/editUserAnswer', data).then(function(response) {
                if(response && response.data && !response.data.Error){
                    growl.success('Answer updated');
                }
            }, function(response) {});
        }
    }
})();

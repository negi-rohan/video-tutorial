(function() {
    'use strict';

    angular
        .module('web')
        .controller('TestAnswersController', TestAnswersController);

    /** @ngInject */
    function TestAnswersController($http, CommonInfo, _) {
        var vm = this;

        activate();

        function activate() {
            vm.exam = CommonInfo.getInfo('exam');
            vm.user = CommonInfo.getInfo('user');
            getUserAnswers();
        }

        function getUserAnswers() {
            var data = {
                userId: vm.user.id,
                testId: vm.exam.id
            };
            $http.post(CommonInfo.getAppUrl() + '/api/exam/userAnswers', data).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.userAnswers = response.data.userAnswers;
                    if(vm.userAnswers.score){
                        getTestUsers();
                    }
                    vm.userAnswers.totalCorrect = 0;
                    vm.userAnswers.totalIncorrect = 0;
                    vm.userAnswers.totalUnanswered = 0;
                    if (vm.userAnswers && vm.userAnswers.questions && vm.userAnswers.questions.length > 0) {
                        if (vm.userAnswers.userInfo && vm.userAnswers.userInfo.length > 0) {
                            _.forEach(vm.userAnswers.questions, function(value) {
                                if (value.type != 'Passage') {
                                    var userAnswer = _.find(vm.userAnswers.userInfo, { 'questionId': value.id });
                                    value.userAnsKey = userAnswer ? userAnswer.answer : 'None';
                                    if(value.userAnsKey == value.correctAnswer){
                                        vm.userAnswers.totalCorrect++;
                                        value.result = 'correct';
                                    }
                                    else if(value.userAnsKey == 'None'){
                                        vm.userAnswers.totalUnanswered++;
                                        value.result = 'unanswered';
                                    }
                                    else{
                                        vm.userAnswers.totalIncorrect++;
                                        value.result = 'incorrect';
                                    }
                                    if (value.userAnsKey)
                                        value.userAnswer = _.find(value.answers, { 'ansKey': value.userAnsKey }).answerText;
                                    else
                                        value.userAnswer = "NA"
                                    value.correctAnswer = _.find(value.answers, { 'ansKey': value.correctAnswer }).answerText;
                                }
                            });
                            vm.questions = [];
                            _.forEach(vm.userAnswers.questions, function(value){
                                if(value.type == 'MCQ'){
                                    vm.questions.push(value);
                                } else if(value.type == 'Passage'){
                                    var childQuestions = _.filter(vm.userAnswers.questions, { 'parentQuestionId': value.id});
                                    childQuestions[0].passage = value.question;
                                    vm.questions = vm.questions.concat(childQuestions);
                                }
                            });
                        }
                    }
                }
            }, function(response) {});
        }

        function getTestUsers(){
            $http.post(CommonInfo.getAppUrl() + '/api/test/users', { 'testId': vm.exam.id, withEvaluatedStatus: true }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testUsers = response.data.testUsers;
                }
            }, function(response) {});
        }
    }
})();

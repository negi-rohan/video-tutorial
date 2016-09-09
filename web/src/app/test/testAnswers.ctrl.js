(function() {
    'use strict';

    angular
        .module('web')
        .controller('TestAnswersController', TestAnswersController);

    /** @ngInject */
    function TestAnswersController($http, CommonInfo, _) {
        var vm = this;

        var difficultyRange = [{
            rangeFrom: 0,
            rangeTill: 21,
            text: 'Extremely Difficult'
        },
        {
            rangeFrom: 21,
            rangeTill: 36,
            text: 'Difficult'
        },
        {
            rangeFrom: 36,
            rangeTill: 51,
            text: 'Average'
        },
        {
            rangeFrom: 51,
            rangeTill: 71,
            text: 'Easy'
        },
        {
            rangeFrom: 71,
            rangeTill: 101,
            text: 'Very Easy'
        }];
        var testUser = {};

        vm.subjectWise = {};
        vm.selectedLang = 1;

        vm.getHtml = getHtml;

        activate();

        function activate() {
            // vm.exam = CommonInfo.getInfo('exam');
            // vm.user = CommonInfo.getInfo('user');
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
                                    vm.subjectWise[value.subjectId] = vm.subjectWise[value.subjectId] || { total: 0, correct: 0, unanswered: 0, incorrect: 0 };
                                    vm.subjectWise[value.subjectId].name = value.subjectName;
                                    vm.subjectWise[value.subjectId].total++;

                                    var userAnswer = _.find(vm.userAnswers.userInfo, { 'questionId': value.id });
                                    value.userAnsKey = userAnswer ? userAnswer.answer : null;
                                    if (value.userAnsKey == value.correctAnswer) {
                                        vm.userAnswers.totalCorrect++;
                                        vm.subjectWise[value.subjectId].correct++;
                                        value.result = 'correct';
                                    } else if (!value.userAnsKey) {
                                        vm.userAnswers.totalUnanswered++;
                                        vm.subjectWise[value.subjectId].unanswered++;
                                        value.result = 'unanswered';
                                    } else {
                                        vm.subjectWise[value.subjectId].incorrect++;
                                        vm.userAnswers.totalIncorrect++;
                                        value.result = 'incorrect';
                                    }
                                    if (value.userAnsKey) {
                                        if (vm.selectedLang == 1)
                                            value.userAnswer = _.find(value.answers, { 'ansKey': value.userAnsKey }).answerText;
                                        else
                                            value.userAnswer = _.find(value.answers, { 'ansKey': value.userAnsKey }).ansText;
                                    } else {
                                        value.userAnswer = "Not Answered"
                                    }
                                    value.correctAnsKey = value.correctAnswer;
                                    if (value.correctAnswer) {
                                        if (vm.selectedLang == 1)
                                            value.correctAnswer = _.find(value.answers, { 'ansKey': value.correctAnswer }).answerText;
                                        else
                                            value.correctAnswer = _.find(value.answers, { 'ansKey': value.correctAnswer }).ansText;
                                    }
                                    if (value.totalAttempt) {
                                        var difficultyMeter = _.round((value.correct / value.totalAttempt) * 100);
                                        value.difficultyMeter = _.find(difficultyRange, function(value){
                                            return _.inRange(difficultyMeter, value.rangeFrom, value.rangeTill);
                                        }).text;
                                    }
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
                        }
                    }
                }
            }, function(response) {});
        }

        function getTestUsers() {
            $http.post(CommonInfo.getAppUrl() + '/api/test/users', { 'testId': testUser.testId, withEvaluatedStatus: true }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testUsers = response.data.testUsers;
                }
            }, function(response) {});
        }

        function getHtml() {
            // var html = angular.element(document.getElementById('solution')).html()
            // $http.post(CommonInfo.getAppUrl() + '/api/exam/userAnswersPdf', { html: html }).then(function(response) {
            //     if(response && response.data && !response.data.Error) {
            //         console.log(response.data.url)
            //     }
            // }, function(response) {});

            if (vm.allowed) {
                html2canvas(document.getElementById('exportthis'), {
                    onrendered: function(canvas) {
                        var data = canvas.toDataURL();
                        var docDefinition = {
                            content: [{
                                image: data,
                                width: 500
                            }]
                        };
                        pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
                    }
                });

                // var html = angular.element(document.getElementById('exportthis')).html()
                // $http.post(CommonInfo.getAppUrl() + '/api/exam/userAnswersPdf', { html: html }).then(function(response) {
                //     if(response && response.data && !response.data.Error) {
                //         console.log(response.data.url)
                //         window.open(response.data.url, "_blank")
                //     }
                // }, function(response) {});
            } else {
                vm.allowed = true
            }
        }
    }
})();

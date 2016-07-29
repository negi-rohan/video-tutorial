(function() {
    'use strict';

    angular
        .module('web')
        .controller('ExamController', ExamController)
        .directive('instructionBoard', instructionBoard)
        .directive('questionArea', questionArea)
        .directive('navigationArea', navigationArea);

    /** @ngInject */
    function instructionBoard(resize, $window) {
        return {
            restrict: 'A',

            link: function(scope, elem, attrs) {

                resize(scope).call(function() {
                    elem.css('height', $window.innerHeight - 120 + 'px');
                });
            }
        };
    }

    /** @ngInject */
    function questionArea(resize, $window) {
        return {
            restrict: 'A',

            link: function(scope, elem, attrs) {

                resize(scope).call(function() {
                    elem.css('height', $window.innerHeight - 131 + 'px');
                });
            }
        };
    }

    function navigationArea(resize, $window) {
        return {
            restrict: 'A',

            link: function(scope, elem, attrs) {

                resize(scope).call(function() {
                    elem.css('height', $window.innerHeight - 220 + 'px');
                });
            }
        };
    }

    /** @ngInject */
    function ExamController($http, CommonInfo, $state, $scope, growl) {
        var vm = this;
        var userTime;

        vm.isExamStarted = false;
        vm.userCurrentQuestion = [];

        vm.startExam = startExam;
        vm.showQuestion = showQuestion;
        vm.submitExam = submitExam;
        vm.selectAnswer = selectAnswer;

        activate();

        function activate() {
            vm.exam = CommonInfo.getInfo('exam');
            vm.isPreview = vm.exam.isPreview ? true : false;
            alert(vm.isPreview)
            vm.user = CommonInfo.getInfo('user');
            if (vm.exam && vm.user) {
                vm.timer = vm.exam.duration;
                getExamQuestions();
            }
        }

        $scope.$on('timer-tick', function(event, args) {
            userTime = args.millis
            console.log(args)
        });

        $scope.$on('timer-stopped', function(event, data) {
            console.log('Timer Stopped - data = ', data);
            alert('Your exam time is over, press ok to submit exam')
            submitExam(true);
        });

        function getExamQuestions() {
            $http.post(CommonInfo.getAppUrl() + '/api/exam/byId', { testId: vm.exam.id }).then(function(response) {
                if (response && response.data) {
                    vm.exam.questions = response.data.questions;
                    getUserTestInfo();
                }
            }, function(response) {});
        }

        function getUserTestInfo() {
            var data = {
                userId: vm.user.id,
                testId: vm.exam.id
            };
            if (!vm.isPreview) {
                $http.post(CommonInfo.getAppUrl() + '/api/exam/userInfo', data).then(function(response) {
                    if (response && response.data) {
                        vm.exam.userInfo = response.data.userTestInfo;
                        if (vm.exam && vm.exam.userInfo && vm.exam.userInfo.status == 'pending' && vm.exam.userInfo.timeRemaining == 0) {
                            alert('Your exam time is over, press ok to submit exam')
                            submitExam(true);
                        } else {
                            vm.timer = vm.exam.userInfo.timeRemaining || vm.timer;
                            _.forEach(vm.exam.questions, function(value, key) {
                                vm.userCurrentQuestion[key] = _.find(vm.exam.userInfo.answers, { 'questionId': value.id }) || {
                                    questionId: value.id,
                                    answer: '',
                                    isMarked: false
                                };
                            });
                        }
                    }
                }, function(response) {});
            } else {
                _.forEach(vm.exam.questions, function(value, key) {
                    vm.userCurrentQuestion[key] = {
                        questionId: value.id,
                        answer: '',
                        isMarked: false
                    };
                });
            }
        }

        function startExam() {
            if (vm.exam && vm.exam.questions && vm.exam.questions.length > 0) {
                vm.isExamStarted = true;
                showQuestion(0);
                $scope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams) {
                        if (vm.isExamStarted)
                            event.preventDefault();
                    });
            }
        }

        function showQuestion(questionNo) {
            vm.currentIndex = questionNo;
            vm.currentQuestionIndex = questionNo + 1;
            vm.currentQuestion = vm.exam.questions[questionNo];
        }

        function selectAnswer() {
            submitExam(false, 'pending')
        }

        function submitExam(isForced, status) {
            var confirmation = false;
            status = status || 'completed';
            var data = {
                userId: vm.user.id,
                testId: vm.exam.id,
                timeRemaining: userTime / 1000,
                answers: vm.userCurrentQuestion,
                status: status
            };
            if(!vm.isPreview){
                if (isForced || status == 'pending' || confirm('Are you sure, you want to submit(final) your answers')) {
                    $http.post(CommonInfo.getAppUrl() + '/api/exam/submit', data).then(function(response) {
                        if (response && response.data) {
                            if (status == 'completed') {
                                vm.isExamStarted = false;
                                growl.success('Your answers saved successfully');
                                $scope.$on('$stateChangeStart',
                                    function(event, toState, toParams, fromState, fromParams) {
                                        return true;
                                    });
                                $state.go('main.examsList');
                            }
                        }
                    }, function(response) {});
                }
            }
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('web')
        .controller('ExamController', ExamController)
        .directive('instructionBoard', instructionBoard)
        .directive('questionArea', questionArea)
        .directive('navigationArea', navigationArea);
        //.directive('confirmOnExit', confirmOnExit);

    /** @ngInject */
    // function confirmOnExit() {
    //     return {
    //         link: function($scope, elem, attrs) {
    //             window.onbeforeunload = function() {
    //                 return "The form is dirty, do you want to stay on the page?";
    //             }
    //             $scope.$on('$locationChangeStart', function(event, next, current) {
    //                 if (!confirm("The form is dirty, do you want to stay on the page?")) {
    //                     event.preventDefault();
    //                 }
    //             });
    //         }
    //     };
    // }

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
    function ExamController($http, CommonInfo, $state, $scope, growl, $interval) {
        var vm = this;
        var userTime;
        var submitAttempt = 0;
        var userInfoLocalStorage;

        vm.isExamStarted = false;
        vm.isExamEnded = false;
        vm.userCurrentQuestion = [];
        vm.timer = 0;

        vm.startExam = startExam;
        vm.showQuestion = showQuestion;
        vm.submitExam = submitExam;
        vm.saveLocal = saveLocal;

        activate();

        function activate() {
            vm.exam = CommonInfo.getInfo('exam');
            vm.isPreview = vm.exam.isPreview ? true : false;
            vm.user = CommonInfo.getInfo('user');
            if (vm.exam && vm.user) {
                vm.timer = vm.exam.duration;
                getExamQuestions();
            }
        }

        $scope.$on('timer-tick', function(event, args) {
            userTime = args.millis;
        });

        $scope.$on('timer-stopped', function(event, data) {
            vm.isExamEnded = true;
            alert('Your exam time is over, press ok to submit exam');
            submitExam(true);
        });

        function getExamQuestions() {
            $http.post(CommonInfo.getAppUrl() + '/api/exam/byId', { testId: vm.exam.id }).then(function(response) {
                if (response && response.data) {
                    vm.exam.questions = response.data.questions;
                    userInfoLocalStorage = CommonInfo.getInfo(vm.user.id + '_' + vm.exam.id);
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
                    if (response && response.data && !response.data.Error) {
                        if (compareTimestamp()) {
                            vm.exam.userInfo = userInfoLocalStorage;
                        } else {
                            vm.exam.userInfo = response.data.userTestInfo;
                        }
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
                    } else {
                        growl.info('Some error occured, try after some time');
                        $state.go('main.examsList');
                    }
                }, function(response) {
                    growl.info('Some error occured, try after some time');
                    $state.go('main.examsList');
                });
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

        function compareTimestamp() {
            if (userInfoLocalStorage && userInfoLocalStorage.timestamp) {
                if (vm.exam.userInfo && vm.exam.userInfo.timestamp) {
                    if (moment(vm.exam.userInfo.timestamp).isBefore(userInfoLocalStorage.timestamp))
                        return true;
                    else
                        return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        function startExam() {
            if (vm.exam && vm.exam.questions && vm.exam.questions.length > 0) {
                vm.isExamStarted = true;
                showQuestion(0);
                $interval(function() { saveLocal() }, 10000);
                $interval(function() { submitExam(false, 'pending') }, 60000);
                $scope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams) {
                        if (vm.isExamStarted && !vm.isExamEnded)
                            event.preventDefault();
                    });
            }
        }

        function showQuestion(questionNo) {
            vm.currentIndex = questionNo;
            vm.currentQuestionIndex = questionNo + 1;
            vm.currentQuestion = vm.exam.questions[questionNo];
            saveLocal();
        }

        function saveLocal() {
            //submitExam(false, 'pending');
            console.log(123)
            var data = {
                userId: vm.user.id,
                testId: vm.exam.id,
                timeRemaining: userTime / 1000,
                answers: vm.userCurrentQuestion,
                status: 'pending',
                timestamp: moment()
            };
            CommonInfo.setInfo(vm.user.id + '_' + vm.exam.id, data);
        }

        function submitExam(isForced, status) {
            var confirmation = false;
            status = status || 'completed';
            var data = {
                userId: vm.user.id,
                testId: vm.exam.id,
                timeRemaining: userTime / 1000,
                answers: vm.userCurrentQuestion,
                status: status,
                timestamp: moment()
            };
            if (!vm.isPreview) {
                if (isForced || status == 'pending' || confirm('Are you sure, you want to submit(final) your answers')) {
                    $http.post(CommonInfo.getAppUrl() + '/api/exam/submit', data).then(function(response) {
                        if (response && response.data) {
                            if (status == 'completed') {
                                vm.isExamEnded = true;
                                growl.success('Your answers saved successfully');
                                $state.go('main.examsList');
                            } else {
                                if (submitAttempt > 3) {
                                    submitAttempt++;
                                    submitExam(true);
                                }
                            }
                        }
                    }, function(response) {
                        if (submitAttempt > 3) {
                            submitAttempt++;
                            submitExam(true);
                        }
                    });
                }
            }
        }
    }
})();

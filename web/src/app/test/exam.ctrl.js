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
                    elem.css('height', $window.innerHeight - 220 + 'px');
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
    function ExamController($http, CommonInfo, $state, $scope, growl, $interval, $window) {
        var vm = this;
        var userTime;
        var submitAttempt = 0;
        var userInfoLocalStorage;
        var localSubmit, serverSubmit;
        var isInProcess = false;

        vm.isExamStarted = false;
        vm.isExamEnded = false;
        vm.isAdmin = false;
        vm.userCurrentQuestion = [];
        vm.timer = 0;
        vm.selectedLang = 0;
        vm.showLangChoice = 0;
        vm.user = {};

        vm.startExam = startExam;
        vm.showQuestion = showQuestion;
        vm.submitExam = submitExam;
        vm.saveLocal = saveLocal;

        activate();

        function activate() {
            var currentUser = CommonInfo.getInfo('user');
            vm.exam = CommonInfo.getInfo('exam');
            vm.user.id = vm.exam.userId;
            if (vm.user.id != currentUser.id)
                vm.isAdmin = true;
            vm.user.name = vm.exam.userName;
            if (vm.exam && vm.user) {
                vm.isPreview = vm.exam.isPreview ? true : false;
                vm.timer = vm.exam.duration;
                getExamQuestions();
            }
        }

        $scope.$on('timer-tick', function(event, args) {
            userTime = args.millis;
        });

        $scope.$on('timer-stopped', function(event, data) {
            if (!isInProcess) {
                vm.isExamEnded = true;
                alert('Your exam time is over, press ok to submit exam');
                submitExam(true);
            }
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
                            vm.showLangChoice = vm.exam.questions[0].questionText ? 1 : 0;
                            if (vm.showLangChoice)
                                vm.selectedLang = vm.exam.userInfo.selectedLang ? vm.exam.userInfo.selectedLang : 0;
                            else
                                vm.selectedLang = 1;
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
                        if (vm.isAdmin)
                            $state.go('main.test.userExamsList');
                        else
                            $state.go('main.examsList');
                    }
                }, function(response) {
                    growl.info('Some error occured, try after some time');
                    if (vm.isAdmin)
                        $state.go('main.test.userExamsList');
                    else
                        $state.go('main.examsList');
                });
            } else {
                vm.showLangChoice = vm.exam.questions[0].questionText ? 1 : 0;
                if (vm.showLangChoice)
                    vm.selectedLang = 0;
                else
                    vm.selectedLang = 1;
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
                localSubmit = $interval(function() { saveLocal() }, 10000);
                serverSubmit = $interval(function() { submitExam(false, 'pending') }, 60000);
                $scope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams) {
                        if (vm.isExamStarted && !vm.isExamEnded)
                            event.preventDefault();
                    });
                stopNavigation();
            }
        }

        function stopNavigation() {
            // var myEvent = $window.attachEvent || $window.addEventListener,
            //     chkevent = $window.attachEvent ? 'onbeforeunload' : 'beforeunload';

            // myEvent(chkevent, function(e) {
            //     submitExam(false, 'pending');
            //     var confirmationMessage = ' ';
            //     (e || $window.event).returnValue = "Are you sure that you'd like to close the browser?";
            //     return confirmationMessage;
            // });

            // $scope.$on('$locationChangeStart', function(event) {
            //     submitExam(false, 'pending');
            //     var answer = confirm("Are you sure you want to leave this page?")
            //     if (!answer) {
            //         event.preventDefault();
            //     }
            // });
        }

        function showQuestion(questionNo) {
            vm.currentIndex = questionNo;
            vm.currentQuestionIndex = questionNo + 1;
            vm.currentQuestion = vm.exam.questions[questionNo];
            saveLocal();
        }

        function saveLocal() {
            //submitExam(false, 'pending');
            var data = {
                userId: vm.user.id,
                testId: vm.exam.id,
                timeRemaining: userTime / 1000,
                answers: vm.userCurrentQuestion,
                status: 'pending',
                timestamp: moment(),
                selectedLang: vm.selectedLang
            };
            CommonInfo.setInfo(vm.user.id + '_' + vm.exam.id, data);
        }

        function submitExam(isForced, status) {
            status = status || 'completed';
            var data = {
                userId: vm.user.id,
                testId: vm.exam.id,
                timeRemaining: userTime / 1000,
                answers: vm.userCurrentQuestion,
                status: status,
                timestamp: moment(),
                selectedLang: vm.selectedLang
            };
            if (!vm.isPreview && !isInProcess) {
                if (status == 'completed') {
                    isInProcess = true;
                    vm.isExamEnded = true;
                    $interval.cancel(localSubmit);
                    $interval.cancel(serverSubmit);
                    localSubmit = serverSubmit = undefined;
                    if (vm.isAdmin)
                        data.timeRemaining = 0;
                }
                if (isForced || status == 'pending' || confirm('Are you sure, you want to submit(final) your answers')) {
                    $http.post(CommonInfo.getAppUrl() + '/api/exam/submit', data).then(function(response) {
                        if (response && response.data) {
                            if (status == 'completed') {
                                growl.success('Your answers saved successfully');
                                if (vm.isAdmin)
                                    $state.go('main.test.userExamsList');
                                else
                                    $state.go('main.examsList');
                            } else {
                                if (status != 'pending') {
                                    if (submitAttempt <= 3) {
                                        submitAttempt++;
                                        submitExam(true);
                                    } else {
                                        growl.info('Unable to submit due to some server error, please try after some time');
                                        if (vm.isAdmin)
                                            $state.go('main.test.userExamsList');
                                        else
                                            $state.go('main.examsList');
                                    }
                                }
                            }
                        }
                    }, function(response) {
                        if (status != 'pending') {
                            if (submitAttempt <= 3) {
                                submitAttempt++;
                                submitExam(true);
                            } else {
                                growl.info('Unable to submit due to some server error, please try after some time');
                                if (vm.isAdmin)
                                    $state.go('main.test.userExamsList');
                                else
                                    $state.go('main.examsList');
                            }
                        }
                    });
                }
            }
        }
    }
})();

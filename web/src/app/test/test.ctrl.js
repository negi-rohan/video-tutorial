(function() {
    'use strict';

    angular
        .module('web')
        .controller('TestController', TestController)
        .filter('htmlToPlaintext', htmlToPlaintext);

    function htmlToPlaintext() {
        return function(text) {
            return angular.element(text).text();
        }
    }

    /** @ngInject */
    function TestController($http, CommonInfo, $state, growl, $uibModal, Upload, _, $window) {
        var vm = this;
        var selectedQuestionGrid = [];
        var inProcess = false;

        vm.objMode;
        vm.selectedTab = 0;
        vm.isQuestionSelected = false;
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = 'dd-MMMM-yyyy';
        vm.toolBar = [
            ['h1', 'h2', 'h3', 'bold', 'italics', 'underline'],
            ['ol', 'ul'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['html', 'insertImage', 'insertLink', 'insertVideo']
        ];
        vm.questionType = ['MCQ', "Passage"];
        vm.currentPage = 1;
        vm.keyCode = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];

        vm.getAllTests = getAllTests;
        vm.getTestById = getTestById;
        vm.editTest = editTest;
        vm.updateTest = updateTest
        vm.deleteTest = deleteTest;
        vm.evaluation = evaluation;
        vm.evaluationAll = evaluationAll;
        vm.recheck = recheck;
        vm.getAllquestionPapers = getAllquestionPapers;
        vm.editQuestionPaper = editQuestionPaper;
        vm.addSubject = addSubject;
        vm.deleteQuestionPaper = deleteQuestionPaper;
        vm.getAllQuestions = getAllQuestions;
        vm.questionSelection = questionSelection;
        vm.getQuestionById = getQuestionById;
        vm.editQuestion = editQuestion;
        vm.addChildQuestion = addChildQuestion;
        vm.updateQuestion = updateQuestion;
        vm.deleteQuestion = deleteQuestion;
        vm.addToPaper = addToPaper;
        vm.importQuestion = importQuestion;
        vm.getTestUsers = getTestUsers;
        vm.showTestPreview = showTestPreview;
        activate();

        function activate() {
            getAllTests();
            getAllSubjects();
        }

        //////// Test related ///////////////////////////////////////////////////////////
        function getAllTests() {
            resetQuestionSelection();
            $http.get(CommonInfo.getAppUrl() + '/api/test/all').then(function(response) {
                if (response && response.data) {
                    vm.tests = response.data.tests;
                }
            }, function(response) {});
        }

        function getTestById(testId) {
            if (testId) {
                $http.post(CommonInfo.getAppUrl() + '/api/test/byId', { 'testId': testId }).then(function(response) {
                    if (response && response.data && response.data.test) {
                        vm.test = response.data.test;
                        editTest('edit', vm.test);
                    }
                }, function(response) {});
            }
        }

        function editTest(mode, test) {
            vm.objMode = mode;
            getAllquestionPapers();
            if (mode == 'edit') {
                $state.go('main.test.editTest');
                vm.test = test;
                vm.test.startDate = vm.test.startDate ? new Date(vm.test.startDate) : "";
                vm.test.endDate = vm.test.endDate ? new Date(vm.test.endDate) : "";
            } else if (mode == 'insert') {
                vm.test = {};
                $state.go('main.test.createTest');
            }
        }

        function updateTest() {
            if (vm.test) {
                $http.post(CommonInfo.getAppUrl() + '/api/test', vm.test).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Test added successfully');
                        $state.go('main.test.home');
                        getAllTests();
                    }
                }, function(response) {});
            }
        }

        function deleteTest(testId) {
            if (confirm('Are you sure, you want to delete test')) {
                $http.post(CommonInfo.getAppUrl() + '/api/test/delete', { 'testId': testId }).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Test deleted successfully');
                        getAllTests();
                    }
                }, function(response) {});
            }
        }

        function evaluation(testId) {
            $http.post(CommonInfo.getAppUrl() + '/api/exam/instantEvaluation', { 'testId': testId }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    growl.success('Test evaluation successfully');
                    //getAllTests();
                }
            }, function(response) {});
        }

        function evaluationAll(testId) {
            $http.post(CommonInfo.getAppUrl() + '/api/exam/evaluation', { 'testId': testId, 'isForced': true }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    growl.success('Test evaluation successfully');
                    //getAllTests();
                }
            }, function(response) {});
        }

        function recheck(testId) {
            $http.post(CommonInfo.getAppUrl() + '/api/exam/reCheckAnswers', { 'testId': testId }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    growl.success('Test recheck successfully');
                    //getAllTests();
                }
            }, function(response) {});
        }

        ////////// Question Paper related ////////////////////////////////////////////////////////
        function getAllquestionPapers(holdSelection) {
            if (!holdSelection)
                resetQuestionSelection();
            $http.get(CommonInfo.getAppUrl() + '/api/questionPaper/all').then(function(response) {
                if (response && response.data) {
                    vm.questionPapers = response.data.questionPapers;
                }
            }, function(response) {});
        }

        function editQuestionPaper(mode, questionPaper) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'editQuestionPaper.html',
                controller: function($scope, item) {
                    $scope.quesPaper = item;
                    $scope.ok = function() {
                        if ($scope.quesPaper.name) {
                            $http.post(CommonInfo.getAppUrl() + '/api/questionPaper', $scope.quesPaper).then(function(response) {
                                if (response && response.data && !response.data.Error) {
                                    growl.success('Question paper added successfully');
                                }
                            }, function(response) {});
                        }
                    };
                },
                resolve: {
                    item: function() {
                        return questionPaper || {};
                    }
                }
            });
        }

        function getAllSubjects() {
            $http.get(CommonInfo.getAppUrl() + '/api/subject/all').then(function(response) {
                if (response && response.data) {
                    vm.subjectList = response.data.subjects;
                }
            }, function(response) {});
        }

        function addSubject() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'addSubjects.html',
                controller: function($scope, item) {
                    $scope.subjects = item;
                    $scope.ok = function() {
                        if ($scope.subject.name) {
                            $http.post(CommonInfo.getAppUrl() + '/api/subject', $scope.subject).then(function(response) {
                                if (response && response.data && !response.data.Error) {
                                    growl.success('Subject added successfully');
                                    getAllSubjects();
                                }
                            }, function(response) {});
                        }
                    };
                },
                resolve: {
                    item: function() {
                        return vm.subjectList || [];
                    }
                }
            });
        }

        function deleteQuestionPaper(quesPaperId) {
            if (confirm('Are you sure, you want to delete question paper')) {
                $http.post(CommonInfo.getAppUrl() + '/api/questionPaper/delete', { 'questionPaperId': quesPaperId }).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Test deleted successfully');
                        getAllquestionPapers();
                    }
                }, function(response) {});
            }
        }

        //////////Question related ////////////////////////////////////////////////////
        function getAllQuestions(pageNo) {
            vm.currentPage = pageNo;
            $http.post(CommonInfo.getAppUrl() + '/api/question/all', { page: pageNo, perPage: 40 }).then(function(response) {
                if (response && response.data) {
                    vm.questions = response.data.questions;
                    vm.questionCount = response.data.recordCount;
                    vm.lastPage = Math.ceil(vm.questionCount/40);
                }
            }, function(response) {});
        }

        function questionSelection() {
            selectedQuestionGrid = _.map(_.filter(vm.questions, { 'isSelected': true }), 'id');
            if (selectedQuestionGrid && selectedQuestionGrid.length > 0) {
                vm.isQuestionSelected = true;
                if (!vm.questionPapers)
                    getAllquestionPapers(true);
            } else {
                vm.isQuestionSelected = false;
            }
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
            if(!vm.question.answers){
                vm.question.answers = getNewAnswerSet();
            }
            if(!vm.question.childQuestions){
                vm.question.childQuestions = [{correctAnswer: '', question: '', isDeleted: 0, answers: getNewAnswerSet() }];
            }
            if (mode == 'edit') {
                $state.go('main.test.editQuestion');
            } else if (mode == 'insert') {
                $state.go('main.test.createQuestion');
            }
        }

        function addChildQuestion (){
            vm.question.childQuestions.push({correctAnswer: '', question: '', isDeleted: 0, answers: getNewAnswerSet() });
        }

        function getNewAnswerSet(){
            var answers = [];
            for(var i = 0; i < 4; i++)
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

        function addToPaper(paperId) {
            if (paperId && selectedQuestionGrid && selectedQuestionGrid.length > 0) {
                var data = {
                    questionPaperId: paperId,
                    questionIds: selectedQuestionGrid
                };
                $http.post(CommonInfo.getAppUrl() + '/api/question/addToPaper', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Question added successfully');
                        resetQuestionSelection();
                    }
                }, function(response) {});
            }
        }

        function getTestUsers(test) {
            vm.currentTestUserPage = 1;
            $http.post(CommonInfo.getAppUrl() + '/api/test/users', { 'testId': test.id }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testUsers = response.data.testUsers;
                    vm.testUserCount = response.data.recordCount;
                    vm.lastTestUserPage = Math.ceil(vm.testUserCount/40);
                    $state.go('main.test.studentList');
                }
            }, function(response) {});
        }

        function getTestUserPagination(pageNo) {
            vm.currentTestUserPage = pageNo;
            $http.post(CommonInfo.getAppUrl() + '/api/test/users', { 'testId': test.id, 'page': pageNo, 'perPage': 40 }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testUsers = response.data.testUsers;
                    vm.testUserCount = response.data.recordCount;
                    vm.lastTestUserPage = Math.ceil(vm.testUserCount/40);
                }
            }, function(response) {});
        }

        function showTestPreview(test) {
            test.isPreview = true
            CommonInfo.setInfo('exam', test);
            $window.open($state.href('main.exam', { isPreview: true }), '_blank');
        }

        function importQuestion(file) {
            if (vm.question.file) {
                Upload.upload({
                    url: CommonInfo.getAppUrl() + '/api/question/import',
                    data: {
                        file: vm.question.file,
                    }
                }).then(function(resp) {
                    console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }

        function resetQuestionSelection() {
            _.forEach(vm.questions, function(value) {
                value.isSelected = false;
            });
            questionSelection();
        }
    }
})();

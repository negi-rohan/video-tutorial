(function() {
    'use strict';

    angular
        .module('web')
        .controller('TestController', TestController);

    /** @ngInject */
    function TestController($http, CommonInfo, $state, growl, $uibModal, Upload, _, $window) {
        var vm = this;
        var selectedQuestionGrid = [];
        var selectedTestGrid = [];
        var inProcess = false;

        vm.userInfo;
        vm.objMode;
        vm.selectedTab = 1;
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

        vm.getAllTestSeries = getAllTestSeries;
        vm.getTestSeriesById = getTestSeriesById;
        vm.editTestSeries = editTestSeries;
        vm.addTestSeries = addTestSeries;
        vm.updateTestSeries = updateTestSeries;
        vm.publishTestSeries = publishTestSeries;
        vm.getTestSeriesUsers = getTestSeriesUsers;
        vm.getSeriesTests = getSeriesTests
        vm.getAllTests = getAllTests;
        vm.getTestById = getTestById;
        vm.editTest = editTest;
        vm.updateTest = updateTest
        vm.deleteTest = deleteTest;
        vm.evaluation = evaluation;
        vm.evaluationAll = evaluationAll;
        vm.offlineScore = offlineScore;
        vm.removeAllOfflineSores = removeAllOfflineSores;
        vm.difficultyMetrix = difficultyMetrix;
        vm.recheck = recheck;
        vm.getAllquestionPapers = getAllquestionPapers;
        vm.editQuestionPaper = editQuestionPaper;
        vm.addSubject = addSubject;
        vm.deleteQuestionPaper = deleteQuestionPaper;
        vm.showQuestions = showQuestions;
        vm.getAllQuestions = getAllQuestions;
        vm.questionSelection = questionSelection;
        vm.getQuestionById = getQuestionById;
        vm.editQuestion = editQuestion;
        vm.addChildQuestion = addChildQuestion;
        vm.updateQuestion = updateQuestion;
        vm.deleteQuestion = deleteQuestion;
        vm.addToPaper = addToPaper;
        vm.importQuestion = importQuestion;
        vm.importQuestionDoc = importQuestionDoc;
        vm.importExplanationDoc = importExplanationDoc;
        vm.getTestUsers = getTestUsers;
        vm.exportTestUsers = exportTestUsers;
        vm.getTestUserPagination = getTestUserPagination;
        vm.showTestPreview = showTestPreview;
        vm.testSelection = testSelection;
        vm.selectAllTest = selectAllTest;
        vm.testSelection = testSelection;
        vm.addToTestSeries = addToTestSeries;
        vm.tabChange = tabChange;

        activate();

        function activate() {
            vm.userInfo = CommonInfo.getInfo('user');
            getAllTests();
            getAllSubjects();
        }

        //////// Test related ///////////////////////////////////////////////////////////
        function getAllTests() {
            //resetQuestionSelection();
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
                vm.test.attachment = vm.test.attachment ? vm.test.attachment.split(',') : [];
            } else if (mode == 'insert') {
                vm.test = {
                    attachment: []
                };
                $state.go('main.test.createTest');
            }
        }

        function updateTest() {
            if (vm.test) {
                var test = angular.copy(vm.test);
                test.attachment = test.attachment.join(',');
                $http.post(CommonInfo.getAppUrl() + '/api/test', test).then(function(response) {
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
                }
            }, function(response) {});
        }

        function offlineScore(file, testId) {
            console.log(vm.tests.offLineScoreFile)
            if (vm.tests.offLineScoreFile) {
                Upload.upload({
                    url: CommonInfo.getAppUrl() + '/api/test/importOfflineScores',
                    data: {
                        file: vm.tests.offLineScoreFile,
                        testId: testId
                    }
                }).then(function(resp) {
                    // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    if (resp && resp.data && resp.data.result && resp.data.result.users && resp.data.result.users.length > 0) {
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/test/addOfflineScores.html',
                            size: 'lg',
                            controller: function($scope, item) {
                                $scope.users = item.users;
                                $scope.testId = item.testId;
                                $scope.ok = function() {
                                    var data = {
                                        users: $scope.users,
                                        testId: $scope.testId
                                    };
                                    $http.post(CommonInfo.getAppUrl() + '/api/test/addOfflineScores', data).then(function(response) {
                                        if (response && response.data && !response.data.Error) {
                                            growl.success('Scores added successfully');
                                            getAllTests();
                                        }
                                    }, function(response) {});
                                };
                            },
                            resolve: {
                                item: function() {
                                    return resp.data.result;
                                }
                            }
                        });
                    }
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }

        function removeAllOfflineSores(testId) {
            $http.post(CommonInfo.getAppUrl() + '/api/test/deleteOfflineScores', { 'testId': testId }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    growl.success('Offline scores removed successfully');
                    getAllTests();
                }
            }, function(response) {});
        }

        function difficultyMetrix() {
            $http.post(CommonInfo.getAppUrl() + '/api/question/difficulty', {}).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    growl.success('Question evaluation successfully');
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

        /////////// Test series related //////////////////////////////////////////////////////////

        function getAllTestSeries() {
            //resetQuestionSelection();
            $http.get(CommonInfo.getAppUrl() + '/api/testSeries/all').then(function(response) {
                if (response && response.data) {
                    vm.testSeries = response.data.testSeries;
                }
            }, function(response) {});
        }

        function getTestSeriesById(testSeriesId) {
            if (testSeriesId) {
                $http.post(CommonInfo.getAppUrl() + '/api/testSeries/byId', { 'testSeriesId': testSeriesId }).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        vm.testSeries = response.data.testSeries;
                        editTestSeries('edit', vm.testSeries);
                    }
                }, function(response) {});
            }
        }

        function editTestSeries(mode, testSeries) {
            vm.objMode = mode;
            vm.testSeries = testSeries || {};
            //getAllquestionPapers();
            if (mode == 'edit') {
                $state.go('main.test.editTestSeries');
            } else if (mode == 'insert') {
                $state.go('main.test.createTestSeries');
            }
        }

        function addTestSeries() {
            if (vm.testSeries) {
                vm.testSeries.createdBy = vm.userInfo.id;
                $http.post(CommonInfo.getAppUrl() + '/api/testSeries', vm.testSeries).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Test series added successfully');
                        $state.go('main.test.home');
                    }
                }, function(response) {});
            }
        }

        function updateTestSeries() {
            if (vm.testSeries) {
                vm.testSeries.modifiedBy = vm.userInfo.id;
                $http.post(CommonInfo.getAppUrl() + '/api/testSeries/update', vm.testSeries).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Test series updates successfully');
                        $state.go('main.test.home');
                    }
                }, function(response) {});
            }
        }

        function publishTestSeries(testSeries) {
            if (testSeries) {
                var status = testSeries.isPublished ? "unpublished" : "publish"
                if (testSeries && confirm('Are you sure you want to ' + status + ' ' + testSeries.name)) {
                    testSeries.isPublished = !testSeries.isPublished;
                    testSeries.modifiedBy = vm.userInfo.id;
                    $http.post(CommonInfo.getAppUrl() + '/api/testSeries/update', testSeries).then(function(response) {
                        if (response && response.data && !response.data.Error) {
                            growl.success('Test series ' + status + ' successfully');
                        }
                    }, function(response) {});
                }
            }
        }

        function getTestSeriesUsers(testSeries) {
            CommonInfo.setInfo('series', testSeries);
            $state.go('main.test.testSeriesStudent');
        }

        function getSeriesTests(testSeries) {
            CommonInfo.setInfo('series', testSeries);
            $state.go('main.test.testSeriesTest');
        }

        ////////// Question Paper related ////////////////////////////////////////////////////////
        function getAllquestionPapers(holdSelection) {
            // if (!holdSelection)
            //     resetQuestionSelection();
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

        function showQuestions(questionPaper) {
            if (questionPaper) {
                CommonInfo.setInfo('selectedQuestionPaper', questionPaper);
                $state.go('main.test.questionList');
            }
        }

        //////////Question related ////////////////////////////////////////////////////
        function getAllQuestions(pageNo) {
            vm.currentPage = pageNo;
            $http.post(CommonInfo.getAppUrl() + '/api/question/all', { page: pageNo, perPage: 40 }).then(function(response) {
                if (response && response.data) {
                    vm.questions = response.data.questions;
                    vm.questionCount = response.data.recordCount;
                    vm.lastPage = Math.ceil(vm.questionCount / 40) || 1;
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

        function addToPaper(paperId) {
            if (paperId && selectedQuestionGrid && selectedQuestionGrid.length > 0) {
                var data = {
                    questionPaperId: paperId,
                    questionIds: selectedQuestionGrid
                };
                $http.post(CommonInfo.getAppUrl() + '/api/question/addToPaper', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Question added successfully');
                        clearQuestionSelection();
                    }
                }, function(response) {});
            }
        }

        function exportTestUsers(test) {
            // $http.post(CommonInfo.getAppUrl() + '/api/test/usersExport', { 'testId': test.id }).then(function (response) {
            //     var blob = new Blob([response.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            //     var objectUrl = URL.createObjectURL(blob);
            //     window.open(objectUrl);
            // }, function(response) {});
            $http.post(CommonInfo.getAppUrl() + '/api/test/usersExport', { 'testId': test.id }).then(function(response) {
                if (response && response.data && response.data.url) {
                    console.log(response.data.url)
                    $window.open(response.data.url.toString());
                }
            }, function(response) {});
        }

        function getTestUsers(test) {
            CommonInfo.setInfo('testResultList', test);
            $state.go('main.test.studentList');
            // vm.currentTestUserPage = 1;
            // vm.selectedTest = test;
            // $http.post(CommonInfo.getAppUrl() + '/api/test/users', { 'testId': test.id }).then(function(response) {
            //     if (response && response.data && !response.data.Error) {
            //         vm.testUsers = response.data.testUsers;
            //         vm.testUserCount = response.data.recordCount;
            //         vm.lastTestUserPage = Math.ceil(vm.testUserCount / 40) || 1;
            //         $state.go('main.test.studentList');
            //     }
            // }, function(response) {});
        }

        function getTestUserPagination(test, pageNo) {
            vm.currentTestUserPage = pageNo;
            $http.post(CommonInfo.getAppUrl() + '/api/test/users', { 'testId': test.id, 'page': pageNo, 'perPage': 40 }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testUsers = response.data.testUsers;
                    vm.testUserCount = response.data.recordCount;
                    vm.lastTestUserPage = Math.ceil(vm.testUserCount / 40);
                }
            }, function(response) {});
        }

        function showTestPreview(test) {
            test.isPreview = true
            CommonInfo.setInfo('exam', test);
            $window.open($state.href('main.exam', { isPreview: true }), '_blank');
        }

        function importQuestion(file, quesPaperId) {
            console.log(vm.question.file)
            if (vm.question.file) {
                Upload.upload({
                    url: CommonInfo.getAppUrl() + '/api/question/import',
                    data: {
                        file: vm.question.file,
                        questionPaperId: quesPaperId
                    }
                }).then(function(resp) {
                    // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                    if (resp && resp.data && resp.data.result && resp.data.result.questions && resp.data.result.questions.length > 0) {
                        var item = {
                            subjects: vm.subjectList,
                            data: resp.data.result
                        };
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/test/importQuestion.html',
                            size: 'lg',
                            controller: function($scope, item) {
                                $scope.questions = item.data.questions;
                                $scope.questionPaperId = item.data.questionPaperId;
                                $scope.subjects = item.subjects;
                                $scope.toolBar = [
                                    ['h1', 'h2', 'h3', 'bold', 'italics', 'underline'],
                                    ['ol', 'ul'],
                                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                                    ['html', 'insertImage', 'insertLink', 'insertVideo']
                                ];
                                $scope.ok = function() {
                                    var data = {
                                        questions: $scope.questions,
                                        questionPaperId: $scope.questionPaperId
                                    };
                                    $http.post(CommonInfo.getAppUrl() + '/api/question/add', data).then(function(response) {
                                        if (response && response.data && !response.data.Error) {
                                            growl.success('Questions added successfully');
                                            getAllquestionPapers();
                                        }
                                    }, function(response) {});
                                };
                            },
                            resolve: {
                                item: function() {
                                    return item;
                                }
                            }
                        });
                    }
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }

        function importQuestionDoc(file, quesPaperId) {
            console.log(vm.question.file)
            if (vm.question.file) {
                Upload.upload({
                    url: CommonInfo.getAppUrl() + '/api/question/importDoc',
                    data: {
                        file: vm.question.file,
                        questionPaperId: quesPaperId
                    }
                }).then(function(resp) {
                    if (resp && resp.data && resp.data.result && resp.data.result.questions && resp.data.result.questions.length > 0) {
                        var item = {
                            subjects: vm.subjectList,
                            data: resp.data.result
                        };
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/test/importQuestion.html',
                            size: 'lg',
                            controller: function($scope, item) {
                                $scope.questions = item.data.questions;
                                $scope.questionPaperId = item.data.questionPaperId;
                                $scope.subjects = item.subjects;
                                $scope.toolBar = [
                                    ['h1', 'h2', 'h3', 'bold', 'italics', 'underline'],
                                    ['ol', 'ul'],
                                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                                    ['html', 'insertImage', 'insertLink', 'insertVideo']
                                ];
                                $scope.ok = function() {
                                    var data = {
                                        questions: $scope.questions,
                                        questionPaperId: $scope.questionPaperId
                                    };
                                    $http.post(CommonInfo.getAppUrl() + '/api/question/add', data).then(function(response) {
                                        if (response && response.data && !response.data.Error) {
                                            growl.success('Questions added successfully');
                                            getAllquestionPapers();
                                        }
                                    }, function(response) {});
                                };
                            },
                            resolve: {
                                item: function() {
                                    return item;
                                }
                            }
                        });
                    }
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }

        function importExplanationDoc(file, quesPaperId) {
            console.log(vm.question.explanationFile)
            if (vm.question.explanationFile) {
                Upload.upload({
                    url: CommonInfo.getAppUrl() + '/api/question/importExplationsDoc',
                    data: {
                        file: vm.question.explanationFile,
                        questionPaperId: quesPaperId
                    }
                }).then(function(resp) {
                    if (resp && resp.data && resp.data.result && resp.data.result.questions && resp.data.result.questions.length > 0) {
                        var item = {
                            subjects: vm.subjectList,
                            data: resp.data.result
                        };
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/test/importQuestion.html',
                            size: 'lg',
                            controller: function($scope, item) {
                                $scope.questions = item.data.questions;
                                $scope.questionPaperId = item.data.questionPaperId;
                                $scope.subjects = item.subjects;
                                $scope.toolBar = [
                                    ['h1', 'h2', 'h3', 'bold', 'italics', 'underline'],
                                    ['ol', 'ul'],
                                    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                                    ['html', 'insertImage', 'insertLink', 'insertVideo']
                                ];
                                $scope.ok = function() {
                                    var data = {
                                        questions: $scope.questions,
                                        questionPaperId: $scope.questionPaperId
                                    };
                                    $http.post(CommonInfo.getAppUrl() + '/api/question/add', data).then(function(response) {
                                        if (response && response.data && !response.data.Error) {
                                            growl.success('Questions added successfully');
                                            getAllquestionPapers();
                                        }
                                    }, function(response) {});
                                };
                            },
                            resolve: {
                                item: function() {
                                    return item;
                                }
                            }
                        });
                    }
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                }, function(evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            }
        }

        function clearQuestionSelection() {
            _.forEach(vm.questions, function(value) {
                value.isSelected = false;
            });
            questionSelection();
        }

        function testSelection() {
            selectedTestGrid = _.map(_.filter(vm.tests, { 'isSelected': true }), 'id');
            if (selectedTestGrid && selectedTestGrid.length > 0) {
                vm.isTestSelected = true;
                if (!vm.testSeriesList)
                    getAllTestSeriesName();
            } else {
                vm.isTestSelected = false;
            }
        }

        function getAllTestSeriesName() {
            $http.get(CommonInfo.getAppUrl() + '/api/testSeries/nameList').then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testSeriesList = response.data.testSeries;
                }
            }, function(response) {});
        }

        function selectAllTest() {
            if (vm.tests && vm.tests.length > 0) {
                _.forEach(vm.tests, function(value) {
                    value.isSelected = vm.isAllTestSelected;
                });
                testSelection();
            }
        }

        function clearTestSelection() {
            _.forEach(vm.tests, function(value) {
                value.isSelected = false;
            });
            vm.isAllTestSelected = false;
            testSelection();
        }

        function tabChange(tab) {
            vm.selectedTab = tab;
            clearTestSelection();
            clearQuestionSelection();
        }

        function addToTestSeries(testSeries) {
            if (selectedTestGrid && selectedTestGrid.length > 0) {
                var data = {
                    testSeries: testSeries,
                    tests: _.filter(vm.tests, { 'isSelected': true })
                };
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/test/addTestToSeries.html',
                    size: 'lg',
                    controller: function($scope, item) {
                        $scope.data = item;
                        $scope.ok = function() {
                            var values = {
                                testSeriesId: data.testSeries.id,
                                tests: []
                            };
                            _.forEach(data.tests, function(value) {
                                values.tests.push({
                                    id: value.id,
                                    startDate: value.startDate ? moment(value.startDate).format('YYYY-MM-DD HH:mm:SS') : null, //moment(value.startDate).format('YYYY-MM-DD HH:mm:SS')
                                    endDate: value.endDate ? moment(value.endDate).format('YYYY-MM-DD HH:mm:SS') : null,
                                    resultDate: value.resultDate ? moment(value.resultDate).format('YYYY-MM-DD HH:mm:SS') : null
                                });
                            });
                            $http.post(CommonInfo.getAppUrl() + '/api/testSeries/addTest', values).then(function(response) {
                                if (response && response.data && !response.data.Error) {
                                    growl.success(response.data.Message);
                                }
                            }, function(response) {});
                        }
                    },
                    resolve: {
                        item: function() {
                            return data;
                        }
                    }
                });


                // $http.post(CommonInfo.getAppUrl() + '/api/testSeries/addTest', data).then(function(response) {
                //     if (response && response.data && !response.data.Error) {
                //         growl.success(response.data.Message);
                //     }
                // }, function(response) {});
            }
        }
    }
})();

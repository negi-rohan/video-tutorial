(function() {
    'use strict';

    angular
        .module('web')
        .controller('EditQPQuestion', EditQPQuestion);

    /** @ngInject */
    function EditQPQuestion($http, CommonInfo, $state, growl, $anchorScroll) {
        var vm = this;
        var perPage = 40;
        var test;

        vm.toolBar = [
            ['h1', 'h2', 'h3', 'bold', 'italics', 'underline'],
            ['ol', 'ul'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['html', 'insertImage', 'insertLink', 'insertVideo']
        ];
        vm.questionType = ['MCQ', "Passage"];
        vm.currentPage = 1;
        vm.keyCode = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];

        vm.objMode = 'edit';

        vm.addChildQuestion = addChildQuestion;
        vm.updateQuestion = updateQuestion;

        activate();

        function activate() {
            vm.question = CommonInfo.getInfo('editQPQuestion');
            getAllSubjects();
            $anchorScroll();
        }

        function getAllSubjects() {
            $http.get(CommonInfo.getAppUrl() + '/api/subject/all').then(function(response) {
                if (response && response.data) {
                    vm.subjectList = response.data.subjects;
                }
            }, function(response) {});
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
                        growl.success('Question updated successfully');
                        $state.go('main.test.questionList');
                    }
                }, function(response) {});
            }
        }
    }
})();

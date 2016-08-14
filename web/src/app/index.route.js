(function() {
    'use strict';

    angular
        .module('web')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm'
            })
            .state('reset', {
                url: '/reset/:token',
                templateUrl: 'app/login/resetPassword.html',
                controller: 'ResetPasswordController',
                controllerAs: 'vm'
            })
            .state('main', {
                url: '/main',
                abstract: true,
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('main.profile', {
                url: '/profile',
                templateUrl: 'app/partical/profile.html'
            })
            .state('main.libary', {
                url: '/libary',
                templateUrl: 'app/partical/libary.html'
            })
            .state('main.myCourses', {
                url: '/myCourses',
                templateUrl: 'app/partical/myCourses.html'
            })
            .state('main.myLessons', {
                url: '/myLessons',
                templateUrl: 'app/partical/myLessons.html'
            })
            .state('main.createCourse', {
                url: '/addCourse',
                templateUrl: 'app/partical/createCourse.html'
            })
            .state('main.editCourse', {
                url: '/editCourse',
                templateUrl: 'app/partical/createCourse.html'
            })
            .state('main.courses', {
                url: '/courses',
                templateUrl: 'app/partical/courses.html'
            })
            .state('main.lessons', {
                url: '/lessons',
                templateUrl: 'app/partical/lessons.html'
            })
            .state('main.editLesson', {
                url: '/editLesson',
                templateUrl: 'app/partical/createLesson.html'
            })
            .state('main.createLesson', {
                url: '/addLesson',
                templateUrl: 'app/partical/createLesson.html'
            })
            .state('main.comments', {
                url: '/comments',
                templateUrl: 'app/partical/lessonComments.html'
            })
            .state('main.instructors', {
                url: '/instructors',
                templateUrl: 'app/partical/users.html'
            })
            .state('main.students', {
                url: '/students',
                templateUrl: 'app/partical/users.html'
            })
            .state('main.createUser', {
                url: '/addUser',
                templateUrl: 'app/partical/profile.html'
            })
            .state('main.editUser', {
                url: '/editUser',
                templateUrl: 'app/partical/profile.html'
            })
            .state('main.test', {
                url: '/test',
                abstract: true,
                templateUrl: 'app/test/testHome.html',
                controller: 'TestController',
                controllerAs: 'vm'
            })
            .state('main.test.home', {
                url: '/list',
                templateUrl: 'app/test/test.html'
            })
            .state('main.test.createTest', {
                url: '/addTest',
                templateUrl: 'app/test/editTest.html'
            })
            .state('main.test.editTest', {
                url: '/editTest',
                templateUrl: 'app/test/editTest.html'
            })
            .state('main.test.createQuestion', {
                url: '/addQuestion',
                templateUrl: 'app/test/editQuestion.html'
            })
            .state('main.test.editQuestion', {
                url: '/editQuestion',
                templateUrl: 'app/test/editQuestion.html'
            })
            .state('main.test.studentList', {
                url: '/studentList',
                templateUrl: 'app/test/testUsers.html',
                controller: 'StudentListController',
                controllerAs: 'vm'
            })
            .state('main.test.questionList', {
                url: '/questionList',
                templateUrl: 'app/test/questionList.html',
                controller: 'QuestionListController',
                controllerAs: 'vm'
            })
            .state('main.examsList', {
                url: '/examsList',
                templateUrl: 'app/test/examsList.html',
                controller: 'ExamListController',
                controllerAs: 'vm'
            })
            .state('main.exam', {
                url: '/exam',
                templateUrl: 'app/test/exam.html',
                controller: 'ExamController',
                controllerAs: 'vm'
            })
            .state('main.examAnswers', {
                url: '/examAnswers',
                templateUrl: 'app/test/testAnswers.html',
                controller: 'TestAnswersController',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise('/');
    }

})();

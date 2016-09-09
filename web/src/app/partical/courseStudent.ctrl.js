(function() {
    'use strict';

    angular
        .module('web')
        .controller('CourseStudentController', CourseStudentController);

    /** @ngInject */
    function CourseStudentController($http, CommonInfo, $state, growl) {
        var vm = this;
        var perPage = 40;
        var course;

        vm.currentCourseUserPage = 1;
        vm.sarchText = '';
        vm.courseUsers = [];
        vm.courseUserCount = 0;
        vm.lastCoursUserPage = 0;

        vm.searchStudent = searchStudent;
        vm.getCourseUsers = getCourseUsers;

        activate();

        function activate() {
            course = CommonInfo.getInfo('CourseUser');
            if (course && course.id) {
                getCourseUsers(1);
            }
        }

        function getCourseUsers(pageNo) {
            $http.post(CommonInfo.getAppUrl() + '/api/course/userList', { 'courseId': course.id, 'searchText': vm.searchText, 'page': pageNo }).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.courseUsers = response.data.courseUsers;
                    vm.courseUserCount = response.data.recordCount;
                    vm.lastCoursUserPage = Math.ceil(vm.courseUserCount / perPage) || 1;
                    vm.currentCourseUserPage = pageNo;
                }
            }, function(response) {});
        }

        function searchStudent() {
            getCourseUsers(1);
        }
    }
})();

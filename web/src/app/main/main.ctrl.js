(function() {
    'use strict';

    angular
        .module('web')
        .controller('MainController', MainController);
        //.filter('truncate', truncate);

    /** @ngInject */
    // function truncate(_) {
    //     return function(text) {
    //         if(text)
    //             return _.trunc(text, { 'length': 213, 'separator': ' ' });
    //         else
    //             return "";
    //     }
    // }

    /** @ngInject */
    function MainController($http, CommonInfo, Upload, $state, credentials, $uibModal, _, growl, $scope) {
        var vm = this;

        vm.userInfo; // hold user info[both]
        vm.isCollapsed = true; // for the drop down main menu[both]
        vm.lesson = {}; // current lesson on (my, edit, add) lesson page[both]
        vm.config = {}; // user configuration for showing tabs[both]
        vm.courses = []; // list of (Library, my, all) courses[both]
        vm.units = []; // list of units, lessons to show on my lessons page[student]
        //for admin side only
        vm.categoryPopup = false;
        vm.categories = []; // list of categories in create/edit course page
        vm.lessons = []; // list of all lessons in admin role
        vm.lessonComments = []; //list of comments by lesson id
        vm.users = []; // list of (instructor, student) users in admin role
        vm.user = {};
        vm.course = { // object used while (create/edit) course
            units: [],
            instructors: []
        };
        vm.objMode; // hold the current mode for entity(edit/insert)
        vm.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        vm.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        vm.format = 'dd-MMMM-yyyy';
        vm.toolBar = [
            ['h1', 'h2', 'h3', 'bold', 'italics', 'underline'],
            ['ol', 'ul'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
            ['html', 'insertImage', 'insertLink', 'insertVideo']
        ];
        vm.isUserSelected = false;
        vm.selectedUserGrid = [];
        vm.newCategory = {};

        vm.courseLibary = courseLibary;
        vm.subscribeCourse = subscribeCourse;
        vm.getMyCourses = getMyCourses;
        vm.selectCourse = selectCourse;
        vm.searchCourse = searchCourse;
        vm.selectLesson = selectLesson;
        vm.commentOnLesson = commentOnLesson;
        vm.updateProfile = updateProfile;
        vm.showCourseDemo = showCourseDemo;
        vm.showCourseInfo = showCourseInfo;
        vm.downloadFile = downloadFile;
        vm.signout = signout;
        //for admin side
        vm.getAllCourses = getAllCourses;
        vm.addCategory = addCategory;
        vm.getCourseById = getCourseById;
        vm.editCourse = editCourse;
        vm.addUnitToCourse = addUnitToCourse;
        vm.addUserToCourse = addUserToCourse;
        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;
        vm.publishCourse = publishCourse;
        vm.showCourseStudent = showCourseStudent;
        vm.getAllLessons = getAllLessons;
        vm.getLessonById = getLessonById;
        vm.editLesson = editLesson;
        vm.changeCourse = changeCourse;
        vm.addFilesToLesson = addFilesToLesson;
        vm.updateLesson = updateLesson;
        vm.deleteLesson = deleteLesson;
        vm.getLessonComments = getLessonComments;
        vm.getUsers = getUsers;
        vm.showUserSeries = showUserSeries;
        vm.userSelection = userSelection;
        vm.selectedAllStudents = selectedAllStudents;
        vm.addStudentToCourse = addStudentToCourse;
        vm.addStudentToTestSeries = addStudentToTestSeries;
        vm.approveUser = approveUser;
        vm.getUserById = getUserById;
        vm.editUser = editUser;
        vm.getAllBatches = getAllBatches;
        vm.editBatch = editBatch;
        vm.addBatch = addBatch;


        activate();

        function activate() {

            vm.config = credentials.getCredentials();
            vm.userInfo = CommonInfo.getInfo('user');
            if (vm.userInfo && vm.userInfo.profileType == 'student') {
                if ($state.is('main.libary')) {
                    courseLibary();
                } else if ($state.is('main.myCourses')) {
                    getMyCourses();
                } else if ($state.is('main.myLessons')) {
                    var course = CommonInfo.getInfo('course');
                    getUnits(course.id);
                } else if ($state.is('main.profile')) {
                    var user = angular.copy(vm.userInfo);
                    if (user && user.id)
                        editUser('update', user);
                }
            } else if (vm.userInfo && vm.userInfo.profileType == 'admin') {
                if ($state.is('main.courses')) {
                    getAllCourses();
                    showCategoryModal();
                } else if ($state.is('main.lessons')) {
                    getAllLessons();
                } else if ($state.is('main.instructors')) {
                    vm.userType = 'instructor';
                    getUsers('instructor');
                } else if ($state.is('main.students')) {
                    vm.userType = 'student';
                    getUsers('student');
                } else if ($state.is('main.createCourse')) {
                    editCourse('insert');
                } else if ($state.is('main.editCourse')) {
                    var course = CommonInfo.getInfo('course');
                    if (course && course.id)
                        editCourse('edit', course);
                } else if ($state.is('main.createLesson')) {
                    editLesson('insert');
                } else if ($state.is('main.editLesson')) {
                    var lesson = CommonInfo.getInfo('lesson');
                    if (lesson && lesson.id)
                        editLesson('edit', lesson);
                } else if ($state.is('main.createUser')) {
                    editUser('insert');
                } else if ($state.is('main.editUser')) {
                    var user = CommonInfo.getInfo('editUser');
                    if (user && user.id)
                        editUser('edit', user);
                } else if ($state.is('main.profile')) {
                    var user = angular.copy(vm.userInfo);
                    if (user && user.id)
                        editUser('update', user);
                } else if ($state.is('main.comments')) {
                    var lesson = CommonInfo.getInfo('lesson');
                    if (lesson && lesson.id)
                        showLessonComments(lesson.id);
                }
            } else {
                $state.go('login');
            }
        }

        function courseLibary() {
            var data = { userId: vm.userInfo.id };
            $http.post(CommonInfo.getAppUrl() + '/api/course/courseLibary', data).then(function(response) {
                if (response && response.data) {
                    vm.courses = response.data.courses;
                }
            }, function(response) {});
        }

        function getAllCourses() {
            $http.get(CommonInfo.getAppUrl() + '/api/course/all').then(function(response) {
                if (response && response.data) {
                    vm.courses = response.data.courses;
                }
            }, function(response) {});
        }

        function searchCourse() {
            if (vm.searchText) {
                var data = {
                    name: vm.searchText
                }
                $http.post(CommonInfo.getAppUrl() + '/api/course/search', data).then(function(response) {
                    if (response && response.data) {
                        $state.go('main.libary');
                        vm.courses = response.data.courses;
                    }
                }, function(response) {});
            }
        }

        function subscribeCourse(course) {
            if (course) {
                var data = {
                    phone: vm.userInfo.phone,
                    fullName: vm.userInfo.fullName,
                    email: vm.userInfo.email,
                    purpose: 'Payment stud: ' + vm.userInfo.id + 'cour: ' + course.id,
                    amt: course.subscriptionFee,
                    userId: vm.userInfo.id,
                    courseId: course.id
                };
                $http.post(CommonInfo.getAppUrl() + '/api/course/subscribe', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        if (response.data.url) {
                            window.open(response.data.url + '?embed=form');
                        } else if (response.data.code) {
                            growl.success('Course subscribed successfully');
                        }
                    }
                }, function(response) {});
            }
        }

        function getMyCourses() {
            var data = {
                userId: vm.userInfo.id
            };
            $http.post(CommonInfo.getAppUrl() + '/api/course/subscribed', data).then(function(response) {
                if (response && response.data) {
                    vm.courses = response.data.courses;
                }
            }, function(response) {});
        }

        function selectCourse(course) {
            if (course) {
                CommonInfo.setInfo('course', course);
                getUnits(course.id, true);
            }
        }

        function getUnits(courseId, navigateToPage) {
            if (courseId) {
                var data = {
                    courseId: courseId
                };
                $http.post(CommonInfo.getAppUrl() + '/api/unit/byCourse', data).then(function(response) {
                    if (response && response.data && response.data.units.length > 0) {
                        vm.units = response.data.units;
                        selectLesson(vm.units[0].lessons[0]);
                        if (navigateToPage)
                            $state.go('main.myLessons');
                    } else {
                        growl.info('No units present in this course');
                    }
                }, function(response) {

                });
            }
        }

        function selectLesson(lesson) {
            vm.lesson = lesson
            vm.lesson.comments = vm.lesson.comments || [];
            _.forEach(vm.lesson.files, function(value) {
                value.filePath = _.replace(value.filePath, '/public', '');
            });
            if (lesson.video && lesson.video != 'null') {
                vm.lesson.options = {
                    file: lesson.video,
                    image: lesson.poster,
                    type: 'hls',
                    androidhls: 'true',
                    width: '100%',
                    player: 'html5',
                    aspectratio: '16:9'
                }
            } else {
                vm.lesson.options = null;
            }
        }

        function getAllLessons() {
            $http.get(CommonInfo.getAppUrl() + '/api/lesson/all').then(function(response) {
                if (response && response.data) {
                    vm.lessons = response.data.lessons;
                }
            }, function(response) {});
        }

        function commentOnLesson() {
            var data = {
                lessonId: vm.lesson.id,
                comment: vm.commentMsg,
                userId: vm.userInfo.id
            };
            var newComment = {
                comments: vm.commentMsg,
                timestamp: 'Just now',
                commentedBy: {
                    profilePhoto: vm.userInfo.profilePhoto,
                    fullName: vm.userInfo.fullName
                }
            };
            if ($state.is('main.comments')) {
                vm.lessonComments.push(newComment);
            } else {
                vm.lesson.comments.push(newComment);
            }
            $http.post(CommonInfo.getAppUrl() + '/api/lesson/addComment', data).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    growl.success('Comment send');
                    vm.commentMsg = "";
                }
            }, function(response) {

            });
        }

        function getCourseById(courseId) {
            $http.post(CommonInfo.getAppUrl() + '/api/course/byId', { 'courseId': courseId }).then(function(response) {
                if (response && response.data && response.data.course) {
                    CommonInfo.setInfo('course', response.data.course);
                    editCourse('edit', response.data.course);
                }
            }, function(response) {});
        }

        function editCourse(mode, course) {
            $http.get(CommonInfo.getAppUrl() + '/api/category/all').then(function(response) {
                if (response && response.data && response.data.categories) {
                    vm.categories = response.data.categories;
                }
            }, function(response) {});
            $http.post(CommonInfo.getAppUrl() + '/api/user/name', { 'type': 'instructor' }).then(function(response) {
                if (response && response.data && response.data.users) {
                    vm.users = response.data.users;
                }
            }, function(response) {});
            vm.objMode = mode;
            if (mode == 'edit') {
                $state.go('main.editCourse');
                vm.course = course;
                vm.course.validTo = vm.course.validTo ? new Date(vm.course.validTo) : "";
            } else if (mode == 'insert') {
                vm.course = {
                    units: [],
                    instructors: [],
                    isForever: false,
                    isSendMail: false
                };
                $state.go('main.createCourse');
            }
        }

        function addUnitToCourse() {
            var values = _.compact(vm.course.courseUnit.split(','));
            _.forEach(values, function(value, key) {
                vm.course.units.push({ 'name': value });
            });
            vm.course.courseUnit = '';
        }

        function addUserToCourse() {
            var selectedInstructor = {
                fullName: vm.course.courseUser.fullName,
                userId: vm.course.courseUser.id
            };
            if (!_.find(vm.course.instructors, { 'userId': vm.course.courseUser.id }))
                vm.course.instructors.push(selectedInstructor);
            vm.course.courseUser = '';
        }

        function updateCourse(files) {
            Upload.upload({
                url: CommonInfo.getAppUrl() + '/api/course',
                data: { file: files, course: vm.course },
                method: 'POST'
            }).then(function(response) {
                response = response.data;
                if (response && !response.Error) {
                    growl.success('Course Updated successfully');
                    $state.go('main.courses');
                    getAllCourses();
                }
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            });
        }

        function deleteCourse(course) {
            if (course && confirm('Are you sure you want to delete ' + course.name)) {
                var data = {
                    course: course
                };
                data.course.isDeleted = true;
                $http.post(CommonInfo.getAppUrl() + '/api/course', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Course deleted successfully');
                    }
                }, function(response) {});
            }
        }

        function publishCourse(course) {
            if (course) {
                var status = course.isPublished ? "unpublished" : "publish"
                if (course && confirm('Are you sure you want to ' + status + ' ' + course.name)) {
                    var data = {
                        course: course
                    };
                    data.course.isPublished = !data.course.isPublished;
                    $http.post(CommonInfo.getAppUrl() + '/api/course', data).then(function(response) {
                        if (response && response.data && !response.data.Error) {
                            growl.success('Course ' + status + ' successfully');
                        }
                    }, function(response) {});
                }
            }
        }

        function showCourseStudent(course) {
            if (course && course.id) {
                CommonInfo.setInfo('CourseUser', course);
                $state.go('main.courseStudent');
            }
        }

        function getLessonById(lessonId) {
            $http.post(CommonInfo.getAppUrl() + '/api/lesson/byId', { 'lessonId': lessonId }).then(function(response) {
                if (response && response.data && response.data.lesson) {
                    CommonInfo.setInfo('lesson', response.data.lesson);
                    editLesson('edit', response.data.lesson);
                }
            }, function(response) {});
        }

        function editLesson(mode, lesson) {
            vm.objMode = mode;
            vm.lesson = lesson || { courses: [] };
            vm.lesson.newFiles = [];
            $http.get(CommonInfo.getAppUrl() + '/api/course/courseAndUnits').then(function(response) {
                if (response && response.data && response.data.courses) {
                    vm.courseUnitList = response.data.courses;
                    changeCourse();
                }
            }, function(response) {});

            if (mode == 'edit') {
                $state.go('main.editLesson');
            } else if (mode == 'insert') {
                $state.go('main.createLesson');
            }
        }

        function changeCourse() {
            if (vm.lesson && vm.lesson.courses && vm.lesson.courses.length > 0) {
                var course = _.find(vm.courseUnitList, { 'id': vm.lesson.courses[0].courseId });
                if (course) {
                    vm.lesson.unitList = course.units;
                    vm.lesson.courses[0].courseName = course.name;
                }
            }
        }

        function addFilesToLesson() {
            if (vm.lesson.file) {
                vm.lesson.newFiles = _.uniqBy(vm.lesson.newFiles.concat(vm.lesson.file), 'name');
            }
        }

        function updateLesson(files) {
            Upload.upload({
                url: CommonInfo.getAppUrl() + '/api/lesson',
                data: { file: files, lesson: vm.lesson },
                method: 'POST'
            }).then(function(response) {
                response = response.data;
                if (response && !response.Error) {
                    growl.success('Lesson Updated successfully');
                    $state.go('main.lessons');
                    getAllLessons();
                }
            }, function(resp) {
                console.log('Error status: ' + resp.status);
            });
        }

        function deleteLesson(lesson) {
            if (lesson && confirm('Are you sure you want to delete ' + lesson.name)) {
                var data = {
                    lesson: lesson
                };
                data.lesson.isDeleted = 'true'
                $http.post(CommonInfo.getAppUrl() + '/api/lesson', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Lesson deleted successfully');
                    }
                }, function(response) {});
            }
        }

        function getLessonComments(lesson) {
            CommonInfo.setInfo('lesson', lesson);
            showLessonComments(lesson.id);
        }

        function showLessonComments(lessonId) {
            if (lessonId) {
                vm.lesson.id = lessonId
                var data = {
                    lessonId: lessonId
                }
                $http.post(CommonInfo.getAppUrl() + '/api/lesson/allComment', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        vm.lessonComments = response.data.comments;
                        if (vm.lessonComments && vm.lessonComments.length > 0)
                            $state.go('main.comments');
                        else
                            growl.info('No comments found.')
                    }
                }, function(response) {});
            }
        }

        function getUsers(type, pageNo) {
            unSelectAll();
            vm.usersRecordCount = 0;
            vm.userType = type;
            var data = {
                type: type,
                searchText: vm.searchText
            };
            if (pageNo) {
                data.page = pageNo;
                data.perPage = 40;
                vm.usersCurrentPage = pageNo;
            } else {
                vm.usersCurrentPage = 1;
            }
            $http.post(CommonInfo.getAppUrl() + '/api/user/byType', data).then(function(response) {
                if (response && response.data && response.data.users) {
                    vm.users = response.data.users;
                    vm.usersRecordCount = response.data.recordCount;
                    vm.usersLastPage = Math.ceil(vm.usersRecordCount / 40) || 1;
                }
            }, function(response) {});
        }

        function userSelection() {
            vm.selectedUserGrid = _.map(_.filter(vm.users, { 'isSelected': true }), 'id');
            if (vm.selectedUserGrid && vm.selectedUserGrid.length > 0) {
                vm.isUserSelected = true;
                if (!vm.coursesNameList)
                    getCoursesName();
                if(!vm.testSeriesList)
                    getTestSeriesList();
            } else {
                vm.isUserSelected = false;
            }
        }

        function getCoursesName() {
            $http.post(CommonInfo.getAppUrl() + '/api/course/nameList', {}).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.coursesNameList = response.data.courses;
                }
            }, function(response) {});
        }

        function getTestSeriesList() {
            $http.get(CommonInfo.getAppUrl() + '/api/testSeries/nameList').then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.testSeriesList = response.data.testSeries;
                }
            }, function(response) {});
        }

        function selectedAllStudents() {
            if (vm.users && vm.users.length > 0) {
                _.forEach(vm.users, function(value) {
                    value.isSelected = vm.isAllUserSelected;
                });
                userSelection();
            }
        }

        function unSelectAll(){
            if (vm.users && vm.users.length > 0) {
                _.forEach(vm.users, function(value) {
                    value.isSelected = false;
                });
                userSelection();
            }
        }

        function addStudentToCourse(courseId) {
            if (vm.selectedUserGrid && vm.selectedUserGrid.length > 0 && courseId) {
                var data = {
                    courseId: courseId,
                    users: vm.selectedUserGrid
                };
                $http.post(CommonInfo.getAppUrl() + '/api/course/subscribeManual', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Student added to course successfully');
                    }
                }, function(response) {});
            }
        }

        function addStudentToTestSeries(testSeriesId) {
            if (vm.selectedUserGrid && vm.selectedUserGrid.length > 0 && testSeriesId) {
                var data = {
                    testSeriesId: testSeriesId,
                    users: vm.selectedUserGrid
                };
                $http.post(CommonInfo.getAppUrl() + '/api/testSeries/addUsers', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Student added to test series successfully');
                    } else if(response && response.data && response.data.Error){
                        growl.info(response.data.Message);
                    }
                }, function(response) {});
            }
        }

        function showUserSeries(user) {
            CommonInfo.setInfo('testUser', user);
            $state.go('main.test.studentSeriesList');
        }

        function approveUser(user) {
            var userInfo = angular.copy(user);
            userInfo.status = 'active';
            $http.put(CommonInfo.getAppUrl() + '/api/user', userInfo).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    user.status = 'active';
                }
            }, function(response) {});
        }

        function getUserById(userId) {
            $http.post(CommonInfo.getAppUrl() + '/api/user/byId', { userId: userId }).then(function(response) {
                if (response && response.data && response.data.user) {
                    CommonInfo.setInfo('editUser', response.data.user);
                    editUser('edit', response.data.user);
                }
            }, function(response) {});
        }

        function editUser(mode, user) {
            vm.user = angular.copy(user) || {};
            vm.objMode = mode;
            if (mode == 'edit') {
                $state.go('main.editUser');
            } else if (mode == 'insert') {
                $state.go('main.createUser');
            } else if (mode == 'update') {
                $state.go('main.profile');
            }
        }

        function updateProfile(files) {
            if (vm.user) {
                vm.user.profileType = vm.user.profileType || vm.userType;
                var sendMail = vm.objMode == 'insert' ? true : false;
                Upload.upload({
                    url: CommonInfo.getAppUrl() + '/api/user',
                    data: { file: files, user: vm.user, sendMail: sendMail },
                    method: 'PUT'
                }).then(function(response) {
                    response = response.data;
                    if (response && !response.Error) {
                        growl.success('Profile updated successfully');
                        if (vm.objMode == 'update') {
                            vm.userInfo = response.user;
                            CommonInfo.setInfo('user', vm.userInfo);
                        } else {
                            getUsers(vm.userType);
                            if (vm.userType == 'student')
                                $state.go('main.students');
                            else if (vm.userType == 'instructor')
                                $state.go('main.instructors');
                        }
                    }
                }, function(resp) {
                    console.log('Error status: ' + resp.status);
                });
            }
        }

        function deleteUser(user) {
            if (course && confirm('Are you sure you want to delete ' + user.name)) {
                var data = {
                    user: user
                };
                data.course.isDeleted = true;
                $http.post(CommonInfo.getAppUrl() + '/api/user', data).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Course deleted successfully');
                    }
                }, function(response) {});
            }
        }

        function getAllBatches() {
            $http.get(CommonInfo.getAppUrl() + '/api/batch/all').then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.batches = response.data.batches;
                }
            }, function(response) {});
        }

        function editBatch(mode, batch) {
            vm.batch = batch || {};
            vm.objMode = mode;
            if (mode == 'edit') {
                $state.go('main.editBatch');
            } else if (mode == 'insert') {
                $state.go('main.createBatch');
            }
        }

        function addBatch(){
            if(vm.batch){
                vm.batch.createdBy = vm.userInfo.id;
                $http.post(CommonInfo.getAppUrl() + '/api/batch', vm.batch).then(function(response) {
                    if (response && response.data && !response.data.Error) {
                        growl.success('Batch deleted successfully');
                    }
                }, function(response) {});
            }
        }

        function signout() {
            CommonInfo.reset();
            $state.go('login');
        }

        function showCourseDemo(course) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'app/partical/showDemo.html',
                size: 'lg',
                controller: function($scope, item) {
                    $scope.options = {
                        // sources: [{
                        //     file: item.demoVideo
                        // },
                        // {
                        //     file: 'https://youtu.be/OOFDxauOYrw'
                        // }],
                        file: item.demoVideo,
                        image: item.demoPoster,
                        type: 'hls',
                        androidhls: 'true',
                        width: '100%',
                        player: 'html5',
                        aspectratio: '16:9'
                    };
                },
                resolve: {
                    item: function() {
                        return course;
                    }
                }
            });
        }

        function showCourseInfo(courseId, courseName, courseDesc) {
            if (courseId) {
                var data = {
                    courseId: courseId
                };
                $http.post(CommonInfo.getAppUrl() + '/api/unit/byCourse', data).then(function(response) {
                    if (response && response.data && response.data.units && response.data.units.length > 0) {
                        var item = {
                            courseName: courseName,
                            courseDesc: courseDesc,
                            units: response.data.units
                        };
                        var modalInstance = $uibModal.open({
                            animation: true,
                            templateUrl: 'app/partical/showCourseInfo.html',
                            controller: function($scope, item) {
                                $scope.course = item;
                            },
                            resolve: {
                                item: function() {
                                    return item;
                                }
                            }
                        });
                    } else {
                        growl.info('No information for this course yet added');
                    }
                }, function(response) {

                });
            }
        }

        function downloadFile(filePath, fileName) {
            var data = {
                fileName: fileName,
                filePath: filePath,
                userId: vm.userInfo.id
            };
            $http.post(CommonInfo.getAppUrl() + '/api/util/downloadFile', data).then(function(response) {
                console.log(response);
            }, function(response) {});
        }

        function showCategoryModal() {
            vm.categories = [];
            $http.get(CommonInfo.getAppUrl() + '/api/category/all').then(function(response) {
                if (response && response.data.categories && response.data.categories.length > 0) {
                    vm.categories = response.data.categories;
                }
            });
        }

        function addCategory() {
            $http.post(CommonInfo.getAppUrl() + '/api/category', vm.newCategory).then(function(response) {
                if (response && response.data && !response.data.Error) {
                    vm.categories.push(vm.newCategory);
                    vm.categoryPopup = false;
                    vm.newCategory = {};
                    growl.success('Category added successfully');
                }
            }, function(response) {});
        }
    }
})();

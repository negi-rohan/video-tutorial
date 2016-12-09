(function() {
    'use strict';

    angular
        .module('web')
        .factory('CommonInfo', CommonInfo)
        .factory('credentials', credentials)
        .directive('jwplayerjs', jwplayerjs)
        .directive('whenScrollEnds', whenScrollEnds)
        .filter('htmlToPlaintext', htmlToPlaintext)
        .filter('charCodeToChar', charCodeToChar);

    /** @ngInject */
    function htmlToPlaintext() {
        return function(text) {
            return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        }
    }

    /** @ngInject */
    function charCodeToChar() {
        return function(code) {
            //console.log(typeof code);
            return String.fromCharCode(code);
        }
    }

    /** @ngInject */
    function jwplayerjs($compile) {
        return {
            restrict: 'EC',
            scope: {
                playerId: '@',
                setupVars: '=setup'

            },
            link: function(scope, element) {
                scope.$watch('setupVars', function() {
                    if (scope.setupVars) {
                        var id = scope.playerId || 'random_player_' + Math.floor((Math.random() * 999999999) + 1),
                            getTemplate = function(playerId) {
                                return '<div id="' + playerId + '"></div>';
                            };

                        element.html(getTemplate(id));
                        $compile(element.contents())(scope);
                        jwplayer(id).setup(scope.setupVars);
                    }
                });
            }
        };
    }

    /** @ngInject */
    function whenScrollEnds($window) {
        return {
            restrict: "A",
            link: function(scope, element, attrs) {
                var visibleHeight = $window.innerHeight;
                var threshold = 100;

                element.scroll(function() {
                    var scrollableHeight = element.prop('scrollHeight');
                    var hiddenContentHeight = scrollableHeight - visibleHeight;

                    if (hiddenContentHeight - element.scrollTop() <= threshold) {
                        // Scroll is almost at the bottom. Loading more rows
                        scope.$apply(attrs.whenScrollEnds);
                    }
                });
            }
        };
    }

    /** @ngInject */
    function CommonInfo($localStorage, $state) {
        return {
            getInfoObj: function() {
                return angular.copy($localStorage.infoObj);
            },
            getInfo: function(item) {
                if (!$localStorage.infoObj || !$localStorage.infoObj.user)
                    $state.go('home.account');
                else
                    return angular.copy($localStorage.infoObj[item]);
            },
            setInfo: function(item, value) {
                var obj = $localStorage.infoObj || {};
                obj[item] = angular.copy(value);
                $localStorage.infoObj = obj;
            },
            reset: function() {
                $localStorage.$reset();
            },
            getAppUrl: function() {
                return 'http://139.59.3.159';
            }
        };
    }

    /** @ngInject */
    function credentials(CommonInfo) {
        return {
            getCredentials: function() {
                if (CommonInfo.getInfo('user'))
                    var userType = CommonInfo.getInfo('user').profileType;
                var config = {};
                switch (userType) {
                    case 'admin':
                        config = {
                            tabs: {
                                library: false,
                                allCourses: true,
                                myCourses: false,
                                allLessons: true,
                                instructor: true,
                                students: true,
                                test: true,
                                exam: false
                            },
                            createCourse: true,
                            createLesson: true,
                            createTest: true,
                            createQuestionPaper: true,
                            createQuestion: true
                        };
                        break;
                    case 'student':
                        config = {
                            tabs: {
                                library: true,
                                allCourses: false,
                                myCourses: true,
                                allLessons: false,
                                instructor: false,
                                students: false,
                                test: false,
                                exam: true
                            },
                            createCourse: false,
                            createLesson: false,
                            createTest: false,
                            createQuestionPaper: false,
                            createQuestion: false
                        };
                        break;
                }
                return config;
            }
        };
    }
})();

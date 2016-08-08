(function() {
    'use strict';

    angular
        .module('web')
        .controller('LoginController', LoginController)
        .directive('loginArea', loginArea);


    //style = "background-image: url('assets/images/forumias-academy-image.jpg');background-repeat: no-repeat;background-size: cover;"
    /** @ngInject */
    function loginArea($window, resize) {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {

                resize(scope).call(function() {
                    elem.css('height', $window.innerHeight + 'px');
                });
            }
        };
    }


    /** @ngInject */
    function LoginController($http, $state, CommonInfo, growl, $location, $timeout) {
        var vm = this;
        var codeStr = "";
        var otpTimeout;

        vm.forget = {
            status: false,
            email: ''
        };
        vm.user = {
            userName: '',
            password: ''
        };
        vm.newUser = {
            fullName: '',
            email: '',
            password: '',
            phone: '',
        };
        vm.isOtp = true;
        vm.isOtpSend = false;
        vm.isOtpValid = false;
        vm.activeForm = 1;
        vm.showPage = false

        vm.login = login;
        vm.signup = signup;
        vm.forgetPassword = forgetPassword;
        vm.requestOtp = requestOtp;
        vm.validateOtp = validateOtp;
        vm.isLoginPage = true;

        activate();

        function activate() {
            var user = CommonInfo.getInfo('user');
            if (user) {
                if (user.profileType == 'student')
                    $state.go('main.examsList');
                else if (user.profileType == 'admin')
                    $state.go('main.courses');
            } else {
                vm.showPage = true;
            }
        }

        function login() {
            if (vm.user.userName && vm.user.password) {
                $http.post(CommonInfo.getAppUrl() + "/api/login", vm.user).then(
                    function(response) {
                        if (response && response.data && response.data.result && !response.data.Error) {
                            CommonInfo.setInfo('user', response.data.result);
                            var profileType = response.data.result.profileType;
                            if (profileType == 'student')
                                $state.go('main.examsList');
                            else if (profileType == 'admin')
                                $state.go('main.courses');
                        } else if (response && response.data && response.data.Error) {
                            growl.info(response.data.Message);
                        }
                    },
                    function(response) {
                        growl.info(response.data.Message);
                    }
                );
            }
        }

        function signup() {
            if (vm.newUser.email && vm.newUser.phone && vm.newUser.fullName) {
                vm.newUser.profileType = 'student';
                $http.post(CommonInfo.getAppUrl() + "/api/user", vm.newUser).then(
                    function(response) {
                        if (response && response.data && !response.data.Error) {
                            growl.success('Signup successfuly');
                            vm.user.userName = vm.newUser.phone;
                            vm.forget = {
                                status: false
                            };
                            vm.newUser = {};
                            vm.activeForm = 0;
                        } else if (response && response.data && response.data.Code) {
                            if (response.data.isEmail) {
                                growl.info('Sorry it looks like ' + vm.newUser.email + ' belongs to an existing account. Please login using this email address');
                                vm.user.userName = vm.newUser.email;
                            } else if (response.data.isPhone) {
                                growl.info('Sorry it looks like ' + vm.newUser.phone + ' belongs to an existing account. Please login using this phone number');
                                vm.user.userName = vm.newUser.phone;
                            }
                            vm.forget = {
                                status: false
                            };
                            vm.newUser = {};
                            vm.activeForm = 0;

                        } else if (response && response.data && response.data.Error) {
                            growl.info(response.data.Message);
                        }
                    },
                    function(response) {
                        growl.info('Unable to signup, try after some time');
                    }
                );
            }
        }

        function forgetPassword() {
            if ($location.absUrl()) {
                var url = $location.absUrl();
                url = url.substring(0, url.indexOf('#') + 2) + 'reset/';
                vm.forget.host = url;
                $http.post(CommonInfo.getAppUrl() + "/api/forget", vm.forget).then(
                    function(response) {
                        if (response && response.data && !response.data.Error) {
                            growl.success('Check your email for password reset link');
                        } else if (response && response.data && response.data.Error) {
                            growl.info(response.data.Message);
                        }
                    },
                    function(response) {
                        growl.info('Mail not send, try after some time');
                    }
                );
            }
        }

        function requestOtp() {
            vm.showResendOtp = false;
            vm.newUser.otp = "";
            if (vm.newUser.phone) {
                $http.post(CommonInfo.getAppUrl() + "/api/sendOtp", vm.newUser).then(
                    function(response) {
                        if (response && response.data.secret) {
                            codeStr = response.data.secret;
                            vm.isOtpSend = true;
                            otpTimeout = $timeout(function() { vm.showResendOtp = true; }, 15000);
                        } else if (response && response.data && response.data.Code) {
                            if (response.data.isPhone) {
                                growl.info('Sorry it looks like ' + vm.newUser.phone + ' belongs to an existing account. Please login using this phone number');
                                vm.user.userName = vm.newUser.phone;
                            }
                            vm.forget = {
                                status: false
                            };
                            vm.newUser = {};
                            vm.activeForm = 0;
                        } else {
                            growl.info('Some error occured, try after some time');
                        }
                    },
                    function(response) {
                        growl.info(response.data.Message);
                    }
                );
            }
        }

        function validateOtp() {
            if (vm.newUser.otp && codeStr) {
                $timeout.cancel(otpTimeout);
                var data = {
                    code: vm.newUser.otp,
                    secret: codeStr
                }
                $http.post(CommonInfo.getAppUrl() + "/api/validateOtp", data).then(
                    function(response) {
                        if (response && !response.data.Error) {
                            vm.isOtpValid = true;
                        } else {
                            growl.info('You have entered incorrect pin');
                        }
                    },
                    function(response) {
                        growl.info(response.data.Message);
                    }
                );
            }
        }
    }
})();

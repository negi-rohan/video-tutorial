var mysql = require("mysql");
var _ = require("lodash");
var nodemailer = require('nodemailer');
var async = require('async');
var crypto = require('crypto');
var moment = require('moment');
var config = require('./config');
var msg91 = require("msg91")(config.msgSms.authKey, config.msgSms.sender, "4");
var speakeasy = require('speakeasy');


var usersList = coursesList = lessonsList = unitsList = forgetList = [];

var self = {
    initdictionaries: function(pool) {
        self.getUsersList(pool);
        self.getUnitsList(pool);
        self.getLessonsList(pool);
    },
    getUsersList: function(pool) {
        var query = "SELECT * FROM ??";
        var queryValues = ["user"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                } else {
                    usersList = rows;
                    self.getCoursesList(pool);
                }
            });
        });
    },
    getCoursesList: function(pool) {
        var query = "SELECT c.*, ct.name as category FROM ?? c LEFT JOIN (categories ct) ON ct.id = c.categoryId WHERE c.isDeleted = false";
        var queryValues = ["courses"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                } else {
                    _.forEach(rows, function(value, key) {
                        value.instructors = [];
                    });
                    coursesList = rows;
                    self.getCourseInstructors(pool);
                }
            });
        });
    },
    getCourseInstructors: function(pool) {
        var query = "SELECT ui.* FROM ?? ui WHERE ui.isDeleted = false";
        var queryValues = ["courses_instructor"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (rows && rows.length > 0) {
                    _.forEach(rows, function(value, key) {
                        var course = _.find(coursesList, { 'id': value.courseId });
                        if (course) {
                            course.instructors = course.instructors || [];
                            var user = _.find(usersList, { 'id': value.userId });
                            if (user) {
                                value.fullName = user ? user.fullName : '';
                                course.instructors.push(value);
                            }
                        }
                    });
                }
            });
        });
    },
    getUnitsList: function(pool) {
        var query = "SELECT u.id, u.name FROM ?? u WHERE u.isDeleted = false";
        var queryValues = ["units"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                } else {
                    unitsList = rows;
                }
            });
        });
    },
    getLessonsList: function(pool) {
        var query = "SELECT * FROM ?? l WHERE l.isDeleted = false";
        var queryValues = ["lessons"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                } else {
                    lessonsList = [];
                    lessonsList = rows;
                    self.getLessonsComments(pool);
                    self.getLessonsFiles(pool);
                }
            });
        });
    },
    getLessonsComments: function(pool, id) {
        var query, queryValues;
        if (id) {
            query = "SELECT * FROM ?? where lessonId = ?";
            queryValues = ["lesson_comments", id];
        } else {
            query = "SELECT * FROM ??";
            queryValues = ["lesson_comments"];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (rows && rows.length > 0) {
                    _.forEach(rows, function(value, key) {
                        var lesson = _.find(lessonsList, { 'id': value.lessonId });
                        if (lesson) {
                            lesson.comments = lesson.comments || [];
                            var user = _.find(usersList, { 'id': value.userId });
                            value.commentedBy = {
                                profilePhoto: user.profilePhoto,
                                fullName: user.fullName
                            };
                            lesson.comments.push(value);
                        }
                    });
                }
            });
        });
    },
    getLessonsFiles: function(pool) {
        var query = "SELECT * FROM ??";
        var queryValues = ["lesson_files"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (rows && rows.length > 0) {
                    _.forEach(rows, function(value, key) {
                        var lesson = _.find(lessonsList, { 'id': value.lessonId });
                        if (lesson) {
                            lesson.files = lesson.files || [];
                            lesson.files.push(value);
                        }
                    });
                }
            });
        });
    },
    sendMailForNewLesson: function(request, pool) {
        if (request && request.courses && request.courses[0].courseId) {
            var course = _.find(coursesList, { 'id': parseInt(request.courses[0].courseId) });
            if (course && course.isSendMail) {
                var query = "SELECT u.email FROM user u WHERE u.profileType = 'student' AND u.id in (SELECT c.userId FROM course_subscription c WHERE c.courseId = ?)";
                var queryValues = [request.courses[0].courseId];
                query = mysql.format(query, queryValues);
                pool.getConnection(function(err, connection) {
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (rows && rows.length > 0) {
                            var mailList = _.map(rows, 'email');
                            var transporter = nodemailer.createTransport({
                                service: 'Gmail',
                                auth: {
                                    user: 'care@forumias.com', // Your email id
                                    pass: '123@academy' // Your password
                                }
                            });
                            var mailOptions = {
                                from: 'care@forumias.com', // sender address
                                bcc: mailList, // list of receivers
                                subject: 'Info: New lesson added', // Subject line
                                text: 'This mail is to inform you that new lesson: ' + request.name + ' has been added in course: ' + request.courses[0].courseName + ' \n'
                            };
                            transporter.sendMail(mailOptions, function(err, info) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("message sent");
                                };
                            });
                        }
                    });
                });
            }
        }

    },
    findUser: function(request, pool, callback) {
        request.email = request.email || null;
        request.phone = request.phone || null;
        var query = "SELECT id, email, phone FROM ?? WHERE ??=? or ??=?";
        var queryValues = ["user", "email", request.email, "phone", request.phone];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    var isEmail = _.find(rows, { 'email': request.email }) ? true : false;
                    var isPhone = _.find(rows, { 'phone': request.phone }) ? true : false;
                    callback({ "Error": false, "Message": "Email/Phone already in use", "Code": 1, "isEmail": isEmail, "isPhone": isPhone });
                } else {
                    callback({ "Error": false, "Message": "User Not Present", "Code": 0 });
                }
            });
        });
    },
    signup: function(request, pool, md5, callback) { /// for new user signup
        var query, queryValues;
        var data = {
            email: request.email,
            phone: request.phone
        };
        self.findUser(data, pool, function(result) {
            if (result && !result.Error && !result.Code) {
                query = "INSERT INTO ??(??,??, ??, ??, ??) VALUES (?,?, ?, ?, ?)";
                queryValues = ["user", "email", "phone", "password", "fullName", "profileType", request.email, request.phone, md5(request.password), request.fullName, request.profileType];
                query = mysql.format(query, queryValues);
                pool.getConnection(function(err, connection) {
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (err) {
                            callback({ "Error": true, "Message": err });
                        } else {
                            callback({ "Error": false, "Message": "User Added" });
                        }
                    });
                });
            } else if (result && !result.Error && result.Code) {
                result.Error = true
                callback(result);
            } else {
                callback({ "Error": true, "Message": "Error occured, Please try after some time" });
            }
        });
    },
    login: function(req, request, pool, jwt, md5, callback) { /// for login to app
        var loginIdField = /^\d+$/.test(request.userName) ? 'phone' : 'email';
        var query = "SELECT * FROM ?? WHERE ??=? && ??=?";
        var queryValues = ["user", loginIdField, request.userName, "password", md5(request.password)];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    var ip;
                    if (req.headers['x-forwarded-for']) {
                        ip = req.headers['x-forwarded-for'].split(",")[0];
                    } else if (req.connection && req.connection.remoteAddress) {
                        ip = req.connection.remoteAddress;
                    } else {
                        ip = req.ip;
                    }
                    console.log("client IP is *********************" + ip + ' : ' + rows[0].fullName + ': ' + new Date());
                    var token = jwt.sign(rows[0], request.secretString, {
                        expiresIn: "1d" // expires in 24 hours
                    });
                    rows = rows[0];
                    delete rows.password;
                    callback({ "Error": false, "Message": "Success", "token": token, "result": rows });
                } else {
                    callback({ "Error": true, "Message": "Email/Phone number or Password is incorrect" });
                }
            });
        });
    },
    forgetPassword: function(request, pool, callback) {
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                });
            },
            function(token, done) {
                var query = "SELECT id from ?? where email=?";
                var queryValues = ["user", request.email];
                query = mysql.format(query, queryValues);
                pool.getConnection(function(err, connection) {
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (rows && rows.length > 0) {
                            var user = rows[0];

                            user.token = token;
                            user.expires = moment().add(1, 'h'); // 1 hour
                            forgetList.push(user);
                            //user.save(function(err) {
                            done(err, token);
                            //});
                        } else if (rows && rows.length == 0) {
                            callback({ "Error": true, "Message": "No account with that email address exists" });
                        } else {
                            callback({ "Error": true, "Message": "Some error occured, Please try again after some time" });
                        }
                    });
                });
            },
            function(token, done) {
                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'care@forumias.com', // Your email id
                        pass: '123@academy' // Your password
                    }
                });
                var mailOptions = {
                    from: 'care@forumias.com', // sender address
                    to: request.email, // list of receivers
                    subject: 'Password reset link', // Subject line
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        request.host + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };
                transporter.sendMail(mailOptions, function(err, info) {
                    if (err) {
                        callback({ "Error": true, "Message": err });
                    } else {
                        callback({ "Error": false, "Message": "Success", "Info": info });
                    };
                });
            }
        ], function(err) {
            if (err)
                callback({ "Error": true, "Message": err });
        });
    },
    resetPassword: function(request, pool, md5, callback) {
        var user = _.find(forgetList, function(value) {
            return value.token == request.token && moment().isBefore(value.expires)
        });
        if (!user) {
            callback({ "Error": true, "Message": "Password reset token is invalid or has expired" });
        } else {
            var query = "UPDATE ?? SET password=? WHERE id=?";
            var queryValues = ["user", md5(request.password), user.id];
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (err) {
                        callback({ "Error": true, "Message": err });
                    } else {
                        callback({ "Error": false, "Message": "Success" });
                    }
                });
            });
        }
    },
    getProfile: function(request, pool, callback) { /// get user info by id
        var query = "SELECT * FROM user where id=?";
        var queryValues = [request.userId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": "Error executing MySQL query" });
                } else {
                    rows = rows[0];
                    delete rows.password;
                    callback({ "Error": false, "Message": "Success", "user": rows });
                }
            });
        });
    },
    getAllUsers: function(type, req, pool, callback) { /// get list all users
        var query, queryValues, from = 0,
            count = req.perPage || 40,
            userCount = 0;
        if (req.page) {
            from = (req.page - 1) * count;
        }
        if (req.searchText) {
            query = "SELECT count(*) as userCount from ?? where profileType = ? AND (fullName like ? OR email like ? OR phone like ?)";
            queryValues = ["user", req.type, '%' + req.searchText + '%', '%' + req.searchText + '%', '%' + req.searchText + '%'];
        } else {
            query = "SELECT count(*) as userCount from ?? where profileType = ?";
            queryValues = ["user", req.type];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": "Error executing MySQL query" });
                } else {
                    userCount = rows[0].userCount;
                    if (req.searchText) {
                        query = "SELECT u.*, IF(tss.id IS NULL, false, true) as isTSSubscribed from ?? u LEFT JOIN (testseries_subscription tss) ON tss.userId = u.id where profileType = ? AND (fullName like ? OR email like ? OR phone like ?) GROUP BY u.id LIMIT ?, ?";
                        queryValues = ["user", req.type, '%' + req.searchText + '%', '%' + req.searchText + '%', '%' + req.searchText + '%', from, count];
                    } else {
                        query = "SELECT u.*, IF(tss.id IS NULL, false, true) as isTSSubscribed from ?? u LEFT JOIN (testseries_subscription tss) ON tss.userId = u.id where profileType = ? GROUP BY u.id LIMIT ?, ?";
                        queryValues = ["user", req.type, from, count];
                    }
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (err) {
                            callback({ "Error": true, "Message": "Error executing MySQL query" });
                        } else {
                            callback({ "Error": false, "Message": "Success", "users": rows, "recordCount": userCount });
                        }
                    });
                }
            });
        });
    },
    getAllUsersName: function(type, value, pool, callback) { /// get list all users name and id
        if (type == "byType") {
            query = "SELECT id, fullName from ?? where profileType = ?";
            queryValues = ["user", value];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": "Error executing MySQL query" });
                } else {
                    callback({ "Error": false, "Message": "Success", "users": rows });
                }
            });
        });
    },
    updateUser: function(request, pool, md5, callback) { /// update user profile
        var query, queryValues;
        if (request.sendMail == 'true') {
            query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            queryValues = ["user", "email", "phone", "fullName", "about", "billingAddress", "profilePhoto", "status", "profileType", "password", request.user.email, request.user.phone, request.user.fullName, request.user.about, request.user.billingAddress, request.user.profilePhoto, request.user.status, request.user.profileType, md5(request.user.password)];
        } else {
            query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email=VALUES(email), phone=VALUES(phone), fullName=VALUES(fullName), about=VALUES(about), billingAddress=VALUES(billingAddress), profilePhoto=VALUES(profilePhoto), status=VALUES(status)";
            queryValues = ["user", "id", "email", "phone", "fullName", "about", "billingAddress", "profilePhoto", "status", "profileType", request.user.id, request.user.email, request.user.phone, request.user.fullName, request.user.about, request.user.billingAddress, request.user.profilePhoto, request.user.status, request.user.profileType];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    if (request.sendMail == 'true') {
                        var transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'care@forumias.com', // Your email id
                                pass: '123@academy' // Your password
                            }
                        });
                        var mailOptions = {
                            from: 'care@forumias.com', // sender address
                            to: request.user.email, // list of receivers
                            subject: 'ForumIAS: Login credential', // Subject line
                            text: 'Your account have been created and activated on forumias.academy .\n\n' +
                                'Login with below mentioned credential:\n\n' +
                                'Username: ' + request.user.email + ' Or ' + request.user.phone + '\n\n' +
                                'Password: ' + request.user.password + '\n\n' +
                                '\n'
                        };
                        transporter.sendMail(mailOptions, function(err, info) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("message sent");
                            };
                        });
                        callback({ "Error": false, "Message": "User Updated", 'user': request });
                    } else {
                        callback({ "Error": false, "Message": "User Updated", 'user': request });
                    }
                }
            });
        });
    },
    generatOtp: function(request, pool, callback) {
        // var secret = totp.utils.generateSecret();
        // var code = totp.generate(secret);
        var data = {
            phone: request.phone
        };
        self.findUser(data, pool, function(result) {
            if (result && !result.Error && !result.Code) {
                var secret = speakeasy.generateSecret();
                secret = secret.base32;
                var code = speakeasy.totp({
                    secret: secret,
                    encoding: 'base32',
                    step: 180
                });
                //callback({ "Error": false, "secret": secret, "code": code });
                msg91.send(request.phone, "Your OTP:" + code, function(err, response) {
                    if (err) {
                        callback({ "Error": true, "Message": "Unable to send message to phone number" });
                    } else {
                        callback({ "Error": false, "secret": secret });
                    }
                    msg91.getBalance(function(err, msgCount) {
                        console.log(err);
                        console.log(msgCount);
                    });
                });
            } else if (result && !result.Error && result.Code) {
                result.Error = true
                callback(result);
            } else {
                callback({ "Error": true, "Message": "Error occured, Please try after some time" });
            }
        });
    },
    validatetOtp: function(request, callback) {
        //var status = totp.check(request.code, request.secret);
        var status = speakeasy.totp.verify({
            secret: request.secret,
            encoding: 'base32',
            token: request.code,
            step: 180
        });
        if (status)
            callback({ "Error": false, "Message": "Correct code" });
        else
            callback({ "Error": true, "Message": "Incorrect code" });
    },
    savePaymentDetails: function(req, paymentInfo, pool, callback) {
        var query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var queryValues = ["payment_details", "payment_request_id", "phone", "purpose", "amount", "email", "fullName", "userId", "courseId", "mode", paymentInfo.id, req.phone, req.purpose, req.amt, req.email, req.fullName, req.userId, req.courseId, "online"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) {
                    callback(err);
                }
                connection.query(query, function(err, rows) {
                    if (err) {
                        return connection.rollback(function() {
                            connection.release();
                            callback({ "Error": true });
                        });
                    }
                    query = "INSERT INTO ??(??, ??) values (?, ?)";
                    queryValues = ["payment_log", "payment_request_id", "status", paymentInfo.id, paymentInfo.status];
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            return connection.rollback(function() {
                                connection.release();
                                callback({ "Error": true });
                            });
                        }
                        connection.commit(function(err) {
                            connection.release();
                            if (err) {
                                return connection.rollback(function() {
                                    callback({ "Error": true });
                                });
                            }
                            callback({ "Error": false });
                        });
                    });
                });
            });
        });
    },
    savePaymentStatus: function(request, pool, callback) {
        var query, queryValues;
        query = "INSERT INTO ??(??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?)";
        queryValues = ["payment_log", "payment_request_id", "payment_id", "fees", "mac", "status", request.payment_request_id, request.payment_id, request.fees, request.mac, request.status];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) {
                    callback(err);
                }
                connection.query(query, function(err, rows) {
                    if (err) {
                        return connection.rollback(function() {
                            connection.release();
                            callback({ "Error": true });
                        });
                    }
                    if (request.status.toLowerCase() == 'credit') {
                        query = "INSERT INTO ??(??, ??, ??) SELECT courseId, userId, mode FROM payment_details WHERE payment_request_id = ?";
                        queryValues = ["course_subscription", "courseId", "userId", "mode", request.payment_request_id];
                        query = mysql.format(query, queryValues);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                return connection.rollback(function() {
                                    connection.release();
                                    callback({ "Error": true });
                                });
                            }
                            connection.commit(function(err) {
                                connection.release();
                                if (err) {
                                    return connection.rollback(function() {
                                        callback({ "Error": true });
                                    });
                                }
                                callback({ "Error": false });
                            });
                        });
                    } else {
                        connection.commit(function(err) {
                            connection.release();
                            if (err) {
                                return connection.rollback(function() {
                                    callback({ "Error": true });
                                });
                            }
                            callback({ "Error": false });
                        });
                    }
                });
            });
        });
    },
    subscribeCourse: function(request, pool, callback) {
        var query = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)";
        var queryValues = ["course_subscription", "courseId", "userId", "mode", request.courseId, request.userId, request.mode];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Course subscribed successfully", "code": 1 });
                }
            });
        });
    },
    subscribeManual: function(request, pool, callback) {
        var values = [],
            query, queryValues = [];
        if (request.users && request.users.length > 0) {
            query = "INSERT INTO ??(??, ??, ??) VALUES ?";
            queryValues = ["course_subscription", "courseId", "userId", "mode"]; //, request.courseId, request.userId, request.mode];
            for (var i = 0; i < request.users.length; i++) {
                values.push([request.courseId, request.users[i], 'manual']);
            }
            queryValues.push(values);
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (err) {
                        callback({ "Error": true, "Message": err });
                    } else {
                        self.sendSubscriptionMailToStudents(request, pool)
                        callback({ "Error": false, "Message": "Course subscribed successfully", "code": 1 });
                    }
                });
            });
        } else {
            callback({ "Error": true, "Message": "No student to subscribe course" });
        }
    },
    sendSubscriptionMailToStudents: function(req, pool) {
        if (req && req.courseName && req.users) {
            var query = "SELECT u.email FROM user u WHERE u.id in (?)";
            var queryValues = [req.users];
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (rows && rows.length > 0) {
                        var mailList = _.map(rows, 'email');
                        var transporter = nodemailer.createTransport({
                            service: config.mail.service,
                            auth: {
                                user: config.mail.email, // Your email id
                                pass: config.mail.password // Your password
                            }
                        });
                        var mailOptions = {
                            from: config.mail.email, // sender address
                            bcc: mailList, // list of receivers
                            subject: 'Info: ForumIAS Academy Notification', // Subject line
                            html: '<b>Dear Student</b>, <p>You have been added to course  "' + req.courseName + '" on ForumIAS Academy.</p><p>Please login to your account in <a href="http://forumias.academy" target="_blank">forumias.academy</a> to access the Course. \n</p>'
                        };
                        transporter.sendMail(mailOptions, function(err, info) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("message sent");
                            };
                        });
                    }
                });
            });
        }
    },
    addCourseWithUsers: function(query, request, pool, callback) { /// to add users to course
        var query = query,
            queryValues;
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) {
                    callback(err);
                }
                connection.query(query, function(err, rows) {
                    if (err) {
                        return connection.rollback(function() {
                            connection.release();
                            callback(err);
                        });
                    }
                    var courseId = rows.insertId || request.id;
                    query = "INSERT INTO ??(??, ??, ??, ??) values ? ON DUPLICATE KEY UPDATE isDeleted=VALUES(isDeleted)";
                    queryValues = ["courses_instructor", "id", "courseId", "userId", "isDeleted"];
                    var values = [];
                    for (var i = 0; i < request.instructors.length; i++) {
                        values.push([request.instructors[i].id, courseId, request.instructors[i].userId, (request.instructors[i].isDeleted == 'true')]);
                    }
                    queryValues.push(values);
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            return connection.rollback(function() {
                                connection.release();
                                callback(err);
                            });
                        }
                        connection.commit(function(err) {
                            connection.release();
                            if (err) {
                                return connection.rollback(function() {
                                    callback(err);
                                });
                            }
                            callback(err, rows, courseId);
                        });
                    });
                });
            });
        });
    },
    addUpdateCourse: function(request, pool, callback) { /// update or add course
        var query, queryValues;
        query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE isDeleted=VALUES(isDeleted), name=VALUES(name), description=VALUES(description), demoVideo=VALUES(demoVideo), demoPoster=VALUES(demoPoster), subscriptionFee=VALUES(subscriptionFee), categoryId=VALUES(categoryId), filePath=VALUES(filePath), fileName=VALUES(fileName), validTo=VALUES(validTo), isForever=VALUES(isForever), isPublished=VALUES(isPublished), isSendMail=VALUES(isSendMail), shortDescription=VALUES(shortDescription)";
        queryValues = ["courses", "id", "name", "description", "demoVideo", "demoPoster", "filePath", "fileName", "subscriptionFee", "categoryId", "isDeleted", "validTo", "isForever", "isPublished", "isSendMail", "shortDescription", request.id, request.name, request.description, request.demoVideo, request.demoPoster, request.filePath, request.fileName, request.subscriptionFee, request.categoryId, (request.isDeleted == 'true'), request.validTo, (request.isForever == 'true'), request.isPublished, (request.isSendMail == 'true'), request.shortDescription];
        query = mysql.format(query, queryValues);
        if (request.instructors && request.instructors.length > 0) {
            self.addCourseWithUsers(query, request, pool, function(err, rows, courseId) {
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    self.getCoursesList(pool);
                    callback({ "Error": false, "Message": "Course Added", "courseId": courseId });
                }
            });
        } else {
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (err) {
                        callback({ "Error": true, "Message": err });
                    } else {
                        self.getCoursesList(pool);
                        var courseId = rows.insertId || request.id;
                        callback({ "Error": false, "Message": "Course Added", "courseId": courseId });
                    }
                });
            });
        }
    },
    searchCourse: function(type, request, pool, callback) {
        var query, queryValues;
        if (type == "byName") {
            query = "SELECT c.id, sum(l.duration) as courseDuration from ?? c LEFT JOIN (course_unit_lesson_r cul, lessons l) ON cul.courseId = c.id and l.id = cul.lessonId WHERE c.isDeleted = false AND c.name LIKE '%" + request.name + "%' GROUP BY c.id";
            queryValues = ["courses"];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    var result = [];
                    _.forEach(rows, function(value, key) {
                        var course = _.find(coursesList, { 'id': value.id });
                        course.duration = value.courseDuration;
                        result.push(course);
                    });
                    callback({ "Error": false, "Message": "Success", "courses": result });
                }
            });
        });
    },
    getCourseById: function(request, pool, callback) {
        var query = "SELECT u.*, sum(l.duration) as unitDuration from ?? u LEFT JOIN (tutorialsdb.course_unit_lesson_r cul, tutorialsdb.lessons l) on u.id = cul.unitId and l.id = cul.lessonId where u.isDeleted = false AND u.courseId = ? group by u.id";
        var queryValues = ["units", request.courseId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    var result = _.find(coursesList, { 'id': request.courseId });
                    //result.duration = _.sum(_.map(rows, 'unitDuration'));
                    result.units = rows;
                    callback({ "Error": false, "Message": "Success", "course": result });
                }
            });
        });
    },
    getCourseAndUnits: function(pool, callback) {
        var query = "SELECT c.id, c.name, GROUP_CONCAT(u.id) as unitList from ?? c LEFT JOIN (units u) ON c.id = u.courseId and u.isDeleted=false GROUP BY c.id";
        var queryValues = ["courses"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    _.forEach(rows, function(value, key) {
                        value.units = [];
                        if (value.unitList && value.unitList.length > 0) {
                            _.forEach(value.unitList.split(','), function(childValue, childKey) {
                                var unit = _.cloneDeep(_.find(unitsList, { 'id': parseInt(childValue) }));
                                value.units.push(unit);
                            });
                        }
                        //delete value.unitList;
                    });
                    callback({ "Error": false, "Message": "Success", "courses": rows });
                }
            });
        });
    },
    getAllCourses: function(type, id, pool, callback) { /// get list of course(all/subscribed/unsubscribed)
        var query, queryValues;
        if (type == "all") {
            query = "SELECT c.id, sum(l.duration) as courseDuration from ?? c LEFT JOIN (course_unit_lesson_r cul, lessons l) ON cul.courseId = c.id and l.id = cul.lessonId WHERE c.isDeleted = false GROUP BY c.id";
            queryValues = ["courses"];
        } else if (type == "subscribed") {
            query = "SELECT c.id, sum(l.duration) as courseDuration from ?? c LEFT JOIN (course_unit_lesson_r cul, lessons l) ON cul.courseId = c.id and l.id = cul.lessonId where c.isDeleted = false AND c.id IN (select ?? from course_subscription where ?? = ?) AND c.isPublished = true AND (c.isForever = true OR subdate(current_date, 1) <= c.validTo) GROUP BY c.id";
            queryValues = ["courses", "courseId", "userId", id];
        } else if (type == "unsubscribed") {
            query = "SELECT c.id, sum(l.duration) as courseDuration from ?? c LEFT JOIN (course_unit_lesson_r cul, lessons l) ON cul.courseId = c.id and l.id = cul.lessonId where c.isDeleted = false AND c.id NOT IN (select ?? from course_subscription where ?? = ?) GROUP BY c.id";
            queryValues = ["courses", "courseId", "userId", id];
        } else if (type == "courseLibary") {
            query = "SELECT c.id, IF(uc.id IS NULL, false, true) as isSubscribed from ?? c LEFT JOIN (course_subscription uc) ON c.id = uc.courseId and uc.userId = ? where c.isDeleted = false AND c.isPublished = true AND (c.isForever = true OR subdate(current_date, 1) <= c.validTo)";
            queryValues = ["courses", id];
        } else if (type == "nameList") {
            query = "SELECT c.id, c.name from ?? c WHERE c.isDeleted = false";
            queryValues = ["courses"];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    var result = [];
                    if (type == "nameList") {
                        result = rows;
                    } else {
                        _.forEach(rows, function(value, key) {
                            var course = _.find(coursesList, { 'id': value.id });
                            //course.duration = value.courseDuration;
                            course.isForever = course.isForever ? true : false;
                            course.isSendMail = course.isSendMail ? true : false;
                            course.isSubscribed = value.isSubscribed ? true : false;
                            result.push(course);
                        });
                    }
                    callback({ "Error": false, "Message": "Success", "courses": result });
                }
            });
        });
    },
    getAllCourseUser: function(req, pool, callback) {
        var query, queryValues, from = 0,
            count = req.perPage || 40;
        var userCount = 0;
        if (req.page) {
            from = (req.page - 1) * count;
        }
        if (req.searchText) {
            query = "SELECT count(*) as userCount FROM user u JOIN (course_subscription uc) ON uc.userId = u.id WHERE uc.courseId=? AND (u.fullName like ? OR u.email like ? OR u.phone like ?)";
            queryValues = [req.courseId, '%' + req.searchText + '%', '%' + req.searchText + '%', '%' + req.searchText + '%'];
        } else {
            query = "SELECT count(*) as userCount FROM course_subscription uc WHERE uc.courseId=?";
            queryValues = [req.courseId];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else {
                    userCount = rows[0].userCount;
                    if (req.searchText) {
                        query = "SELECT u.id, u.fullName, u.email, u.phone, uc.mode FROM course_subscription uc JOIN (user u) ON uc.userId = u.id WHERE uc.courseId=? AND (u.fullName like ? OR u.email like ? OR u.phone like ?) ORDER BY u.id LIMIT ?, ?";
                        queryValues = [req.courseId, '%' + req.searchText + '%', '%' + req.searchText + '%', '%' + req.searchText + '%', from, count];
                    } else {
                        query = "SELECT u.id, u.fullName, u.email, u.phone, uc.mode FROM course_subscription uc JOIN (user u) ON uc.userId = u.id WHERE uc.courseId=? ORDER BY u.id LIMIT ?, ?";
                        queryValues = [req.courseId, from, count];
                    }
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (err) {
                            callback({ "Error": true, "Message": err });
                        } else {
                            callback({ "Error": false, "Message": "Successfull", "courseUsers": rows, "recordCount": userCount });
                        }
                    });
                }
            });
        });
    },
    addUpdateCourseUnit: function(request, courseId, pool, callback) {
        var query, queryValues;
        var updateList = _.filter(request, 'id');
        var insertList = _.filter(request, function(o) {
            return !o.id;
        });
        if (request && request.length > 0) {
            query = "INSERT INTO ??(??, ??, ??, ??, ??) values ? ON DUPLICATE KEY UPDATE name=VALUES(name), courseId=VALUES(courseId), isDeleted=VALUES(isDeleted)";
            queryValues = ["units", "id", "name", "description", "courseId", "isDeleted"];
            var values = [];
            for (var i = 0; i < request.length; i++) {
                values.push([request[i].id, request[i].name, request[i].name, courseId, (request[i].isDeleted == 'true')]);
            }
            queryValues.push(values);
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (err) {
                        callback({ "Error": true, "Message": err });
                    } else {
                        self.getUnitsList(pool);
                        callback({ "Error": false, "Message": "Success" });
                    }
                });
            });
        }
    },
    getCourseFile: function(id, pool, callback) {
        var query = "SELECT id, fileName, filePath FROM ?? WHERE id = ?";
        var queryValues = ["courses", id];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "files": [] });
                } else {
                    callback({ "files": rows });
                }
            });
        });
    },
    updateFilePath: function(file, pool, callback) {
        var query = "UPDATE ?? SET filePath = ? WHERE id = ?";
        var queryValues = ["courses", file.filePath, file.id];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                callback({ "result": rows });
            });
        });
    },
    getAllUnits: function(type, id, pool, callback) { /// get list of units(by course id)
        var query, queryValues;
        if (type == 'byCourseId') {
            query = "SELECT u.*, GROUP_CONCAT(cul.lessonId) as lessonList from ?? u LEFT JOIN (course_unit_lesson_r cul) ON u.id = cul.unitId where u.courseId = ? AND u.isDeleted = false GROUP BY u.id";
            queryValues = ["units", id];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    _.forEach(rows, function(value, key) {
                        value.lessons = [];
                        if (value.lessonList) {
                            _.forEach(value.lessonList.split(",").sort(), function(childValue, childKey) {
                                var lesson = _.find(lessonsList, { 'id': parseInt(childValue) });
                                if (lesson) {
                                    value.lessons.push(lesson);
                                }
                            });
                        }
                        delete value.lessonList;
                    });
                    callback({ "Error": false, "Message": "Success", "units": rows });
                }
            });
        });
    },
    addUpdateLesson: function(request, pool, callback) { /// add update lesson
        var query, queryValues;
        query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??) values (?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), video=VALUES(video), duration=VALUES(duration), isDeleted=VALUES(isDeleted), poster=VALUES(poster), isCommentingAllowed=VALUES(isCommentingAllowed)";
        queryValues = ["lessons", "id", "name", "description", "video", "duration", "isDeleted", "poster", "isCommentingAllowed", request.id, request.name, request.description, request.video, request.duration, (request.isDeleted == 'true'), request.poster, (request.isCommentingAllowed == 'true')];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) {
                    callback({ "Error": true, "Message": err });
                }
                connection.query(query, function(err, rows) {
                    if (err) {
                        return connection.rollback(function() {
                            connection.release();
                            callback({ "Error": true, "Message": err });
                        });
                    }
                    var lessonId = rows.insertId || request.id;
                    if (request.courses && request.courses.length > 0) {
                        query = "INSERT INTO ??(??, ??, ??, ??) values (?, ?, ?, ?) ON DUPLICATE KEY UPDATE courseId=VALUES(courseId), lessonId=VALUES(lessonId), unitId=VALUES(unitId)";
                        queryValues = ["course_unit_lesson_r", "id", "lessonId", "courseId", "unitId", request.courses[0].id, lessonId, request.courses[0].courseId, request.courses[0].unitId];
                        query = mysql.format(query, queryValues);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                return connection.rollback(function() {
                                    connection.release();
                                    callback({ "Error": true, "Message": err });
                                });
                            }
                            connection.commit(function(err) {
                                if (err) {
                                    return connection.rollback(function() {
                                        connection.release();
                                        callback({ "Error": true, "Message": err });
                                    });
                                } else {
                                    self.getLessonsList(pool);
                                    if(!request.id)
                                        self.sendMailForNewLesson(request, pool);
                                    callback({ "Error": false, "Message": "Lesson added", "lessonId": lessonId });
                                }
                            });
                        });
                    } else {
                        connection.commit(function(err) {
                            connection.release();
                            if (err) {
                                return connection.rollback(function() {
                                    callback({ "Error": true, "Message": err });
                                });
                            }
                            self.getLessonsList(pool);
                            callback({ "Error": false, "Message": "Lesson added", "lessonId": lessonId });
                        });
                    }
                });
            });
        });
    },
    addFilesToLesson: function(request, pool, callback) {
        var query = "INSERT INTO ??(??, ??, ??) values ?";
        var queryValues = ["lesson_files", "lessonId", "fileName", "filePath"];
        var values = [];
        for (var i = 0; i < request.filesList.length; i++) {
            values.push([request.lessonId, request.filesList[i].fileName, request.filesList[i].filePath]);
        }
        queryValues.push(values);
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    //self.getLessonsFiles(pool);
                    callback({ "Error": false, "Message": "Success" });
                }
            });
        });
    },
    getLessonById: function(request, pool, callback) {
        var query = "SELECT * FROM ?? cul where cul.lessonId = ?";
        var queryValues = ["course_unit_lesson_r", request.lessonId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    var result = _.cloneDeep(_.find(lessonsList, { 'id': request.lessonId }));
                    if (result) {
                        result.isCommentingAllowed = result.isCommentingAllowed ? true : false;
                        result.courses = [];
                        if (rows && rows.length > 0) {
                            _.forEach(rows, function(value, key) {
                                value.courseName = _.cloneDeep(_.find(coursesList, { 'id': value.courseId }).name);
                                value.unitName = _.cloneDeep(_.find(unitsList, { 'id': value.unitId }).name);
                                result.courses.push(value);
                            });
                        }
                    }
                    callback({ "Error": false, "Message": "Success", "lesson": result });
                }
            });
        });
    },
    getAllLessons: function(callback) { /// get list all lessons
        if (lessonsList) {
            callback({ "Error": false, "Message": "Success", "lessons": lessonsList });
        }
    },
    addCommentOnLesson: function(request, pool, callback) { /// insert comment to lesson
        var query = "INSERT INTO ??(??, ??, ??) values (?, ?, ?)";
        var queryValues = ["lesson_comments", "lessonId", "userId", "comments", request.lessonId, request.userId, request.comment];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    self.getLessonsComments(pool, request.lessonId);
                    callback({ "Error": false, "Message": "Success" });
                }
            });
        });
    },
    getCommentOnLesson: function(request, pool, callback) { /// get lesson comments by id
        var lesson = _.find(lessonsList, { 'id': request.lessonId });
        var comments = [];
        if (lesson) {
            comments = lesson.comments;
            callback({ "Error": false, "Message": "Success", "comments": comments });
        } else {
            callback({ "Error": true, "Message": "Comments Not Found" });
        }
    },
    getAllCategories: function(type, id, pool, callback) { /// get list of all category
        var query, queryValues;
        if (type = "all") {
            query = "SELECT ct.*, count(c.id) as coursesCount FROM ?? ct LEFT JOIN (courses c) ON c.categoryId = ct.id GROUP BY ct.id";
            queryValues = ["categories"];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Success", "categories": rows });
                }
            });
        });
    },
    addCategories: function(request, pool, callback) {
        var query = "INSERT INTO ??(??) VALUES (?)";
        var queryValues = ["categories", "name", request.name];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Success" });
                }
            });
        });
    },
    addBatch: function(req, pool, callback) {
        var query = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)";
        var queryValues = ["batches", "name", "description", "createdBy", req.name, req.description, req.createdBy];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection){
            connection.query(query, function(err, rows){
                connection.release();
                if(err){
                    callback({"Error": true, "Message": err});
                } else {
                    callback({ "Error": false, "Message": "Batch added successfully"});
                }
            });
        });
    },
    getAllBatches: function(req, pool, callback) {
        var query = "SELECT * FROM ??";
        var queryValues = ["batches"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if(err){
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "successfully", "batches": rows });
                }
            });
        });
    }
};

module.exports = self;

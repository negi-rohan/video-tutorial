var mysql = require("mysql");
var _ = require("lodash");
var moment = require("moment");
var async = require('async');
var json2xls = require('json2xls');
var fs = require('fs');
var path = require('path');
var nodemailer = require('nodemailer');
var config = require('./config');

var questionList = 0,
    subjectList = [];

var self = {
    initTestDictionaries: function(pool) {
        self.getQuestionCount(pool);
        self.getAllSubjects(pool);
    },
    getQuestionCount: function(pool) {
        var query = "SELECT * from ?? WHERE isDeleted=false AND parentQuestionId IS NULL";
        var queryValues = ["questions"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    console.log(err);
                } else {
                    questionList = rows;
                }
            });
        });
    },
    getAllSubjects: function(pool) {
        var query = "SELECT * FROM ??";
        var queryValues = ["subjects"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    subjectList = rows;
                }
            });
        });
    },
    addTestSeries: function(req, pool, callback) {
        var query = "INSERT INTO ??(??, ??, ??) VALUES (?, ?, ?)";
        var queryValues = ["testseries", "name", "description", "createdBy", req.name, req.description, req.createdBy];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Test series added Successfully" });
                }
            });
        });
    },
    updateTestSeries: function(req, pool, callback) {
        var query = "UPDATE ?? SET description = ?, testPlan = ?, modifiedBy = ?, isPublished=? WHERE id = ?";
        var queryValues = ["testseries", req.description, req.testPlan, req.modifiedBy, req.isPublished, req.id];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Test series updated Successfully" });
                }
            });
        });
    },
    getTestSeriesById: function(req, pool, callback) {
        var query = "SELECT * FROM ?? WHERE id = ?";
        var queryValues = ["testseries", req.testSeriesId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "successfully", "testSeries": rows[0] });
                }
            });
        });
    },
    getAllTestSeries: function(type, req, pool, callback) {
        var query, queryValues;
        if (type == 'all') {
            query = "SELECT ts.*, GROUP_CONCAT(t.title) as testList FROM ?? ts LEFT JOIN (test_testseries tt, tests t) ON tt.resourceId = ts.id and t.id = tt.testId and t.isDeleted = false WHERE ts.isDeleted = false GROUP BY ts.id";
            queryValues = ["testseries"];
        } else if (type == 'nameList') {
            query = "SELECT id, name FROM ?? WHERE isDeleted = false";
            queryValues = ["testseries"];
        } else if (type == 'byUser') {
            query = "SELECT ts.*, IF(tss.id IS NULL, false, true) as isSubscribed FROM ?? ts LEFT JOIN (testseries_subscription tss) ON ts.id = tss.testSeriesId and tss.userId = ? WHERE ts.isDeleted = false AND ts.isPublished = true";
            queryValues = ["testseries", req.userId];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    var testSeries = _.reject(rows, function(o) {
                        return !o.id;
                    });
                    callback({ "Error": false, "Message": "Successfully", "testSeries": testSeries });
                }
            });
        });
    },
    addTestToTestSeries: function(req, pool, callback) {
        var values = [];
        var query = "INSERT INTO ??(??, ??, ??, ??, ??) VALUES ? ON DUPLICATE KEY UPDATE startDate=VALUES(startDate), endDate=VALUES(endDate), resultDate=VALUES(resultDate)";
        var queryValues = ["test_testseries", "resourceId", "testId", "startDate", "endDate", "resultDate"];
        for (var i = 0; i < req.tests.length; i++) {
            values.push([req.testSeriesId, req.tests[i].id, req.tests[i].startDate, req.tests[i].endDate, req.tests[i].resultDate]);
        }
        queryValues.push(values);
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Test added to series Successfully" });
                }
            });
        });
    },
    getSeriesTest: function(req, pool, callback) {
        var query = "SELECT t.id, t.title, ts.startDate, ts.endDate, ts.resultDate FROM ?? ts JOIN (?? t) ON ts.testId = t.id WHERE ts.resourceId = ?";
        var queryValues = ["test_testseries", "tests", req.testSeriesId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Successfull", "tests": rows });
                }
            });
        });
    },
    addUsersToTestSeries: function(req, pool, callback) {
        var values = [],
            query, queryValues = [];
        if (req.users && req.users.length > 0) {
            query = "INSERT INTO ??(??, ??, ??) VALUES ?";
            queryValues = ["testseries_subscription", "testSeriesId", "userId", "mode"]; //, request.courseId, request.userId, request.mode];
            for (var i = 0; i < req.users.length; i++) {
                values.push([req.testSeriesId, req.users[i], 'manual']);
            }
            queryValues.push(values);
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (err) {
                        if (err && err.code && err.code == "ER_DUP_ENTRY")
                            callback({ "Error": true, "Message": "Student already added in test series" });
                        else
                            callback({ "Error": true, "Message": err });
                    } else {
                        self.sendSubscriptionMailToStudents(req, pool);
                        callback({ "Error": false, "Message": "Test series subscribed successfully", "code": 1 });
                    }
                });
            });
        } else {
            callback({ "Error": true, "Message": "No student to subscribe test series" });
        }
    },
    sendSubscriptionMailToStudents: function(req, pool) {
        if (req && req.testSeriesName && req.users) {
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
                            html: '<b>Dear Student</b>, <p>You have been added to Test Series  "' + req.testSeriesName + '" on ForumIAS Academy.</p><p>Please login to your account in <a href="http://forumias.academy" target="_blank">forumias.academy</a> to access the test-series. \n</p>'
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
    getSeriesUser: function(req, pool, callback) {
        var query, queryValues, from = 0,
            count = req.perPage || 40;
        var userCount = 0;
        if (req.page) {
            from = (req.page - 1) * count;
        }
        if (req.searchText) {
            query = "SELECT count(*) as userCount FROM user u JOIN (testseries_subscription uts) ON uts.userId = u.id WHERE uts.testSeriesId=? AND (u.fullName like ? OR u.email like ? OR u.phone like ?)";
            queryValues = [req.testSeriesId, '%' + req.searchText + '%', '%' + req.searchText + '%', '%' + req.searchText + '%'];
        } else {
            query = "SELECT count(*) as userCount FROM testseries_subscription uts WHERE uts.testSeriesId=?";
            queryValues = [req.testSeriesId];
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
                        query = "SELECT u.id, u.fullName, u.email, u.phone, uts.mode FROM testseries_subscription uts JOIN (user u) ON uts.userId = u.id WHERE uts.testSeriesId=? AND (u.fullName like ? OR u.email like ? OR u.phone like ?) ORDER BY u.id LIMIT ?, ?";
                        queryValues = [req.testSeriesId, '%' + req.searchText + '%', '%' + req.searchText + '%', '%' + req.searchText + '%', from, count];
                    } else {
                        query = "SELECT u.id, u.fullName, u.email, u.phone, uts.mode FROM testseries_subscription uts JOIN (user u) ON uts.userId = u.id WHERE uts.testSeriesId=? ORDER BY u.id LIMIT ?, ?";
                        queryValues = [req.testSeriesId, from, count];
                    }
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (err) {
                            callback({ "Error": true, "Message": err });
                        } else {
                            callback({ "Error": false, "Message": "Successfull", "students": rows, "recordCount": userCount });
                        }
                    });
                }
            });
        });
    },
    addUpdateTest: function(req, pool, callback) {
        req.duration = req.duration ? req.duration * 3600 : '';
        req.startDate = req.startDate ? moment(req.startDate).format('YYYY-MM-DD HH:mm:SS') : '';
        req.endDate = req.endDate ? moment(req.endDate).format('YYYY-MM-DD HH:mm:SS') : '';
        var query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), duration=VALUES(duration), marksPerQues=VALUES(marksPerQues), negativeMarks=VALUES(negativeMarks), instantResult=VALUES(instantResult), instantRank=VALUES(instantRank), instruction=VALUES(instruction), questionPaperId=VALUES(questionPaperId), attachment=VALUES(attachment), file=VALUES(file)";
        var queryValues = ["tests", "id", "title", "duration", "marksPerQues", "negativeMarks", "instantResult", "instantRank", "instruction", "questionPaperId", "attachment", "file", req.id, req.title, req.duration, req.marksPerQues, req.negativeMarks, req.instantResult, req.instantRank, req.instruction, req.questionPaperId, req.attachment, req.file];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Test Updated" });
                }
            });
        });
    },
    getTestById: function(req, pool, callback) {
        var query = "SELECT t.*, qp.name as questionPaperName FROM ?? t LEFT JOIN (?? qp) ON t.questionPaperId = qp.id WHERE t.isDeleted=false and t.id=?";
        var queryValues = ["tests", "questionpapers", req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    rows[0].instantResult = rows[0].instantResult ? true : false;
                    rows[0].instantRank = rows[0].instantRank ? true : false;
                    rows[0].duration = rows[0].duration / 3600;
                    callback({ "Error": false, "Message": "Successfully", "test": rows[0] });
                } else {
                    callback({ "Error": true, "Message": "Test not found" });
                }
            });
        });
    },
    getAllTest: function(req, pool, callback) {
        var query = "SELECT t.*, qp.name as questionPaperName, count(ui.id) as userCount FROM ?? t LEFT JOIN (?? qp) ON t.questionPaperId = qp.id LEFT JOIN (testuserinfo ui) ON t.id=ui.testId WHERE t.isDeleted=false GROUP BY t.id";
        var queryValues = ["tests", "questionpapers"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    _.forEach(rows, function(value) {
                        value.durationInHrs = value.duration / 3600;
                    });
                    callback({ "Error": false, "Message": "Successfully", "tests": rows });
                }
            });
        });
    },
    deleteTest: function(req, pool, callback) {
        var query = "UPDATE ?? SET isDeleted = true WHERE id=?";
        var queryValues = ["tests", req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Test deleted" });
                }
            });
        });
    },
    getTestUsers: function(req, pool, callback) {
        var query, queryValues, from = 0,
            count = req.perPage || 40;
        var userCount = 0;
        if (req.page) {
            from = (req.page - 1) * count;
        }
        if (req.searchText) {
            query = "SELECT count(*) as userCount FROM user u JOIN (testuserinfo tu) ON tu.userId = u.id WHERE tu.testId=? AND (u.fullName like ? OR u.email like ? OR u.phone like ?)";
            queryValues = [req.testId, '%' + req.searchText + '%', '%' + req.searchText + '%', '%' + req.searchText + '%'];
        } else {
            query = "SELECT count(*) as userCount FROM testuserinfo tu WHERE tu.testId=?";
            queryValues = [req.testId];
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
                        query = "SELECT u.id, u.fullName, u.email, u.phone, u.profileType, tu.status, tu.score, tu.rank, tu.percentile, tu.correctAnswers, tu.incorrectAnswers, tu.timeSpent FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? AND (u.fullName like ? OR u.email like ? OR u.phone like ?) ORDER BY tu.status, tu.score DESC LIMIT ?, ?";
                        queryValues = [req.testId, '%' + req.searchText + '%', '%' + req.searchText + '%', '%' + req.searchText + '%', from, count];
                    } else if (req.withEvaluatedStatus) {
                        query = "SELECT u.id, u.fullName, tu.score, tu.rank, tu.percentile, tu.correctAnswers, tu.incorrectAnswers, tu.timeSpent FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? AND tu.status = 'evaluated' AND tu.rank IS NOT NULL ORDER BY tu.score DESC";
                        queryValues = [req.testId];
                    } else {
                        query = "SELECT u.id, u.fullName, u.email, u.phone, u.profileType, tu.status, tu.score, tu.rank, tu.percentile, tu.correctAnswers, tu.incorrectAnswers, tu.timeSpent FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? ORDER BY tu.status, tu.score DESC LIMIT ?, ?";
                        queryValues = [req.testId, from, count];
                    }
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (err) {
                            callback({ "Error": true, "Message": err });
                        } else {
                            callback({ "Error": false, "Message": "Successfull", "testUsers": rows, "recordCount": userCount });
                        }
                    });
                }
            });
        });
    },
    getTestRanking: function(req, pool, callback) {
        var query, queryValues, from = 0,
            count = req.perPage || 40;
        var userCount = 0;
        if (req.page) {
            from = (req.page - 1) * count;
        }
        query = "SELECT count(*) as userCount FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? ORDER BY tu.status, tu.score DESC";
        queryValues = [req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else {
                    userCount = rows[0].userCount;
                    if (req.withEvaluatedStatus) {
                        query = "SELECT u.id, tu.score, tu.rank, tu.percentile, tu.correctAnswers, tu.incorrectAnswers FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? AND tu.status=? ORDER BY tu.status, tu.score DESC";
                        queryValues = [req.testId, "evaluated"];
                    } else {
                        query = "SELECT u.id, u.fullName, u.email, u.phone, tu.status, tu.score, tu.rank, tu.percentile, tu.correctAnswers, tu.incorrectAnswers FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? ORDER BY tu.status, tu.score DESC LIMIT ?, ?";
                        queryValues = [req.testId, from, count];
                    }
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (err) {
                            callback({ "Error": true, "Message": err });
                        } else {
                            callback({ "Error": false, "Message": "Successfull", "testUsers": rows, "recordCount": userCount });
                        }
                    });
                }
            });
        });
    },
    exportTestUsersScore: function(req, request, pool, callback) {
        var query, queryValues;
        query = "SELECT u.id, u.fullName, u.email, u.phone, tu.status, tu.score, tu.rank, tu.percentile, tu.correctAnswers, tu.incorrectAnswers FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? ORDER BY tu.status, tu.score DESC";
        queryValues = [req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    if (rows && rows.length > 0) {
                        var xls = json2xls(rows);

                        fs.writeFileSync(path.join(__dirname, 'public/userTestInfo.xlsx'), xls, 'binary');
                        callback({ "Error": false, "Message": "Successfull", "url": request.protocol + '://' + request.get('host') + '/userTestInfo.xlsx' });
                    }
                }
            });
        });
    },
    getAllExams: function(req, pool, callback) {
        var query = "SELECT ts.startDate, ts.endDate, ts.resultDate, t.*, u.status, u.score, u.rank, u.percentile FROM ?? ts LEFT JOIN (tests t) ON t.id = ts.testId LEFT JOIN (testuserinfo u) ON t.id = u.testId and u.userId = ? WHERE ts.startDate IS NOT NULL AND ts.resourceId = ? GROUP By t.id ORDER BY ts.startDate";
        var queryValues = ["test_testseries", req.userId, req.testSeriesId];
        // var query = "SELECT t.*, u.status, u.score, u.rank, u.percentile, count(qq.questionId) as questionCount FROM ?? t LEFT JOIN (testuserinfo u) ON t.id = u.testId and u.userId = ?  LEFT JOIN (question_questionpaper qq) ON qq.questionPaperId = t.questionPaperId WHERE t.isDeleted=false AND t.id IN (SELECT tt.testId FROM test_testseries tt WHERE tt.resourceId = ?) GROUP By t.id ORDER BY t.startDate";
        // var queryValues = ["tests", req.userId, req.testSeriesId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    _.forEach(rows, function(value) {
                        value.durationInHrs = value.duration / 3600;
                    });
                    callback({ "Error": false, "Message": "Successfully", "tests": rows })
                } else {
                    callback({ "Error": false, "Message": "No test found", "tests": rows })
                }
            });
        });
    },
    getTestQuestions: function(req, pool, callback) {
        var query, queryValues, questions = [],
            result = [];
        query = "SELECT questionId FROM ?? WHERE isDeleted = false AND questionPaperId = (SELECT questionPaperId FROM ?? WHERE id = ?)";
        queryValues = ["question_questionpaper", "tests", req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    var questionIds = _.map(rows, 'questionId');
                    if (req.selectAll) {
                        query = "SELECT q.*, s.name as subjectName, qs.totalAttempt, qs.correct FROM ?? q LEFT JOIN (subjects s) ON s.id = q.subjectId LEFT JOIN (questions_stats qs) ON qs.questionId = q.id WHERE q.isDeleted=false AND (q.id IN (?) OR q.parentQuestionId IN (?))";
                    } else {
                        query = "SELECT q.id, q.question, q.type, q.parentQuestionId, q.questionText, qs.totalAttempt, qs.correct FROM ?? q LEFT JOIN (questions_stats qs) ON qs.questionId = q.id WHERE isDeleted=false AND (q.id IN (?) OR q.parentQuestionId IN (?))";
                    }
                    //
                    //query = "SELECT id, question, type, parentQuestionId FROM ?? WHERE isDeleted=false AND (id IN (?) OR parentQuestionId IN (?))";
                    queryValues = ["questions", questionIds, questionIds];
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        result = rows;
                        if (err) {
                            connection.release();
                            callback({ "Error": true, "Message": err });
                        } else if (result && result.length > 0) {
                            async.eachSeries(result, function(question, callback) {
                                if (question.type.toLowerCase() == 'mcq' || question.type.toLowerCase() == 'passagechild') {
                                    query = "SELECT id, answerText, ansKey, ansText FROM ?? WHERE isDeleted=false AND questionId=?";
                                    queryValues = ["answers", question.id];
                                    query = mysql.format(query, queryValues);
                                    connection.query(query, function(err, rows) {
                                        if (err) {
                                            callback(err);
                                        } else {
                                            question.answers = rows;
                                            callback('');
                                        }
                                    });
                                } else {
                                    callback('');
                                }
                            }, function(err) {
                                connection.release();
                                if (err) {
                                    callback({ "Error": true, "Message": err });
                                } else {
                                    if (!req.selectAll) {
                                        _.forEach(result, function(value) {
                                            if (value.type.toLowerCase() == 'mcq') {
                                                questions.push(value);
                                            } else if (value.type.toLowerCase() == 'passagechild') {
                                                var question = _.find(result, { 'id': value.parentQuestionId });
                                                if (question && question.question)
                                                    value.passage = question.question;
                                                questions.push(value);
                                            }
                                        });
                                    } else {
                                        questions = result;
                                    }
                                    callback({ "Error": false, "Message": "Successfully", "questions": questions });
                                }
                            });
                        } else {
                            connection.release();
                            callback({ "Error": true, "Message": "Unable to fetch exam" });
                        }
                    });
                } else {
                    connection.release();
                    callback({ "Error": true, "Message": "Unable to fetch exam" });
                }
            });
        });
    },
    getTestQuestionsOnly: function(req, pool, callback) {
        var query, queryValues;
        query = "SELECT questionId FROM ?? WHERE isDeleted = false AND questionPaperId = (SELECT questionPaperId FROM ?? WHERE id = ?)";
        queryValues = ["question_questionpaper", "tests", req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    var questionIds = _.map(rows, 'questionId');
                    query = "SELECT * FROM ?? WHERE isDeleted=false AND (id IN (?) OR parentQuestionId IN (?))";
                    queryValues = ["questions", questionIds, questionIds];
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        callback({ "Error": false, "questions": rows });
                    });
                } else {
                    connection.release();
                    callback({ "Error": true, "Message": "Unable to fetch exam" });
                }
            });
        });
    },
    getTestUserInfo: function(req, pool, callback) {
        var query, queryValues;
        query = "SELECT * FROM ?? WHERE userId=? AND testId=?";
        queryValues = ["testuserinfo", req.userId, req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    var userTestInfo = rows[0];
                    query = "SELECT questionId, answer, isMarked FROM ?? WHERE userId=? AND testId=?";
                    queryValues = ["test_user_answer", req.userId, req.testId];
                    query = mysql.format(query, queryValues);
                    pool.getConnection(function(err, connection) {
                        connection.query(query, function(err, rows) {
                            connection.release();
                            if (err) {
                                callback({ "Error": true, "Message": err, 'userTestInfo': userTestInfo });
                            } else if (rows) {
                                _.forEach(rows, function(value) {
                                    value.isMarked = value.isMarked ? true : false;
                                });
                                userTestInfo.answers = rows;
                                callback({ "Error": false, "Message": "Successfull", 'userTestInfo': userTestInfo });
                            }
                        });
                    });
                } else {
                    callback({ "Error": false, "Message": "Successfull", 'userTestInfo': {} });
                }
            });
        });
    },
    submitTest: function(req, pool, callback) {
        if (req.answers && req.answers.length > 0) {
            var query, queryValues, values;
            query = "INSERT INTO ??(??, ??, ??, ??, ??) VALUES ? ON DUPLICATE KEY UPDATE answer=VALUES(answer), isMarked=VALUES(isMarked)";
            queryValues = ["test_user_answer", "userId", "testId", "questionId", "answer", "isMarked"];
            values = [];
            for (var i = 0; i < req.answers.length; i++) {
                values.push([req.userId, req.testId, req.answers[i].questionId, req.answers[i].answer, req.answers[i].isMarked]);
            }
            queryValues.push(values);
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    connection.release();
                    if (err) {
                        callback({ "Error": true, "Message": err });
                    } else {
                        self.submitTestUser(req, pool, callback);
                    }
                });
            });
        } else {
            self.submitTestUser(req, pool, callback);
        }
    },
    submitTestUser: function(req, pool, callback) {
        query = "INSERT INTO ??(??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE status=VALUES(status), timeRemaining=VALUES(timeRemaining), totalQuestions=VALUES(totalQuestions), selectedLang=VALUES(selectedLang)";
        queryValues = ["testuserinfo", "userId", "testId", "status", "timeRemaining", "totalQuestions", "selectedLang", req.userId, req.testId, req.status, req.timeRemaining, req.answers.length, req.selectedLang];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    if (req.status == 'completed') {
                        self.instantEvaluation(req, pool);
                    }
                    callback({ "Error": false, "Message": "Exam submited Successfully" });
                }
            });
        });
    },
    instantEvaluation: function(req, pool) {
        var questions = [],
            testInfo;
        if (req.answers && req.answers.length > 0) {
            query = "SELECT * FROM ?? WHERE id=?";
            queryValues = ["tests", parseInt(req.testId)];
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    if (err) {
                        connection.release();
                        console.log(err);
                    } else if (rows && rows.length > 0) {
                        testInfo = rows[0];
                        self.getTestQuestionsOnly(req, pool, function(result) {
                            questions = result.questions;
                            var score = correct = incorrect = timeSpent = 0;
                            _.forEach(req.answers, function(value) {
                                var question = _.find(questions, { 'id': value.questionId });
                                var correctAnswer = question.correctAnswer;
                                if (correctAnswer == value.answer) {
                                    score += testInfo.marksPerQues;
                                    correct++;
                                } else if (value.answer && testInfo.negativeMarks) {
                                    score -= testInfo.negativeMarks;
                                    incorrect++;
                                } else if (value.answer) {
                                    incorrect++;
                                }
                            });
                            timeSpent = testInfo.duration - req.timeRemaining;
                            query = "UPDATE ?? SET score = ?, status=?, correctAnswers=?, incorrectAnswers=?, timeSpent=? WHERE userId=? AND testId=?";
                            queryValues = ["testuserinfo", _.round(score, 2), 'evaluated', correct, incorrect, timeSpent, req.userId, req.testId];
                            query = mysql.format(query, queryValues);
                            connection.query(query, function(err, rows) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(req.userId + ' evaluated');
                                    if(testInfo.isRankPublished){
                                        self.instanttestEvaluation(req, pool, function(){
                                            console.log('Rank publish after score calculation');
                                        });
                                    }
                                }
                            });
                        });
                    }
                });
            });
        }
    },
    testScore: function(req, pool, callback) {
        var query, queryValues, userList, questions, userAnswers, status = [],
            users;
        status = ["completed", "evaluated"];
        query = "SELECT u.*, t.marksPerQues, t.negativeMarks, t.duration FROM ?? u LEFT JOIN (?? t) ON t.id = u.testId WHERE u.testId=? AND u.status IN (?)";
        queryValues = ["testuserinfo", "tests", req.testId, status];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    userList = rows;
                    users = _.map(rows, 'userId');
                    self.getTestQuestionsOnly(req, pool, function(result) {
                        questions = result.questions;
                        query = "SELECT u.* FROM ?? u WHERE u.testId=? AND u.userId IN (?)";
                        queryValues = ["test_user_answer", req.testId, users];
                        query = mysql.format(query, queryValues);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                connection.release();
                                callback({ "Error": true, "Message": err });
                            }
                            userAnswers = rows;
                            async.eachSeries(userList, function(user, callback) {
                                    var data = _.filter(userAnswers, { 'userId': user.userId });
                                    if (data && data.length > 0) {
                                        var score = correct = incorrect = timeSpent = 0;
                                        _.forEach(data, function(value) {
                                            var question = _.find(questions, { id: value.questionId });
                                            var correctAnswer = question.correctAnswer;
                                            if (correctAnswer == value.answer) {
                                                score += userList[0].marksPerQues;
                                                correct++;
                                            } else if (value.answer && userList[0].negativeMarks) {
                                                score -= userList[0].negativeMarks;
                                                incorrect++;
                                            } else if (value.answer) {
                                                incorrect++;
                                            }

                                        });
                                        timeSpent = user.duration - user.timeRemaining;
                                        query = "UPDATE ?? SET score = ?, status=?, correctAnswers=?, incorrectAnswers=?, timeSpent=? WHERE userId=? AND testId=?";
                                        queryValues = ["testuserinfo", _.round(score, 2), 'evaluated', correct, incorrect, timeSpent, user.userId, user.testId];
                                        query = mysql.format(query, queryValues);
                                        connection.query(query, function(err, rows) {
                                            if (err) {
                                                callback(err);
                                            } else {
                                                callback(null, 123)
                                            }
                                        });
                                    } else {
                                        callback(null, 123)
                                    }
                                },
                                function(err, rows) {
                                    connection.release();
                                    if (err) {
                                        callback({ "Error": true, "Message": err });
                                    } else {
                                        callback({ "Error": false, "Message": "Evaluation completed Successfully" });
                                    }
                                }
                            );
                        });
                    });
                } else {
                    callback({ "Error": false, "Message": "No recordes found" });
                }
            });
        });
    },
    testEvaluation: function(req, pool, callback) {
        var query, queryValues, userList, questions, userAnswers, status = [],
            users;
        if (req.isForced)
            status = ["completed", "evaluated"];
        else
            status = ["completed"]
        query = "SELECT u.*, t.marksPerQues, t.negativeMarks FROM ?? u LEFT JOIN (?? t) ON t.id = u.testId WHERE u.testId=? AND u.status IN (?)";
        queryValues = ["testuserinfo", "tests", req.testId, status];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    userList = rows;
                    users = _.map(rows, 'userId');
                    self.getTestQuestionsOnly(req, pool, function(result) {
                        questions = result.questions;
                        query = "SELECT u.* FROM ?? u WHERE u.testId=? AND u.userId IN (?)";
                        queryValues = ["test_user_answer", req.testId, users];
                        query = mysql.format(query, queryValues);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                connection.release();
                                callback({ "Error": true, "Message": err });
                            }
                            userAnswers = rows;
                            async.eachSeries(userList, function(user, callback) {
                                    var data = _.filter(userAnswers, { 'userId': user.userId });
                                    var score = 0;
                                    if (data && data.length > 0) {
                                        _.forEach(data, function(value) {
                                            var correctAnswer = _.find(questions, { 'id': value.questionId }).correctAnswer;
                                            if (correctAnswer == value.answer) {
                                                score += userList[0].marksPerQues;
                                            } else if (value.answer && userList[0].negativeMarks) {
                                                score -= userList[0].negativeMarks;
                                            }
                                        });
                                        query = "UPDATE ?? SET score = ?, status=? WHERE userId=? AND testId=?";
                                        queryValues = ["testuserinfo", _.round(score, 2), 'evaluated', user.userId, user.testId];
                                        query = mysql.format(query, queryValues);
                                        connection.query(query, function(err, rows) {
                                            if (err) {
                                                callback(err);
                                            }
                                            callback(null, 123)
                                        });
                                    } else {
                                        callback(null, 123)
                                    }
                                },
                                function(err, rows) {
                                    if (err) {
                                        connection.release();
                                        callback({ "Error": true, "Message": err });
                                    } else {
                                        query = "CALL calculateRank(?)";
                                        queryValues = [req.testId];
                                        query = mysql.format(query, queryValues);
                                        connection.query(query, function(err, rows) {
                                            if (err) {
                                                connection.release();
                                                callback({ "Error": true, "Message": err });
                                            } else {
                                                query = "UPDATE tests SET isRankPublished = true WHERE id = ?";
                                                queryValues = [req.testId];
                                                query = mysql.format(query, queryValues);
                                                connection.query(query, function(err, rows) {
                                                    connection.release();
                                                    if (err) {
                                                        callback({ "Error": true, "Message": err });
                                                    } else {
                                                        callback({ "Error": false, "Message": "Evaluation completed Successfully" });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }
                                // function(err, rows) {
                                //     if (err) {
                                //         connection.release();
                                //         callback({ "Error": true, "Message": err });
                                //     } else {
                                //         query = "CALL calculatePercentile(?)";
                                //         queryValues = [req.testId];
                                //         query = mysql.format(query, queryValues);
                                //         connection.query(query, function(err, rows) {
                                //             connection.release();
                                //             if (err) {
                                //                 callback({ "Error": true, "Message": err });
                                //             }
                                //             callback({ "Error": false, "Message": "Evaluation completed Successfully" });
                                //         });
                                //     }
                                // }
                                // function(err, rows) {
                                //     if (err) {
                                //         connection.release();
                                //         callback({ "Error": true, "Message": err });
                                //     } else {
                                //         query = "CALL calculateRank(?)";
                                //         queryValues = [req.testId];
                                //         query = mysql.format(query, queryValues);
                                //         connection.query(query, function(err, rows) {
                                //             if (err) {
                                //                 callback({ "Error": true, "Message": err });
                                //             }
                                //             query = "CALL calculatePercentile(?)";
                                //             queryValues = [req.testId];
                                //             query = mysql.format(query, queryValues);
                                //             connection.query(query, function(err, rows) {
                                //                 connection.release();
                                //                 if (err) {
                                //                     callback({ "Error": true, "Message": err });
                                //                 }
                                //                 callback({ "Error": false, "Message": "Evaluation completed Successfully" });
                                //             });
                                //         });
                                //     }
                                // }
                            );
                        });
                    });
                } else {
                    callback({ "Error": false, "Message": "No recordes found" });
                }
            });
        });
    },
    instanttestEvaluation: function(req, pool, callback) {
        var query, queryValues;
        query = "CALL calculateRank(?)";
        queryValues = [req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else {
                    query = "UPDATE tests SET isRankPublished = true WHERE id = ?";
                    queryValues = [req.testId];
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (err) {
                            callback({ "Error": true, "Message": err });
                        } else {
                            callback({ "Error": false, "Message": "Evaluation completed Successfully" });
                        }
                    });
                }
            });
        });

        // var query, queryValues;
        // query = "CALL calculatePercentile(?)";
        // queryValues = [req.testId];
        // query = mysql.format(query, queryValues);
        // pool.getConnection(function(err, connection) {
        //     connection.query(query, function(err, rows) {
        //         connection.release();
        //         if (err) {
        //             callback({ "Error": true, "Message": err });
        //         } else {
        //             callback({ "Error": false, "Message": "Evaluation completed Successfully" });
        //         }
        //     });
        // });

        // query = "CALL calculateRank(?)";
        // queryValues = [req.testId];
        // query = mysql.format(query, queryValues);
        // console.log(query)
        // pool.getConnection(function(err, connection) {
        //     connection.query(query, function(err, rows) {
        //         if (err) {
        //             connection.release();
        //             callback({ "Error": true, "Message": err });
        //         }
        //         query = "CALL calculatePercentile(?)";
        //         queryValues = [req.testId];
        //         query = mysql.format(query, queryValues);
        //         console.log(query)
        //         connection.query(query, function(err, rows) {
        //             connection.release();
        //             if (err) {
        //                 callback({ "Error": true, "Message": err });
        //             }
        //             callback({ "Error": false, "Message": "Evaluation completed Successfully" });
        //         });
        //     });
        // });
    },
    getUserAnswers: function(req, pool, callback) {
        var userAnswer = {};
        self.getTestUserInfo(req, pool, function(result) {
            if (result.Error) {
                callback(result);
            } else {
                userAnswer.score = result.userTestInfo.score;
                userAnswer.rank = result.userTestInfo.rank;
                userAnswer.percentile = result.userTestInfo.percentile;
                userAnswer.selectedLang = result.userTestInfo.selectedLang ? result.userTestInfo.selectedLang : 1;
                userAnswer.userInfo = result.userTestInfo.answers || [];
                req.selectAll = true;
                self.getTestQuestions(req, pool, function(result) {
                    if (result.Error) {
                        callback(result);
                    } else {
                        userAnswer.questions = result.questions;
                        var query = "SELECT marksPerQues, negativeMarks FROM ?? WHERE id=?";
                        var queryValues = ["tests", req.testId];
                        query = mysql.format(query, queryValues);
                        pool.getConnection(function(err, connection) {
                            connection.query(query, function(err, rows) {
                                connection.release();
                                if (err) {
                                    callback({ "Error": true, "Message": err });
                                } else {
                                    userAnswer.marksPerQues = rows[0].marksPerQues;
                                    userAnswer.negativeMarks = rows[0].negativeMarks;
                                    callback({ "Error": false, "Message": "Successfull", "userAnswers": userAnswer })
                                }
                            });
                        });
                    }
                });
            }
        });
    },
    getUserAnswersPdf: function(req, pool, callback) {
        // wkhtmltopdf(req.html)
        //     .pipe(fs.createWriteStream(path.join(__dirname, 'public/out.pdf')));
        //fs.writeFileSync(path.join(__dirname, 'public/userTestInfo.xlsx'), xls, 'binary');
        
        callback({ "Error": false, "Message": "Successfull", "url": request.protocol + '://' + request.get('host') + '/out.pdf' });
    },
    editUserAnswer: function(req, pool, callback) {
        var values = [];
        var query = "INSERT INTO ?? (??, ??, ??, ??) VALUES ? ON DUPLICATE KEY UPDATE answer=VALUES(answer)";
        var queryValues = ["test_user_answer", "questionId", "userId", "testId", "answer"]; //, request.courseId, request.userId, request.mode];
        for (var i = 0; i < req.answers.length; i++) {
            values.push([req.answers[i].questionId, req.userId, req.testId, req.answers[i].answer]);
        }
        queryValues.push(values);
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Answer updated successfully" });
                }
            });
        });
    },
    addUpdateQuestionPaper: function(req, pool, callback) {
        var query = "INSERT INTO ??(??, ??) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)";
        var queryValues = ["questionpapers", "id", "name", req.id, req.name];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Question paper updates" });
                }
            });
        });
    },
    getAllQuestionPaper: function(req, pool, callback) {
        var query = "SELECT qp.*, count(qq.id) as questionCount FROM ?? qp LEFT JOIN (question_questionpaper qq) ON qq.questionPaperId = qp.id WHERE qp.isDeleted=false GROUP BY qp.id";
        var queryValues = ["questionpapers"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Successfully", "questionPapers": rows });
                }
            });
        });
    },
    deleteQuestionPaper: function(req, pool, callback) {
        var query = "UPDATE ?? SET isDeleted = true WHERE id=?";
        var queryValues = ["questionpapers", req.questionPaperId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Question paper deleted" });
                }
            });
        });
    },
    addSubject: function(req, pool, callback) {
        var query = "INSERT INTO ??(??, ??) VALUES (?, ?) ON DUPLICATE KEY UPDATE name=VALUES(name)";
        var queryValues = ["subjects", "id", "name", req.id, req.name];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    self.getAllSubjects();
                    callback({ "Error": false, "Message": "Subject added Successfully" });
                }
            });
        });
    },
    getAllSubject: function(req, pool, callback) {
        var query = "SELECT * FROM ??";
        var queryValues = ["subjects"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Successfully", "subjects": rows });
                }
            });
        });
    },
    addUpdateQuestion: function(req, pool, callback) {
        var query = "INSERT INTO ??(??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE question=VALUES(question), type=VALUES(type), explanation=VALUES(explanation), correctAnswer=VALUES(correctAnswer), subjectId=VALUES(subjectId)";
        var queryValues = ["questions", "id", "question", "type", "explanation", "correctAnswer", "subjectId", req.id, req.question, req.type, req.explanation, req.correctAnswer, req.subjectId];
        query = mysql.format(query, queryValues);
        if (req.type.toLowerCase() == 'mcq') {
            self.addUpdateMcqQuestion(query, req, pool, callback);
        } else if (req.type.toLowerCase() == 'passage') {
            self.addUpdatePassageQuestion(query, req, pool, callback);
        }
    },
    addImportedQuestion: function(req, pool, callback) {
        var query, queryValues, issues = 0,
            added = 0,
            questionIds = [];
        if (req.questions && req.questions.length > 0) {
            async.eachSeries(req.questions, function(question, childCallback) {
                var subjectId = _.find(subjectList, { 'name': question.subject });
                subjectId = subjectId ? _.map([subjectId], 'id')[0] : 0;
                query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE question=VALUES(question), type=VALUES(type), explanation=VALUES(explanation), correctAnswer=VALUES(correctAnswer), subjectId=VALUES(subjectId), questionText=VALUES(questionText), explanationText=VALUES(explanationText)";
                queryValues = ["questions", "id", "question", "type", "explanation", "correctAnswer", "subjectId", "questionText", "explanationText", "questionNo", question.id, question.question, question.type, question.explanation, question.correctAnswer, subjectId, question.questionText, question.explanationText, question.questionNo];
                query = mysql.format(query, queryValues);
                self.addUpdateMcqQuestion(query, question, pool, function(result) {
                    if (result.Error) {
                        issues++;
                        childCallback(true, { 'issues': issues, 'added': added });
                    } else {
                        added++;
                        questionIds.push(result.questionId);
                        childCallback(null, { 'issues': issues, 'added': added });
                    }
                });
            }, function(err, rows) {
                if (err) {
                    callback({ "Error": true, "Message": err, "type": "flow" });
                } else {
                    if (req.questionPaperId) {
                        var values = [];
                        query = "INSERT INTO ??(??, ??) VALUES ? ON DUPLICATE KEY UPDATE questionPaperId=VALUES(questionPaperId), questionId=VALUES(questionId)";
                        queryValues = ["question_questionpaper", "questionPaperId", "questionId"];
                        for (var i = 0; i < questionIds.length; i++) {
                            values.push([req.questionPaperId, questionIds[i]]);
                        }
                        queryValues.push(values);
                        query = mysql.format(query, queryValues);
                        pool.getConnection(function(err, connection) {
                            connection.query(query, function(err, rows) {
                                connection.release();
                                if (err) {
                                    callback({ "Error": true, "Message": err });
                                } else {
                                    callback({ "Error": false, "Message": "Question added Successfully", "counts": rows });
                                }
                            });
                        });
                    } else {
                        callback({ "Error": false, "Message": "Question added Successfully", "counts": rows });
                    }
                }
            });
        }
    },
    addUpdateMcqQuestion: function(query, req, pool, callback) {
        var query = query,
            queryValues;
        pool.getConnection(function(err, connection) {
            connection.beginTransaction(function(err) {
                if (err) {
                    callback({ "Error": true, "Message": err });
                }
                connection.query(query, function(err, rows) {
                    if (err) {
                        console.log(err)
                        return connection.rollback(function() {
                            connection.release();
                            callback({ "Error": true, "Message": err, "type": "question" });
                        });
                    }
                    var questionId = rows.insertId || req.id;
                    query = "INSERT INTO ??(??, ??, ??, ??, ??, ??) values ? ON DUPLICATE KEY UPDATE questionId=VALUES(questionId), answerText=VALUES(answerText), ansKey=VALUES(ansKey), isDeleted=VALUES(isDeleted), ansText=VALUES(ansText)";
                    queryValues = ["answers", "id", "questionId", "answerText", "ansKey", "isDeleted", "ansText"];
                    var values = [];
                    for (var i = 0; i < req.answers.length; i++) {
                        values.push([req.answers[i].id, questionId, req.answers[i].answerText, req.answers[i].ansKey, req.answers[i].isDeleted ? true : false, req.answers[i].ansText]);
                    }
                    queryValues.push(values);
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        if (err) {
                            return connection.rollback(function() {
                                connection.release();
                                callback({ "Error": true, "Message": err, "type": "answer" });
                            });
                        }
                        connection.commit(function(err) {
                            connection.release();
                            if (err) {
                                return connection.rollback(function() {
                                    callback({ "Error": true, "Message": err, "type": "transaction" });
                                });
                            }
                            self.getQuestionCount(pool);
                            callback({ "Error": false, "Message": "Question added Successfully", "questionId": questionId });
                        });
                    });
                });
            });
        });
    },
    addUpdatePassageQuestion: function(query, req, pool, callback) {
        var query = query,
            queryValues;
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
                    var questionId = rows.insertId || req.id;
                    _.forEach(req.childQuestions, function(value) {
                        value.parentQuestionId = questionId;
                        value.type = "PassageChild";
                    });
                    async.eachSeries(req.childQuestions, function(question, callback) {
                        query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE question=VALUES(question), type=VALUES(type), explanation=VALUES(explanation), isDeleted=VALUES(isDeleted), correctAnswer=VALUES(correctAnswer)";
                        queryValues = ["questions", "id", "question", "type", "explanation", "parentQuestionId", "isDeleted", "correctAnswer", question.id, question.question, question.type, question.explanation, question.parentQuestionId, question.isDeleted, question.correctAnswer];
                        query = mysql.format(query, queryValues);
                        connection.query(query, function(err, rows) {
                            if (err) {
                                console.log(err)
                                callback(err);
                            }
                            var questionId = rows.insertId || question.id;
                            query = "INSERT INTO ??(??, ??, ??, ??, ??) values ? ON DUPLICATE KEY UPDATE questionId=VALUES(questionId), answerText=VALUES(answerText), ansKey=VALUES(ansKey), isDeleted=VALUES(isDeleted)";
                            queryValues = ["answers", "id", "questionId", "answerText", "ansKey", "isDeleted"];
                            var values = [];
                            for (var i = 0; i < question.answers.length; i++) {
                                values.push([question.answers[i].id, questionId, question.answers[i].answerText, question.answers[i].ansKey, question.answers[i].isDeleted]);
                            }
                            queryValues.push(values);
                            query = mysql.format(query, queryValues);
                            connection.query(query, function(err, rows) {
                                if (err) {
                                    callback(err);
                                }
                                callback(null, rows)
                            });
                        });
                    }, function(err, rows) {
                        if (err) {
                            console.log(err)
                            return connection.rollback(function() {
                                connection.release();
                                callback({ "Error": true, "Message": err });
                            });
                        }
                        connection.commit(function(err) {
                            connection.release();
                            if (err) {
                                return connection.rollback(function() {
                                    callback({ "Error": true, "Message": err });
                                });
                            }
                            self.getQuestionCount(pool);
                            callback({ "Error": false, "Message": "Question added Successfully" });
                        });
                    });
                });
            });
        });
    },
    getQuestionById: function(req, pool, callback) {
        var query = "SELECT * FROM ?? q WHERE q.isDeleted=false and (q.id=? or q.parentQuestionId=?)";
        var queryValues = ["questions", req.questionId, req.questionId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    var question = _.find(rows, { 'id': req.questionId });
                    question.childQuestions = _.filter(rows, { 'parentQuestionId': req.questionId });
                    self.getQuestionsAnswer(question, pool, callback);
                } else {
                    callback({ "Error": true, "Message": "Question not found" });
                }
            });
        });
    },
    getQuestionsAnswer: function(req, pool, callback) {
        var questionIds = [];
        if (req.type.toLowerCase() == 'mcq') {
            questionIds = req.id;
        } else if (req.type.toLowerCase() == 'passage') {
            questionIds = _.map(req.childQuestions, 'id');
        }
        var query = "SELECT * FROM ?? WHERE questionId IN (?) AND isDeleted=false";
        var queryValues = ["answers", questionIds];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    if (req.type.toLowerCase() == 'mcq') {
                        req.answers = rows;
                    } else if (req.type.toLowerCase() == 'passage') {
                        _.forEach(req.childQuestions, function(value) {
                            value.answers = _.filter(rows, { 'questionId': value.id });
                        });
                    }
                    callback({ "Error": false, "Message": "Successfully", "question": req });
                } else {
                    callback({ "Error": false, "Message": "Successfully", "question": req });
                }
            });
        });
    },
    getAllQuestionsByQPId: function(req, pool, callback) {
        var questions = [],
            from = 0,
            count = req.perPage || 40,
            recordCount = 0;
        if (req.page) {
            from = (req.page - 1) * count;
        }
        if (req.questionPaperId) {
            var query = "SELECT q.* FROM ?? q WHERE q.isDeleted=false AND q.id IN (SELECT qq.questionId from question_questionpaper qq WHERE qq.questionPaperId = ?) LIMIT ?, ?";
            var queryValues = ["questions", req.questionPaperId, from, count];
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    if (err) {
                        connection.release();
                        callback({ "Error": true, "Message": err });
                    } else {
                        questions = rows;
                        query = "SELECT count(*) as recordCount FROM ?? WHERE questionPaperId = ?";
                        queryValues = ["question_questionpaper", req.questionPaperId];
                        query = mysql.format(query, queryValues);
                        connection.query(query, function(err, rows) {
                            connection.release();
                            if (err) {
                                callback({ "Error": true, "Message": err });
                            } else {
                                recordCount = rows[0].recordCount;
                                callback({ "Error": false, "Message": "Successfully", "questions": questions, "recordCount": recordCount });
                            }
                        });
                    }
                });
            });
        }
    },
    getQuestionsByQPId: function (req, pool, callback) {
        var questions = answerList = [];
        if (req.questionPaperId) {
            var query = "SELECT q.* FROM ?? q WHERE q.isDeleted=false AND q.id IN (SELECT qq.questionId from question_questionpaper qq WHERE qq.questionPaperId = ?)";
            var queryValues = ["questions", req.questionPaperId];
            query = mysql.format(query, queryValues);
            pool.getConnection(function(err, connection) {
                connection.query(query, function(err, rows) {
                    if (err) {
                        connection.release();
                        callback({ "Error": true, "Message": err });
                    } else {
                        if (err) {
                            connection.release();
                            callback({ "Error": true, "Message": err });
                        } else {
                            questions = rows;
                            query = "SELECT * FROM ?? WHERE questionId IN (SELECT qq.questionId from question_questionpaper qq WHERE qq.questionPaperId = ?)";
                            queryValues = ["answers", req.questionPaperId];
                            query = mysql.format(query, queryValues);
                            connection.query(query, function(err, rows) {
                                connection.release();
                                if (err) {
                                    callback({ "Error": true, "Message": err });
                                } else {
                                    answerList = rows;
                                    _.forEach(questions, function(value){
                                        value.answers = _.filter(answerList, { 'questionId': value.id });
                                    });
                                    callback({ "Error": false, "Message": "Successfully", "questions": questions });
                                }
                            });
                        }
                    }
                });
            });
        }
    },
    getAllQuestion: function(req, pool, callback) {
        var questions = questionPapers = [],
            from = 0,
            count = req.perPage || 40;
        if (req.page) {
            from = (req.page - 1) * count;
        }
        var query = "SELECT q.*, GROUP_CONCAT(qq.questionPaperId) as questionPaperList FROM ?? q LEFT JOIN (question_questionpaper qq) ON q.id = qq.questionId WHERE q.isDeleted=false and q.parentQuestionId IS NULL GROUP BY q.id ORDER BY q.id DESC LIMIT ?, ?";
        var queryValues = ["questions", from, count];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else {
                    questions = rows;
                    query = "SELECT * FROM ?? WHERE isDeleted=false";
                    queryValues = ["questionpapers"];
                    query = mysql.format(query, queryValues);
                    connection.query(query, function(err, rows) {
                        connection.release();
                        if (err) {
                            callback({ "Error": false, "Message": "Successfully", "questions": questions });
                        } else {
                            questionPapers = rows;
                            _.forEach(questions, function(value) {
                                value.questionPapers = [];
                                if (value.questionPaperList) {
                                    _.forEach(value.questionPaperList.split(','), function(childValue) {
                                        var questionPaper = _.find(questionPapers, { 'id': parseInt(childValue) });
                                        if (questionPaper)
                                            value.questionPapers.push({ questionPaperId: questionPaper.id, name: questionPaper.name });
                                    });
                                }
                            });
                            callback({ "Error": false, "Message": "Successfully", "questions": questions, "recordCount": questionList.length });
                        }
                    });
                }
            });
        });
    },
    deleteQuestion: function(req, pool, callback) {
        var query = "UPDATE ?? SET isDeleted = true WHERE id=?";
        var queryValues = ["questions", req.questionId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    self.getQuestionCount(pool);
                    callback({ "Error": false, "Message": "Question deleted" });
                }
            });
        });
    },
    addUpdateToPaper: function(req, pool, callback) {
        var query, queryValues;
        query = "INSERT INTO ??(??, ??) VALUES ? ON DUPLICATE KEY UPDATE questionPaperId=VALUES(questionPaperId), questionId=VALUES(questionId)";
        queryValues = ["question_questionpaper", "questionPaperId", "questionId"];
        var values = [];
        for (var i = 0; i < req.questionIds.length; i++) {
            values.push([req.questionPaperId, req.questionIds[i]]);
        }
        queryValues.push(values);
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Question added to question paper" });
                }
            });
        });
    },
    calculateQuestionsDifficulty: function(req, pool, callback) {
        var query = "INSERT INTO ?? (??, ??, ??, ??) SELECT t.questionId, count(*) as totalAttempt, count(case when t.answer = q.correctAnswer then 1 else null end) as correct, count(case when t.answer is null or t.answer = '' then 1 else null end) as unanswered FROM test_user_answer t LEFT JOIN (questions q) ON q.id = t.questionId GROUP BY t.questionId ON DUPLICATE KEY UPDATE totalAttempt = VALUES(totalAttempt), correct = VALUES(correct), unanswered = VALUES(unanswered);"
        var queryValues = ["questions_stats", "questionId", "totalAttempt", "correct", "unanswered"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Question stats successfully" });
                }
            });
        });
    },
    addOfflineScores: function(req, pool, callback) {
        if (req.users && req.users.length > 0 && req.testId) {
            var query, queryValues;
            async.eachSeries(req.users, function(user, childCallback) {
                query = "INSERT INTO ??(??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE email=VALUES(email), phone=VALUES(phone), fullName=VALUES(fullName), profileType=VALUES(profileType)";
                queryValues = ["user", "id", "fullName", "email", "phone", "profileType", user.id, user.fullName, user.email, user.phone, 'dummy'];
                query = mysql.format(query, queryValues);
                pool.getConnection(function(err, connection) {
                    connection.beginTransaction(function(err) {
                        if (err) {
                            childCallback(err);
                        }
                        connection.query(query, function(err, rows) {
                            if (err) {
                                return connection.rollback(function() {
                                    connection.release();
                                    childCallback(err);
                                });
                            }
                            var userId = user.id || rows.insertId
                            query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??) values (?, ?, ?, ?, ?, ?, ?)";
                            queryValues = ["testuserinfo", "userId", "testId", "totalQuestions", "correctAnswers", "incorrectAnswers", "score", "status", userId, req.testId, user.totalQuestions, user.correctAnswers, user.incorrectAnswers, user.score, 'evaluated'];
                            query = mysql.format(query, queryValues);
                            connection.query(query, function(err, rows) {
                                if (err) {
                                    return connection.rollback(function() {
                                        connection.release();
                                        childCallback(err);
                                    });
                                }
                                connection.commit(function(err) {
                                    if (err) {
                                        return connection.rollback(function() {
                                            connection.release();
                                            childCallback(err);
                                        });
                                    }
                                    childCallback();
                                });
                            });
                        });
                    });
                });
            }, function(err) {
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Scores uploaded Successfully" });
                }
            });
        }
    },
    deleteOfflineScores: function(req, pool, callback) {
        var query = "SELECT u.id FROM user u JOIN (testuserinfo tu) ON tu.testId = ? and tu.userId = u.id WHERE u.profileType = 'dummy'";
        var queryValues = [req.testId];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else {
                    var userIds = _.map(rows, 'id');
                    if (userIds && userIds.length > 0) {
                        query = "DELETE FROM user WHERE id in (?)";
                        queryValues = [userIds];
                        query = mysql.format(query, queryValues);
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
                                query = "DELETE FROM testuserinfo WHERE userId in (?)";
                                queryValues = [userIds];
                                query = mysql.format(query, queryValues);
                                connection.query(query, function(err, rows) {
                                    if (err) {
                                        return connection.rollback(function() {
                                            connection.release();
                                            callback({ "Error": true, "Message": err });
                                        });
                                    }
                                    connection.commit(function(err) {
                                        connection.release();
                                        if (err) {
                                            return connection.rollback(function() {
                                                callback({ "Error": true, "Message": err });
                                            });
                                        }
                                        callback({ "Error": false, "Message": "Successfull" });
                                    });
                                });
                            });
                        });
                    } else {
                        callback({ "Error": false, "Message": "No dummy to delete" });
                    }
                }
            });
        });
    }
};

module.exports = self;

var mysql = require("mysql");
var _ = require("lodash");
var moment = require("moment");
var async = require('async');
var config = require('./config');
var fs = require('fs');

var self = {
    addUpdateTest: function(req, pool, callback) {
        req.duration = req.duration ? req.duration * 3600 : '';
        req.startDate = req.startDate ? moment(req.startDate).format('YYYY-MM-DD HH:mm:SS') : '';
        req.endDate = req.endDate ? moment(req.endDate).format('YYYY-MM-DD HH:mm:SS') : '';
        var query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=VALUES(title), duration=VALUES(duration), startDate=VALUES(startDate), endDate=VALUES(endDate), marksPerQues=VALUES(marksPerQues), negativeMarks=VALUES(negativeMarks), instantResult=VALUES(instantResult), instantRank=VALUES(instantRank), instruction=VALUES(instruction), questionPaperId=VALUES(questionPaperId)";
        var queryValues = ["tests", "id", "title", "duration", "startDate", "endDate", "marksPerQues", "negativeMarks", "instantResult", "instantRank", "instruction", "questionPaperId", req.id, req.title, req.duration, req.startDate, req.endDate, req.marksPerQues, req.negativeMarks, req.instantResult, req.instantRank, req.instruction, req.questionPaperId];
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
                        value.duration = value.duration / 3600;
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
        if (req.withEvaluatedStatus) {
            query = "SELECT u.id, u.fullName, tu.score, tu.rank FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? AND tu.status=? ORDER BY tu.rank";
            queryValues = [req.testId, "evaluated"];
        } else {
            query = "SELECT u.id, u.fullName, u.email, u.phone, tu.status, tu.score, tu.rank FROM testuserinfo tu JOIN (user u) ON tu.userId = u.id WHERE tu.testId=? ORDER BY tu.rank";
            queryValues = [req.testId];
        }
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Successfull", "testUsers": rows });
                }
            });
        });
    },
    getAllExams: function(req, pool, callback) {
        var query = "SELECT t.*, u.status, u.score, u.rank FROM ?? t LEFT JOIN (testuserinfo u) ON t.id = u.testId and u.userId = ? WHERE isDeleted=false AND questionPaperId IS NOT NULL AND subdate(current_date, 1) >= ?? and subdate(current_date, 1) <= ??";
        var queryValues = ["tests", req.userId, "startDate", "endDate"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
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
                        query = "SELECT * FROM ?? WHERE isDeleted=false AND (id IN (?) OR parentQuestionId IN (?))";
                    } else {
                        query = "SELECT id, question, type, parentQuestionId FROM ?? WHERE isDeleted=false AND (id IN (?) OR parentQuestionId IN (?))";
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
                                    query = "SELECT id, answerText, ansKey FROM ?? WHERE isDeleted=false AND questionId=?";
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
                    query = "SELECT * FROM ?? WHERE userId=? AND testId=?";
                    queryValues = ["test_user_answer", req.userId, req.testId];
                    query = mysql.format(query, queryValues);
                    pool.getConnection(function(err, connection) {
                        connection.query(query, function(err, rows) {
                            connection.release();
                            if (err) {
                                callback({ "Error": true, "Message": err });
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
            console.log(query)
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
    	console.log(req.userId)
        query = "INSERT INTO ??(??, ??, ??, ??) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE status=VALUES(status), timeRemaining=VALUES(timeRemaining)";
        queryValues = ["testuserinfo", "userId", "testId", "status", "timeRemaining", req.userId, req.testId, req.status, req.timeRemaining];
        query = mysql.format(query, queryValues);
        console.log(query)
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Exam submited Successfully" });
                }
            });
        });
    },
    testEvaluation: function(req, pool, callback) {
        var query, queryValues, userList, questions, userAnswer;
        query = "SELECT u.*, t.marksPerQues, t.negativeMarks FROM ?? u LEFT JOIN (?? t) ON t.id = u.testId WHERE u.testId=? AND u.status=?";
        queryValues = ["testuserinfo", "tests", req.testId, "completed"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                if (err) {
                    connection.release();
                    callback({ "Error": true, "Message": err });
                } else if (rows && rows.length > 0) {
                    userList = rows;
                    self.getTestQuestionsOnly(req, pool, function(result) {
                        questions = result.questions;
                        async.eachSeries(userList, function(user, callback) {
                                var data = {
                                    testId: req.testId,
                                    userId: user.userId
                                };
                                self.getTestUserInfo(data, pool, function(result) {
                                    if (result.Error) {
                                        connection.release();
                                        callback(result);
                                    } else {
                                        var score = 0;
                                        _.forEach(result.userTestInfo.answers, function(value) {
                                            var correctAnswer = _.find(questions, { 'id': value.questionId }).correctAnswer;
                                            if (correctAnswer == value.answer) {
                                                score += userList[0].marksPerQues;
                                            } else if (value.answer && userList[0].negativeMarks) {
                                                score -= userList[0].negativeMarks;
                                            }
                                        });
                                        query = "UPDATE ?? SET score = ?, status=? WHERE userId=? AND testId=?";
                                        queryValues = ["testuserinfo", score, 'evaluated', data.userId, data.testId];
                                        query = mysql.format(query, queryValues);
                                        connection.query(query, function(err, rows) {
                                            if (err) {
                                                callback(err);
                                            }
                                            callback(null, rows)
                                        });
                                    }
                                });
                            },
                            function(err, rows) {
                                connection.release();
                                if (err) {
                                    callback({ "Error": true, "Message": err });
                                } else {
                                    query = "CALL calculateRank()";
                                    connection.query(query, function(err, rows) {
                                        if (err) {
                                            callback({ "Error": true, "Message": err });
                                        }
                                        callback({ "Error": false, "Message": "Evaluation completed Successfully" });
                                    });
                                }
                            });
                    });
                } else {
                    callback({ "Error": false, "Message": "No recordes found" });
                }
            });
        });
    },
    getUserAnswers: function(req, pool, callback) {
        var userAnswer = {};
        self.getTestUserInfo(req, pool, function(result) {
            if (result.Error) {
                callback(result);
            } else {
                userAnswer.score = result.userTestInfo.score;
                userAnswer.rank = result.userTestInfo.rank;
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
    addUpdateQuestion: function(req, pool, callback) {
        var query = "INSERT INTO ??(??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE question=VALUES(question), type=VALUES(type), explanation=VALUES(explanation), correctAnswer=VALUES(correctAnswer)";
        var queryValues = ["questions", "id", "question", "type", "explanation", "correctAnswer", req.id, req.question, req.type, req.explanation, req.correctAnswer];
        query = mysql.format(query, queryValues);
        if (req.type.toLowerCase() == 'mcq') {
            self.addUpdateMcqQuestion(query, req, pool, callback);
        } else if (req.type.toLowerCase() == 'passage') {
            self.addUpdatePassageQuestion(query, req, pool, callback);
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
                        return connection.rollback(function() {
                            connection.release();
                            callback({ "Error": true, "Message": err });
                        });
                    }
                    var questionId = rows.insertId || req.id;
                    query = "INSERT INTO ??(??, ??, ??, ??, ??) values ? ON DUPLICATE KEY UPDATE questionId=VALUES(questionId), answerText=VALUES(answerText), ansKey=VALUES(ansKey), isDeleted=VALUES(isDeleted)";
                    queryValues = ["answers", "id", "questionId", "answerText", "ansKey", "isDeleted"];
                    var values = [];
                    for (var i = 0; i < req.answers.length; i++) {
                        values.push([req.answers[i].id, questionId, req.answers[i].answerText, req.answers[i].ansKey, req.answers[i].isDeleted]);
                    }
                    queryValues.push(values);
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
                            callback({ "Error": false, "Message": "Question added Successfully" });
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
    getAllQuestion: function(req, pool, callback) {
        var query = "SELECT * FROM ?? WHERE isDeleted=false and parentQuestionId IS NULL";
        var queryValues = ["questions"];
        query = mysql.format(query, queryValues);
        pool.getConnection(function(err, connection) {
            connection.query(query, function(err, rows) {
                connection.release();
                if (err) {
                    callback({ "Error": true, "Message": err });
                } else {
                    callback({ "Error": false, "Message": "Successfully", "questions": rows });
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
    importQuestion: function(req, pool, callback) {
    	console.log(req.file)
        var folderPath = './public/question';
        var read = fs.createReadStream(req.files.file.path);
        var ext = path.parse(req.files.file.name).ext;
        var fName = path.basename(req.files.file.name, ext) + '_admin';
        var fn = req.files.file.name; //Math.floor(Math.random() * 1000000000000000) + ext;
        var fileName = path.join(folderPath, fName + ext);
        var write = fs.createWriteStream(fileName);
        // req.log.info('Saving the file : ' + fn + '(Rcvd File Name: ' + fileName + ')');
        read.pipe(write);
    }
};

module.exports = self;

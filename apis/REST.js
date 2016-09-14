var queryHelper = require('./queryRunner');
var testQueryHelper = require('./testQueries');
var config = require('./config');
var path = require('path');
var request = require('request');
var _ = require("lodash");
var xlsxtojson = require("xlsx-to-json-lc");
var fs = require('fs');
var AdmZip = require('adm-zip');
var htmlToJson = require("html-to-json");
var mammoth = require("mammoth");


// function REST_ROUTER(router, connection, md5, jwt, imgUpload, fileUpload) {
//     var self = this;
//     self.handleRoutes(router, connection, md5, jwt, imgUpload, fileUpload);
// }

function REST_ROUTER(router, pool, md5, jwt, imgUpload, fileUpload) {
    var self = this;
    self.handleRoutes(router, pool, md5, jwt, imgUpload, fileUpload);
}

// REST_ROUTER.prototype.handleRoutes = function(router, connection, md5, jwt, imgUpload, fileUpload) {
REST_ROUTER.prototype.handleRoutes = function(router, pool, md5, jwt, imgUpload, fileUpload) {
    queryHelper.initdictionaries(pool);
    testQueryHelper.initTestDictionaries(pool);
    router.get("/", function(req, res) { /// base route not for use
        res.json({ "Message": "Hello World!" });
    });

    router.post("/user", function(req, res) { /// user signup route
        queryHelper.signup(req.body, pool, md5, function(result) {
            res.json(result);
        });
    });

    router.post("/login", function(req, res) { /// user signin route
        req.body.secretString = config.secret;
        queryHelper.login(req, req.body, pool, jwt, md5, function(result) {
            res.json(result);
        });
    });

    router.post("/forget", function(req, res) {
        queryHelper.forgetPassword(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/reset", function(req, res) {
        queryHelper.resetPassword(req.body, pool, md5, function(result) {
            res.json(result);
        });
    });

    router.post("/sendOtp", function(req, res) {
        queryHelper.generatOtp(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/validateOtp", function(req, res) {
        queryHelper.validatetOtp(req.body, function(result) {
            res.json(result);
        });
    });

    //    router.use(function(req, res, next) {
    //        // check header or url parameters or post parameters for token
    //        var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //        // decode token
    //        if (token) {
    //            // verifies secret and checks exp
    //            jwt.verify(token, config.secret, function(err, decoded) {      
    //                if (err) {
    //                    return res.json({ success: false, message: 'Failed to authenticate token.' });    
    //                } else {
    //                    // if everything is good, save to request for use in other routes
    //                    req.decoded = decoded;    
    //                    next();
    //                }
    //            });
    //        } else {
    //            // if there is no token
    //            // return an error
    //            return res.status(403).send({ 
    //                success: false, 
    //                message: 'No token provided.' 
    //            });
    //        }
    //    });

    router.post("/user/byId", function(req, res) { /// get user by id
        queryHelper.getProfile(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/user/byType", function(req, res) { /// get user by type
        queryHelper.getAllUsers("byType", req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/user/name", function(req, res) { /// get user by type
        queryHelper.getAllUsersName("byType", req.body.type, pool, function(result) {
            res.json(result);
        });
    });

    router.put("/user", imgUpload, function(req, res) { /// user update router
        if (req && req.files && req.files.file && req.files.file.path)
            req.body.user.profilePhoto = req.protocol + '://' + req.get('host') + '/' + req.files.file.path.substring(req.files.file.path.indexOf('\/'));
        queryHelper.updateUser(req.body, pool, md5, function(result) {
            res.json(result);
        });
    });
    /* courses releated routes started */
    router.post("/course", fileUpload, function(req, res) { /// add or update courses with or without instructor
        if (req && req.files && req.files.file && req.files.file.path) {
            //watermark.embedWatermark(path.resolve("./public/filesPath/UsRQqz1Ak53cnbsGm2AxPNkG.pdf"), {'text' : 'sample watermark'});
            req.body.course.filePath = req.protocol + '://' + req.get('host') + req.files.file.path.substring(req.files.file.path.indexOf('\\'));
            req.body.course.fileName = req.files.file.name;
        }
        queryHelper.addUpdateCourse(req.body.course, pool, function(result) {
            // if (result && result.courseId) {
            //     setFileToCorrectLocation(result.courseId, req.protocol, req.get('host'));
            // }
            if (result && result.courseId && req.body.course.units) {
                queryHelper.addUpdateCourseUnit(req.body.course.units, result.courseId, pool, function(result) {
                    res.json(result);
                });
            } else {
                res.json(result);
            }
        });
    });

    router.post("/course/subscribe", function(req, res) {
        if (req.body.amt && req.body.amt > 0) {
            var headers = { 'X-Api-Key': config.instamojo.APIKey, 'X-Auth-Token': config.instamojo.AuthToken }
            var payload = {
                purpose: req.body.purpose,
                amount: req.body.amt,
                phone: req.body.phone,
                buyer_name: req.body.fullName,
                redirect_url: 'http://52.66.110.111/#/main/libary',
                send_email: false,
                webhook: 'http://52.66.119.248/api/course/payment',
                send_sms: false,
                email: req.body.email,
                allow_repeated_payments: false
            };
            request.post('https://www.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function(error, response, body) {
                if (!error && response.statusCode == 201) {
                    var requestLink = JSON.parse(body);
                    queryHelper.savePaymentDetails(req.body, requestLink.payment_request, pool, function(result) {
                        if (result && !result.Error)
                            res.json({ 'url': requestLink.payment_request.longurl });
                        else
                            res.json({ "Error": true, "Message": "Try after some time" });
                    });
                } else {
                    res.json({ "Error": true, "Message": error });
                }
            });
        } else {
            req.body.mode = 'free';
            queryHelper.subscribeCourse(req.body, pool, function(result) {
                res.json(result);
            });
        }
    });

    router.post("/course/payment", function(req, res) {
        queryHelper.savePaymentStatus(req.body, pool, function(result) {
            res.send('done');
        });
    });

    router.post("/course/subscribeManual", function(req, res) {
        queryHelper.subscribeManual(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/course/byId", function(req, res) {
        queryHelper.getCourseById(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/course/search", function(req, res) {
        queryHelper.searchCourse('byName', req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/course/courseAndUnits", function(req, res) {
        queryHelper.getCourseAndUnits(pool, function(result) {
            res.json(result);
        });
    });

    router.get("/course/all", function(req, res) { /// get all courses
        queryHelper.getAllCourses("all", 0, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/course/allSeasional", function(req, res) { /// get seasional courses
        queryHelper.getAllCourses("allSeasional", 0, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/course/subscribed", function(req, res) { /// get subscribed courses by user id
        queryHelper.getAllCourses("subscribed", req.body.userId, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/course/unsubscribed", function(req, res) { /// get unsubscribed courses by user id
        queryHelper.getAllCourses("unsubscribed", req.body.userId, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/course/courseLibary", function(req, res) { /// get unsubscribed courses by user id
        queryHelper.getAllCourses("courseLibary", req.body.userId, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/course/userList", function(req, res) { /// get unsubscribed courses by user id
        queryHelper.getAllCourseUser(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/course/nameList", function(req, res) { /// get all courses name and id
        queryHelper.getAllCourses("nameList", 0, pool, function(result) {
            res.json(result);
        });
    });
    /* Courses related routes ends*/

    /* Units related routes start */
    router.post("/unit/byCourse", function(req, res) { /// get all units by course
        queryHelper.getAllUnits("byCourseId", req.body.courseId, pool, function(result) {
            res.json(result);
        });
    });
    /* Units related routes ends*/

    /* Lessons related roues starts*/
    router.post("/lesson", fileUpload, function(req, res) { /// create or update lesson
        queryHelper.addUpdateLesson(req.body.lesson, pool, function(result) {
            if (req && req.files && req.files.file && req.body.lesson && result.lessonId) {
                var lessonFiles = {
                    filesList: [],
                    lessonId: result.lessonId
                };
                for (var i = 0; i < req.files.file.length; i++) {
                    var file = {
                        fileName: req.files.file[i].name,
                        filePath: req.protocol + '://' + req.get('host') + '/' + req.files.file[i].path.substring(req.files.file[i].path.indexOf('\\'))
                    };
                    lessonFiles.filesList.push(file);
                }
                queryHelper.addFilesToLesson(lessonFiles, pool, function(result) {
                    res.json(result);
                });
            } else {
                res.json(result);
            }
        });
    });

    router.post('/lesson/byId', function(req, res) {
        queryHelper.getLessonById(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/lesson/addComment", function(req, res) { /// add comment to lesson
        queryHelper.addCommentOnLesson(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/lesson/allComment", function(req, res) { /// add comment to lesson
        queryHelper.getCommentOnLesson(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/lesson/all", function(req, res) { /// get all lessons
        queryHelper.getAllLessons(function(result) {
            res.json(result);
        });
    });
    /* Lessons related routes ends*/

    /* Category related routes starts*/
    router.get("/category/all", function(req, res) { /// get all lessons by unit
        queryHelper.getAllCategories("all", 0, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/category", function(req, res) { /// get all lessons by unit
        queryHelper.addCategories(req.body, pool, function(result) {
            res.json(result);
        });
    });

    /* Category related routes ends*/

    /* Batch related routes starts */

    router.post("/batch", function(req, res) {
        queryHelper.addBatch(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/batch/all", function(req, res) {
        queryHelper.getAllBatches(req.body, pool, function(result) {
            res.json(result);
        });
    });

    /* Batch related routes ends */

    /* Test related routes starts*/
    router.post("/testSeries", function(req, res) { /// add update tests
        testQueryHelper.addTestSeries(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/testSeries/update", function(req, res) { /// add update tests
        testQueryHelper.updateTestSeries(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/testSeries/byId", function(req, res) { /// add update tests
        testQueryHelper.getTestSeriesById(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/testSeries/all", function(req, res) { /// add update tests
        testQueryHelper.getAllTestSeries('all', req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/testSeries/byUser", function(req, res) { /// add update tests
        testQueryHelper.getAllTestSeries('byUser', req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/testSeries/nameList", function(req, res) { /// add update tests
        testQueryHelper.getAllTestSeries('nameList', req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/testSeries/addTest", function(req, res) { /// add update tests
        testQueryHelper.addTestToTestSeries(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/testSeries/getTests", function(req, res) { /// add update tests
        testQueryHelper.getSeriesTest(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/testSeries/addUsers", function(req, res) { /// add update tests
        testQueryHelper.addUsersToTestSeries(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/testSeries/userList", function(req, res) { /// add update tests
        testQueryHelper.getSeriesUser(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/test", function(req, res) { /// add update tests
        testQueryHelper.addUpdateTest(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/test/byId", function(req, res) { /// get all tests
        testQueryHelper.getTestById(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/test/all", function(req, res) { /// get all tests
        testQueryHelper.getAllTest(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/test/delete", function(req, res) {
        testQueryHelper.deleteTest(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/test/users", function(req, res) {
        testQueryHelper.getTestUsers(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/test/usersExport", function(req, res) {
        testQueryHelper.exportTestUsersScore(req.body, req, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/all", function(req, res) { /// get all tests
        testQueryHelper.getAllExams(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/byId", function(req, res) { /// get all tests
        testQueryHelper.getTestQuestions(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/userInfo", function(req, res) { /// get all tests
        testQueryHelper.getTestUserInfo(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/submit", function(req, res) { /// get all tests
        testQueryHelper.submitTest(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/reCheckAnswers", function(req, res) { /// get all tests
        testQueryHelper.testScore(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/evaluation", function(req, res) { /// get all tests
        testQueryHelper.testEvaluation(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/instantEvaluation", function(req, res) { /// get all tests
        testQueryHelper.instanttestEvaluation(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/userAnswers", function(req, res) { /// get all tests
        testQueryHelper.getUserAnswers(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/exam/userAnswersPdf", function(req, res) { /// get all tests
        testQueryHelper.getUserAnswersPdf(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/questionPaper", function(req, res) { /// get all tests
        testQueryHelper.addUpdateQuestionPaper(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/questionPaper/all", function(req, res) { /// get all tests
        testQueryHelper.getAllQuestionPaper(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/questionPaper/delete", function(req, res) {
        testQueryHelper.deleteQuestionPaper(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/subject", function(req, res) { /// get all tests
        testQueryHelper.addSubject(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.get("/subject/all", function(req, res) { /// get all tests
        testQueryHelper.getAllSubject(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question", function(req, res) { /// get all tests
        testQueryHelper.addUpdateQuestion(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question/byId", function(req, res) { /// get all tests
        testQueryHelper.getQuestionById(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question/all", function(req, res) { /// get all tests
        testQueryHelper.getAllQuestion(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question/byQPId", function(req, res) { /// get all questions by question paper id
        testQueryHelper.getAllQuestionsByQPId(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question/delete", function(req, res) {
        testQueryHelper.deleteQuestion(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question/addToPaper", function(req, res) {
        testQueryHelper.addUpdateToPaper(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question/difficulty", function(req, res) {
        testQueryHelper.calculateQuestionsDifficulty(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question/import", fileUpload, function(req, res) {
        if (req && req.files && req.files.file && req.files.file.path) {
            var exceltojson = xlsxtojson;
            var questions = [];
            var answers = [];
            exceltojson({
                input: req.files.file.path,
                output: null,
                lowerCaseHeaders: true,
                sheet: "Sheet1"
            }, function(err, result) {
                if (err) {
                    console.log(err);
                }
                //questions = result;
                _.forEach(result, function(value) {
                    if (value && value.index) {
                        var question = {};
                        question.question = '<p>' + value.question.trim() + '</p>';
                        question.questionText = value.questiontext ? '<p>' + value.questiontext.trim() + '</p>' : '';
                        question.explanation = '<p>' + value.explanation.trim() + '</p>';
                        question.explanationtext = value.explanationtext ? '<p>' + value.explanationtext.trim() + '</p>' : '';
                        question.correctAnswer = value.answer;
                        question.answers = [];
                        _.forIn(value, function(childValue, childKey) {
                            if (childKey.length == 1 && childValue) {
                                question.answers.push({
                                    ansKey: childKey,
                                    answerText: '<p>' + childValue.trim() + '</p>',
                                    ansText: value[childKey + "text"] ? '<p>' + value[childKey + "text"].trim() + '</p>' : ''
                                });
                            }
                        });
                        question.type = value.type;
                        question.subject = value.subject;
                        questions.push(question);
                    }
                });
                var result = {
                    questions: questions,
                    questionPaperId: req.body.questionPaperId
                };
                res.json({ "Error": false, "Message": "success", "result": result });
                // testQueryHelper.addImportedQuestion({ questions: questions, questionPaperId: req.body.questionPaperId }, pool, function(result) {
                //     res.json(result);
                // });
            });
        } else {
            res.json({ "Error": true, "Message": "No file attached" });
        }
    });

    router.post("/question/add", function(req, res) {
        testQueryHelper.addImportedQuestion(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/question/importDoc", fileUpload, function(req, res) {
        if (req && req.files && req.files.file && req.files.file.path) {
            // var zip = new AdmZip(req.files.file.path);
            var html;
            var targetDir = './public/question/' + req.body.questionPaperId + '/';
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir);
            }

            mammoth.convertToHtml({ path: req.files.file.path })
                .then(function(result) {
                    html = result.value; // The generated HTML
                    var messages = result.messages; // Any messages, such as warnings during conversion
                    var promise = htmlToJson.parse(html, {
                        sections: htmlToJson.createParser(['p, ol', {
                            'html': function($section) {
                                return $section.html();
                            },
                            'text': function($section) {
                                return $section.text();
                            },
                            'img': function($section) {
                                return $section.find('img').length > 0;
                            }
                        }])
                    }, function(err, results) {
                        if (results && results.sections && results.sections.filter && results.sections.filter.length > 0) {
                            var questions = [];
                            var question = {};
                            var currently = 'question';
                            _.forEach(results.sections.filter, function(value, key) {
                                if (value.img) {
                                        //_.replace(value.html, 'src="', 'src="' +req.protocol + '://' + req.get('host') + '/question/'  + req.body.questionPaperId + '/');
                                    value.html = value.html.replace(/src="/g, 'src="' + req.protocol + '://' + req.get('host') + '/question/' + req.body.questionPaperId + '/')
                                }
                                if (_.startsWith(value.text, 'Q.')) {
                                    if (question && question.question)
                                        questions.push(question);
                                    question = {};
                                    question.question = '<p>' + value.html.trim() + '</p>';
                                    currently = 'question'
                                } else if (value.text.indexOf(")") == 1) {
                                    question.answers = question.answers || [];
                                    var answer = {
                                        ansKey: value.text.charAt(0),
                                        answerText: value.html
                                    };
                                    question.answers.push(answer);
                                    currently = 'answer'
                                } else if (value.text && question && question.question) {
                                    if (currently == 'question') {
                                        question.question = question.question + value.html;
                                    }
                                    if (currently == 'answer' && question.answers && question.answers.length > 0) {
                                        question.answers[question.answers.length - 1].answerText = question.answers[question.answers.length - 1].answerText + value.html;
                                    }
                                }
                                if (key == results.sections.filter.length - 1)
                                    questions.push(question);
                            });
                            var result = {
                                questions: questions,
                                questionPaperId: req.body.questionPaperId
                            };
                            res.json({ "Error": true, "Message": "Success", "results": results, "result": result });
                        }
                    });
                })
                .done();
            // var zipEntries = zip.getEntries();
            // zipEntries.forEach(function(zipEntry) {
            //     console.log(zipEntry.toString());
            //     if (zipEntry.entryName.indexOf(".htm") > -1) {
            //         console.log(zipEntry.toString());
            //     }
            // });


            //zip.extractAllTo(targetDir);

            // fs.readFile(targetDir + '/Polity L 1 Test 1 V1.html', function(err, data) {
            //     if (err) throw err;
            //     console.log(data.toString());
            //     var promise = htmlToJson.parse(data.toString(), {
            //         sections: htmlToJson.createParser(['p', {
            //             'html': function($section) {
            //                 return $section.html();
            //             },
            //             'text': function($section) {
            //                 return $section.text();
            //             },
            //             'img': function($section) {
            //                 return $section.find('img').length > 0;
            //             }
            //         }])
            //     }, function(err, results) {
            //         if (results && results.sections && results.sections.filter && results.sections.filter.length > 0) {
            //             var questions = [];
            //             var question = {};
            //             var currently = 'question';
            //             _.forEach(results.sections.filter, function(value, key) {
            //                 if (value.img) {
            //                     console.log(typeof value.html)
            //                         //_.replace(value.html, 'src="', 'src="' +req.protocol + '://' + req.get('host') + '/question/'  + req.body.questionPaperId + '/');
            //                     value.html = value.html.replace(/src="/g, 'src="' + req.protocol + '://' + req.get('host') + '/question/' + req.body.questionPaperId + '/')
            //                 }
            //                 if (_.startsWith(value.text, 'Q.')) {
            //                     if (question && question.question)
            //                         questions.push(question);
            //                     question = {};
            //                     question.question = '<p>' + value.html.trim() + '</p>';
            //                     currently = 'question'
            //                 } else if (value.text.indexOf(")") == 1) {
            //                     question.answers = question.answers || [];
            //                     var answer = {
            //                         ansKey: value.text.charAt(0),
            //                         answerText: value.html
            //                     };
            //                     question.answers.push(answer);
            //                     currently = 'answer'
            //                 } else if (value.text && question && question.question) {
            //                     if (currently == 'question') {
            //                         question.question = question.question + value.html;
            //                     }
            //                     if (currently == 'answer' && question.answers && question.answers.length > 0) {
            //                         question.answers[question.answers.length - 1].answerText = question.answers[question.answers.length - 1].answerText + value.html;
            //                     }
            //                 }
            //                 if (key == results.sections.filter.length - 1)
            //                     questions.push(question);
            //             });
            //             var result = {
            //                 questions: questions,
            //                 questionPaperId: req.body.questionPaperId
            //             };
            //             res.json({ "Error": true, "Message": "Success", "results": results, "result": result });
            //         }
            //     });
            // });
        } else {
            res.json({ "Error": true, "Message": "No file attached" });
        }
    });

    router.post("/test/importOfflineScores", fileUpload, function(req, res) {
        if (req && req.files && req.files.file && req.files.file.path) {
            var exceltojson = xlsxtojson;
            var users = [];
            exceltojson({
                input: req.files.file.path,
                output: null,
                lowerCaseHeaders: true,
                sheet: "Sheet1"
            }, function(err, result) {
                if (err) {
                    console.log(err);
                }
                _.forEach(result, function(value) {
                    if (value && value.name) {
                        var user = {};
                        user.fullName = value.name;
                        user.email = value.email;
                        user.phone = value.phone;
                        user.totalQuestions = value.questions
                        user.score = value.score;
                        user.correctAnswers = value.correct;
                        user.incorrectAnswers = value.incorrect;
                        users.push(user);
                    }
                });
                var result = {
                    users: users,
                    testId: req.body.testId
                }
                res.json({ "Error": false, "Message": "success", "result": result });
            });
        } else {
            res.json({ "Error": true, "Message": "No file attached" });
        }
    });

    router.post("/test/addOfflineScores", function(req, res) {
        testQueryHelper.addOfflineScores(req.body, pool, function(result) {
            res.json(result);
        });
    });

    router.post("/test/deleteOfflineScores", function(req, res) {
        testQueryHelper.deleteOfflineScores(req.body, pool, function(result) {
            res.json(result);
        });
    });
    /* Test related routes ends*/

    function setFileToCorrectLocation(id, protocol, host) {
        queryHelper.getCourseFile(id, pool, function(result) {
            if (result && result.files && result.files.length > 0) {
                for (var i = 0; i < result.files.length; i++) {
                    var targetDir = './public/filesPath/' + id + '/';
                    if (!fs.existsSync(targetDir)) {
                        fs.mkdirSync(targetDir);
                    }
                    var tmp_path = result.files[i].filePath;
                    var target_path = targetDir + result.files[i].fileName;
                    fs.rename(tmp_path, target_path, saveTODB(result.files[i], protocol, host, target_path));
                }
            }
        });
    }

    var saveTODB = function(file, protocol, host, path) {
        return function(error) {
            if (!error) {
                file.filePath = protocol + '://' + host + '/' + path.substring(path.indexOf('filesPath'));
                console.log(file.filePath);
                queryHelper.updateFilePath(file, pool, function(result) {});
            } else {
                console.log('while writting')
            }
        }
    }

}

module.exports = REST_ROUTER;

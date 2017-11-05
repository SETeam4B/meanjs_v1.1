'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Course = mongoose.model('Course'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash'),
    cheerio = require('cheerio'),
    request = require('request');
var courses = [];
/**
 * Create a Course
 */
exports.create = function (req, res) {
    console.log("creating a new course");
    var course = new Course(req.body);
    course.user = req.user;
    course.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(course);
        }
    });
};

/**
 * Show the current Course
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var course = req.course ? req.course.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    course.isCurrentUserOwner = req.user && course.user && course.user._id.toString() === req.user._id.toString();

    res.jsonp(course);
};

/**
 * Update a Course
 */
exports.update = function (req, res) {
    var course = req.course;

    course = _.extend(course, req.body);

    course.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(course);
        }
    });
};

/**
 * Delete an Course
 */
exports.delete = function (req, res) {
    var course = req.course;

    course.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(course);
        }
    });
};


/**
 * List of Courses
 */
exports.list = function (req, res) {

    console.log("scraping courses");
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth()+1;
    var semester = 1;

    // April - October, the Fall semester's schedule would be available, the code for fall semester is 08, and 01 for spring semester.
    if (month >= 4 && month < 10) {
        semester = 8;
    }


    if (semester === 1) {

    year = year + 1;
    }
    var url = 'https://registrar.ufl.edu/soc/' + year + '0' + semester + '/all/computer.htm';

    console.log(url);
    request(url, function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html);



            //getting each table row
            $('tr').each(function (i, element) {
                var courseJSON = {courseId: "", courseSection: "", courseTitle: "", instructor: "", numberOfSections:"0"};
                // the course table has 14 columns, make sure we are not getting row from other table.
                if ($(this).children().length === 14) {
                    var cols = $(this).children();
                    var count = 0;
                    cols.each(function () {
                        count++;
                        //make sure we are not reading the header row.

                        if ($(this).text().indexOf("Course") >= 0) {
                            return false;
                        }
                        else {
                            //first column is section ID
                            // 6th column is course section
                            // 13th column is course title
                            //14th column is insturctor name
                            if (count === 1) {
                                courseJSON.courseId = $(this).text().trim();
                            } else if (count === 6) {
                                courseJSON.courseSection = $(this).text().trim();
                            } else if (count === 13) {
                                courseJSON.courseTitle = $(this).text().trim();
                            } else if (count === 14) {
                                courseJSON.instructor = $(this).text().trim();
                            }
                        }
                    });

                    if (courseJSON.courseId.length >= 1) {
                        Course.findOne({
                            'courseId': courseJSON.courseId,
                            'courseTitle': courseJSON.courseTitle,
                            'instructor': courseJSON.instructor
                        }, function (err, result) {
                            if (err) {
                                return res.status(400).send({
                                    message: errorHandler.getErrorMessage(err)
                                });
                            }

                            if (result) {
                                // console.log("course already existed");
                            }
                            else {

                                console.log("course is not existed");
                                var course = new Course(courseJSON);
                                courses.push(course);

                            }
                        });

                    }
                }

            });
        }

    });

        setTimeout(storeCourses, 1000);

    Course.find().sort('-created').populate('user', 'displayName').exec(function (err, courses) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(courses);
        }
    });
};
var storeCourses = function () {

    var previous = new Course();

    courses.sort(function (a, b) {
        var titleA = a.courseTitle.toUpperCase(); // ignore upper and lowercase
        var titleB = b.courseTitle.toUpperCase(); // ignore upper and lowercase
        if (titleA < titleB) {
            return -1;
        }
        if (titleA > titleB) {
            return 1;
        }
        return 0;
    });


        // delete repeated course, remain same course if they are taught by different instructors.
        for (var i = 0; i < courses.length; i++) {
            if (previous.courseId === courses[i].courseId && previous.courseTitle === courses[i].courseTitle && previous.instructor === courses[i].instructor) {
                courses.splice(i--, 1);
                previous.numberOfSection = previous.numberOfSection + 1;
            } else {
                previous = courses[i];

                if(previous.numberOfSection <= 1) {
                    previous.numberOfSection = 1;
                }

            }
        }


        courses.forEach(function (course, index) {
                course.save(function (err) {
                    if (err) {
                        console.log(err);
                    }

                });
            }
        );

};

/**
 * Course middleware
 */
exports.courseByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Course is invalid'
        });
    }


    Course.findById(id).populate('user', 'displayName').exec(function (err, course) {
        if (err) {
            return next(err);
        } else if (!course) {
            return res.status(404).send({
                message: 'No Course with that identifier has been found'
            });
        }
        req.course = course;
        next();
    });
};

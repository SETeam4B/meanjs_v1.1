'use strict';

/**
 * Module dependencies.
 */
var FormService = require('modules/forms/server/controllers/forms.server.controller.js');

/**
 * Globals
 */
var user, form,
    form_properties, course;

/**
 * Unit tests
 */
describe('Form Model Unit Tests:', function() {
    beforeEach(function (done) {
        course = new Course();

        form_properties = {
            ufid: 12,
            email: "test@runningtests.tk",
            firstName: "Test",
            lastName: "Run",
            street: "420 SW 69 CT",
            city: "Meme",
            state: "State",
            zipcode: "42000",
            phone: "18004204200",
            semesterAdmitted: "Spring 3000 BC",
            originCountry: "Chad",
            preferenceCourse1: course._id,
            preferenceCourse2: course._id,
            preferenceCourse3: course._id
        };

        done();
    });
}

describe ("Save with advisor", function () {
    it("Should save user to db", function (done) {

    })
})

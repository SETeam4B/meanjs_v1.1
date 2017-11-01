'use strict';

/**
 * Module dependencies
 */
var formsPolicy = require('../policies/forms.server.policy'),
    forms = require('../controllers/forms.server.controller');

module.exports = function (app) {
    // Forms Routes
    app.route('/api/forms').all(formsPolicy.isAllowed)
        .get(forms.list)
        .put(forms.update)
        .post(forms.create);

    app.route('/api/countries')
        .get(forms.countries);

    app.route('/api/forms/allForms')
        .get(forms.allStudents)

    app.route('/api/forms/updateStudentAdvisor')
        .put(forms.updateWithoutUsername)
        .post(forms.createWithoutUsername)

    app.route('/api/forms/:formId').all(formsPolicy.isAllowed)
        .get(forms.read)
        .put(forms.update)
        .delete(forms.delete);

    app.route('/api/listForm').all(formsPolicy.isAllowed)
        .get(forms.listAll);

    // Finish by binding the Form middleware
    app.param('formId', forms.formByID);
};

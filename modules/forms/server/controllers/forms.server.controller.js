'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Form = mongoose.model('Form'),
    User = mongoose.model('User'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash'),
    country = require('country-list')(),
    nodemailer = require("nodemailer"),
    smtpTransport = require('nodemailer-smtp-transport'),
    wellknown = require("nodemailer-wellknown");
var config = wellknown("QQ");


exports.countries = function (req, res) {

    res.jsonp(country.getNames());
};


var sendEmail = function (useremail, content) {

    config.auth = {
        user: '540784578@qq.com',
        pass: 'irjiojktxnfqbcib'
    }
    var transporter = nodemailer.createTransport(smtpTransport(config));

    var mailOptions = {
        from: '"TAAS Email" <540784578@qq.com>',
        to: useremail,
        subject: "[UF-TAAS]Application Confirmation",
        text: content
    }
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log("failed to send email");
            console.log(error);

        }
        else {
            console.log("Meesage had successfully sent to " + useremail);
        }
    });

};

/**
 * Create a Form
 */
exports.create = function (req, res) {
    var form = new Form(req.body);
    form.user = req.user;
    form.username = req.user.username; //Set username
    //set id
    req.user.ufid = form.ufid;

    form.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            // updateUsers(req.user.username, form.ufid);
            sendEmail(form.email, "Hello,\n" +
                "\n" +
                "Thank you for applying to be a Teaching Assistant at the University of Florida's CISE department. Your application is being processed and we will reach out to you with a decision soon. \n" +
                "\n" +
                "Best,\n" +
                "\n" +
                "UF TAAS");
            res.jsonp(form);

        }
    });
};

// /**
//  * updates the User model db schema
//  * @param user = username
//  */
// function updateUsers(user, ufid, availableHours) {
//     var updatingObject = {
//         ufid: ufid
//     };
//     if (availableHours != undefined){
//         updatingObject.availableHour = availableHours;
//     }
//     else {
//         updatingObject.availableHour = 0;
//     }
//     User.findOneAndUpdate({username:user}, updatingObject);
// }




/**
 * Show the current Form
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var form = req.form ? req.form.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    form.isCurrentUserOwner = req.user && form.user && form.user._id.toString() === req.user._id.toString();

    res.jsonp(form);
};

/**
 * Update a Form
 */
exports.update = function (req, res) {
    //var form = req.form;
    //console.log(form);
    //form = _.extend(form, req.body);
    console.log("req.user->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + req.user);

    Form.findOne({'username': req.user.username}).exec(function (err, form) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            //res.jsonp(forms);
            //Update form
            form = _.extend(form, req.body);

            //Save form to db
            form.save(function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {

                    sendEmail(form.email, "Hello,\n" +
                        "\n" +
                        "Thank you for updating your application to be a Teaching Assistant at the University of Florida's CISE department. Your application is being processed and we will reach out to you with a decision soon. \n" +
                        "\n" +
                        "Best,\n" +
                        "\n" +
                        "UF TAAS");
                    res.jsonp(form);
                }
            });

        }
    });

};
/*
  form.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(form);
    }
  });

};
*/

/**
 * Delete an Form
 */
exports.delete = function (req, res) {
    var form = req.form;

    form.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(form);
        }
    });
};

/**
 * List of Forms
 */

/*
exports.list = function(req, res) {
 Form.find().sort('-created').populate('user', 'displayName').exec(function(err, forms) {
   if (err) {
     return res.status(400).send({
       message: errorHandler.getErrorMessage(err)
     });
   } else {
     res.jsonp(forms);
   }
 });
};
*/
exports.allStudents = function (req, res) {

    Form.find({}, function (err, data) {
        if (err) {
            return res.status(400).send({message: "error finding all students"});
        }
        console.log("get find all");
        return res.status(200).send({data: data});
    })

};


exports.list = function (req, res) {

    Form.findOne({'username': req.user.username}).exec(function (err, forms) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(forms);
        }
    });
};


exports.listAll = function (req, res) {
    Form.find().sort('-created').exec(function (err, forms) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(forms);
        }
    });
};


/**
 * Form middleware
 */
exports.formByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Form is invalid'
        });
    }
    Form.findById(id).populate('user', 'displayName').exec(function (err, form) {
        if (err) {
            return next(err);
        } else if (!form) {
            return res.status(404).send({
                message: 'No Form with that identifier has been found'
            });
        }
        req.form = form;
        next();
    });
};

/**
 * updates a student already on the database
 * @param req
 * @param res
 */
exports.updateWithoutUsername = function (req, res) {
    //TODO: create an object that copies the body and only updates the body without the id

    Form.findOneAndUpdate({_id: req.body._id}, req.body, function (err, data) {
        if (err) {
            return res.status(400).send({
                message: "unsuccessfully update"
            });
        }

        return res.status(200).send({message: "successfully updated student"});
    });
};

/**
 * checks if the ufid is found
 * if it is not found it creates new student
 * @param req
 * @param res
 */
exports.createWithoutUsername = function (req, res) {
    Form.findOne({ufid: req.body.ufid}, function (err, form) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        if (form == undefined) {
            return createStudentAdvisor(req, res);
        }
    });
};

/**
 * creates a new student on the database, does not require a username
 * @param req
 * @param res
 */
function createStudentAdvisor(req, res) {
    //TODO: change this, query the user, ask xiaoming for how is it that the user is gonna be assigned the ufId
    // req.body.username = "yoyis";
    var form = new Form(req.body);
    form.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            return res.status(200).send({message: "successfully added a student"});
        }
    });
}


//TODO: check if ufid is in the user table (user table)

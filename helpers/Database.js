var mongoose = require('mongoose'),
    habitat = require('habitat'),
    debug = require('debug')('ssm-337-db:server');

var sync = require("synchronize");

var nodeEnv = process.env.NODE_ENV;
var env = habitat.load(nodeEnv + '.env');

var db = {
    host: env.get('dbHost'),
    port: env.get('dbPort'),
    path: env.get('dbPath'),
    user: env.get('dbUser'),
    password: env.get('dbPassword'),
}

//connect to the database
var connect = function () {
    mongoose.connect(db.user + ":" + db.password + "@" + db.host + ":" + db.port + "/" + db.path);
};

connect();
mongoose.connection.on('connected', function () {
    debug('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    debug('Mongoose default connection error: ' + err);
});


// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    debug('Mongoose default connection disconnected');
});


// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

var Member = require('../models/member.js');
//var Template = require('../models/template.js');

// get an Array filled in with Member objects
var getAllMembers = function(callback) {
    Member.find({}, function (err, members) {
        if (err) return callback(err);
        callback(null, members);
    })
}

var addMember = function (name, surnames, birthDate, callback) {
    /*
    Template.findOne({cc: cc}, function (err, template) {
        if (!template) {
            template = new Template({cc: cc, strings: []});
            template.save(function (err) {
                if (err) return callback(err);
                callback(null, true);
            });

        }
        else {
            callback(new Error("template does already exist"));
        }

    })*/
    member = new Member({name: name, surnames: surnames, birthDate: birthDate});
    member.save(function (err) {
        if (err) return callback(err);
        callback(null, true);
    })
};

var removeMember = function (memberId, callback) {
    Member.remove({ '_id': memberId }, function (err) {
        if (err) return callback(err);
        callback(null)
    })
}

// get a Array filled with String(schema) objects
/*var getStrings = function (cc, callback) {
    Template.findOne({cc: cc}, function (err, template) {
            if (err) return callback(err);
        if (template) {
            callback(null, template.strings);
        }
        else {
            return callback(new Error("no template found"));
        }

    })
};

//get the templates: [{cc:de,stringcount:1}]
var getTemplates = function (callback) {
    Template.find({}, function (err, templates) {
        if (err) return callback(err);
        callback(null, templates);
    })
};

//add a template to the database
var addTemplate = function (cc, callback) {
    Template.findOne({cc: cc}, function (err, template) {
        if (!template) {
            template = new Template({cc: cc, strings: []});
            template.save(function (err) {
                if (err) return callback(err);
                callback(null, true);
            });

        }
        else {
            callback(new Error("template does already exist"));
        }

    })
};

//remove a template from the database
var removeTemplate = function (cc, callback) {
    Template.find({cc: cc}).remove(function (err) {
        if (err) return callback(err);
        callback(null, true);
    });
};

//add or update a String to/in the template
var putString = function (cc, key, value, callback) {
    Template.findOne({cc: cc, "strings.key": key}, function (err, template) {
        if (err) return callback(err);
        if (template) {
            Template.update({
                cc: cc,
                "strings.key": key
            }, {
                $set: {"strings.$.value": value }
            }, function (err) {
                if (err) return callback(err);
                callback(null, 200);
            });
        }
        else {
            Template.update({
                cc: cc
            }, {
                $push: { strings: {key: key, value: value }}
            }, function (err) {
                if (err) return callback(err);
                callback(null, 201);
            });
        }
    });
};

//remove a string from a template
var removeString = function (cc, key, callback) {
    Template.update({cc: cc}, {$pull: {"strings": {key: key}}}, function (err) {
        if (err) return callback(err);
        callback(null, true);
    });
};*/

//export database functions
/*
exports.getStrings = getStrings;
exports.getTemplates = getTemplates;
exports.put = putString;
exports.remove = removeString;
exports.addTemplate = addTemplate;
exports.removeTemplate = removeTemplate;
*/
exports.getAllMembers = getAllMembers;
exports.addMember = addMember;
exports.removeMember = removeMember;
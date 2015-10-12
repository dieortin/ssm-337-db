var express = require('express');
var router = express.Router();
var database = require("../../helpers/Database");

router.get("/", function (req, res, next) {
    database.getTemplates(function (err, templates) {
        if (err) return next(err);
        var result = [];
        templates.forEach(function (template) {
            result.push({cc: template.cc, stringCount: template.strings.length});
        });
        res.json(result);
    });
});

router.get("/:cc", function (req, res, next) {
    database.getStrings(req.params.cc, function (err, strings) {
        if (err) return next(err);

        if (req.get("format") && req.get("format") === "json") {
            res.json(strings);
        }
        else {
            var result = "";
            strings.forEach(function (string) {
                result += "{KEYS}\n" + string.key + "\n\n{VALUE}\n" + string.value + "\n\n";
            });
            res.send(result);
        }
    });
})
router.delete("/:cc", function (req, res, next) {
    database.removeTemplate(req.params.cc, function (err) {
        if (err) return next(err);
        res.status(204).send();
    });
})

router.put("/:cc", function (req, res, next) {
    if (!req.params.cc) {
        var err = new Error("missing param: cc");
        err.status = 400;
        return next(err);
    }

    database.addTemplate(req.params.cc, function (err) {
        if (err) return next(err);
        res.status(201).send();
    });
});

router.get("/:cc/:key", function (req, res, next) {
    database.getStrings(req.params.cc, function (err, strings) {
        if (err) return next(err);
        var result = "";
        strings.forEach(function (string) {
            if (string.key === req.params.key) {
                result += string.value;
            }
        });
        if (result === "") return next(new Error("String not found"));
        res.send(result);
    });
})
router.put("/:cc/:key", function (req, res, next) {
    console.log(req.body);
    if (!req.params.cc || !req.params.key || !req.body.value) {
        var err = new Error("missing param: cc or key or value (form)");
        err.status = 400;
        return next(err);
    }
    database.put(req.params.cc, req.params.key, req.body.value, function (err, status) {
        if (err) return next(err);
        res.status(status).send();
    });
})
router.delete("/:cc/:key", function (req, res, next) {
    if (!req.params.cc || !req.params.key) {
        var err = new Error("missing param: cc or key ");
        err.status = 400;
        return next(err);
    }
    database.remove(req.params.cc, req.params.key, function (err) {
        if (err) return next(err);
        res.status(204).send();
    });
});


module.exports = router;
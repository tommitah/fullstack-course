"use strict";
exports.__esModule = true;
var express_1 = require("express");
var qs_1 = require("qs");
// referred to from qs documentation
// extends on qs to allow parsing strings to primitive types
var queryType = require('query-types');
var calculateBMI_1 = require("./calculateBMI");
var app = (0, express_1["default"])();
app.get('/bmi', function (req, res) {
    var _a = req.query, height = _a.height, weight = _a.weight;
    if (typeof height !== 'number' || typeof weight !== 'number')
        res.status(400).json({ error: 'malformatted parameters' });
    // tsserver(lsp) is being annoying and crying about the params not being numbers and preventing compilation
    // typeof shows that they are numbers so idk
    // casting to fix it, really annoying I must say
    // there should be no situation where we get here but typeof height || number !== 'number'
    var bmi = (0, calculateBMI_1.calculateBMI)(height, weight);
    var result = {
        height: height,
        weight: weight,
        bmi: bmi
    };
    res.status(200).json(result);
});
app.use(queryType.middleware());
app.set('query parser', function (str) { return qs_1["default"].parse(str); });
var PORT = 3003;
app.listen(PORT, function () { return console.log("Listening on port ".concat(PORT)); });

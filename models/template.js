/*
*   Mongoose model representing a template
*   Made up of templateSchema containing stringSchema
*/

/*=======STRING MONGOOSE SCHEMA=========
*
*   var stringSchema = mongoose.Schema({
*   	key: String,
*   	value: String
*   });
*/

/*=======TEMPLATE MONGOOSE SCHEMA=======
*   var templateSchema = mongoose.Schema({
*       cc: String,
*       strings: [stringSchema]
*   });
*/

/*=======SCHEMAS TO MONGOOSE MODEL======
*   var Template = mongoose.model("Template", templateSchema);
*/

var mongoose = require('mongoose');

module.exports = mongoose.model("Template", {
    cc: String,
    strings: [{key: String, value: String}]
})
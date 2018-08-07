/*  Author: Samuel Dube
    Description: Model for displaying the correct date format for html
*/

let Utility     = require("./utility.js");


function DateHtmlFormat(date){
    this.year = (date.constructor === Object)? date.year:Utility.DateMethod.ParseYear(date);
    this.month = (date.constructor === Object)? date.month: Utility.DateMethod.ParseMonth(date);
    this.day = (date.constructor === Object)? date.day: Utility.DateMethod.ParseDay(date);
}

module.exports = DateHtmlFormat;
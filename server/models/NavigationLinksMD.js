let mongoose    = require("mongoose"),
    Utility     = require("../utils/utility.js");


let Schema = mongoose.Schema;
let navigationSchema = new Schema({
    Link : {
        type: String,
        required: true,
        unique: 1
    },
    Category: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true
    }
});

let NavigationLinks = mongoose.model("NavigationLinks", navigationSchema);

module.exports = NavigationLinks;

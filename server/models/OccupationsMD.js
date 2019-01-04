let mongoose = require("mongoose");

let Schema = mongoose.Schema;
let occupationSchema = new Schema({
    Title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 75
    }
});

let Occupations = mongoose.model("Occupations", occupationSchema);
module.exports = Occupations;

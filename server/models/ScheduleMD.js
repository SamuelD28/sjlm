let mongoose = require("mongoose");


let Schema = mongoose.Schema;

let scheduleSchema = new Schema({
    Title : {
        type: String,
        required: true
    },
    DateFrom : {
        type : Date,
        required : true
    },
    DateTo : {
        type: Date,
        required: true
    },
    Description : {
        type : String,
        required: true
    }
});


let Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports =  Schedule;
let mongoose = require("mongoose");

//----------------Model-------------//

let Schema =  mongoose.Schema;
let membersSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Photo: {
        type: String,
        required: true
    },
    Occupation: {
        type: String,
        required: true
    },
    PersonnalNote: {
        type: String
    },
    Email:{
        type: String,
        required: true
    },
    Phone: {
        type: String,
        default: "450-347-5446"
    }
});
let Members = mongoose.model("Members" , membersSchema);

module.exports = Members;
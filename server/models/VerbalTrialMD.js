let mongoose    = require("mongoose"),
    Schema      = mongoose.Schema;


let verbalTrialSchema = new Schema({
    Title : {
        type: String,
        required : true
    },
    File : {
        type: [String],
        required: true
    },
    Date : {
        type: Date,
        required: true
    }
});

let VerbalTrial = mongoose.model("VerbalTrial", verbalTrialSchema);

module.exports = VerbalTrial;
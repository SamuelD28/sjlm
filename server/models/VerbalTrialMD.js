let mongoose    = require("mongoose"),
    Schema      = mongoose.Schema;


let verbalTrialSchema = new Schema({
    OrdinaryFiles : {
        type: [String],
        required: true
    },
    OrdinaryDate : {
        type: Date,
        required: true
    },
    ExtraordinaryFiles : {
        type: [String]
    },
    ExtraordinaryDate :{
        type: Date,
        required: function() { return this.ExtraordinaryFiles.length > 0; }
    }
});

let VerbalTrial = mongoose.model("VerbalTrial", verbalTrialSchema);

module.exports = VerbalTrial;
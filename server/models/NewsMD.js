let mongoose        = require("mongoose");

//--------------Model-------------//

let newsSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true
    },
    Important:{
        type: Boolean,
        default: false
    },
    Category:{
        type: String,
        default: "Autres"
    },
    DatePublished:{
        type: Date,
        default: new Date(),
    },
    DateDue:{
        type: Date,
        default: new Date(),
    },
    Image:{
        type:  String,
        required: true,
    },
    File:{
        type: String
    },
    Description:{
        type: String,
        required: true
    }
});

let News = mongoose.model("News" , newsSchema);

module.exports = News;

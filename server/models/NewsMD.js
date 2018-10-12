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
    Images:{
        type:  Array,
        required: true,
    },
    File:{
        type: String, 
        required: false,
        default: 'sjlm.mp4'
    },
    Description:{
        type: String,
        required: true
    },
    DescriptionHtml: {
        type: String,
        required: false,
        default: "Default text need to be inserted"
    }
});

let News = mongoose.model("News" , newsSchema);

module.exports = News;

let mongoose        = require("mongoose");

//----------------Model-------------//

let Schema = mongoose.Schema;
let pagesSchema = new Schema(
{
    PageCategory: {
        type: String,
        required: true,
        default: "Autres"
    },
    Template: {
        type: Number,
        required: true,
        default: 1
    },
    Banner: {
        type: String,
        required: true
    },
    PageTitle: {
        type: String,
        required: true
    },
    PageContent: {
        type: String,
        required: true
    },
    PageGallery:{
        type: Array,
        required: false
    }
}
);

let Pages = mongoose.model("Pages" , pagesSchema);

module.exports = Pages;
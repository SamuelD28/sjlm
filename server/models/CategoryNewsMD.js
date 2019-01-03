let mongoose    = require("mongoose"),
    Utility     = require("../utils/utility.js");


let Schema = mongoose.Schema;
let CategoryNewsSchema = new Schema({
    Title: {
        type: String,
        unique: 1,
        required: true,
        trim: true,
        maxLength: 25
    },
    Template : {
        type: String,
        required: true,
        lowercase: true,
        enum : ['timeline', 'stacked', 'portrait']
    },
    //Might remove this since its useless
    UrlValue : {
        type: String,
        trim: true,
        maxLength: 50
    }
});

CategoryNewsSchema.pre("save", function(next){
    if(this.Title !== undefined)
    {
        //Regex pour retirer les caracteres posant probleme dans un url
        this.UrlValue = Utility.ConvertToUrlSafe(this.Title);
    }
    next();
});

let CategoryNews = mongoose.model("CategoryNews", CategoryNewsSchema);

module.exports = CategoryNews;

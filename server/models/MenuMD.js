let mongoose = require("mongoose");

let Schema = mongoose.Schema;
let menuSchema = new Schema({
   Title: {
       type: String,
       required: true,
       minLength: 5,
       maxLength: 30,
   },
   Principal:{
        type: Boolean,
        required: false,
        default: false
   },
   LinkTo:{
       type: String,
       required: false,
   },
   Icon:{
       type: String,
       required: false,
       default: "compass"
   },
   ParentMenu: {
        type: Schema.Types.ObjectId, 
        ref: 'Menu' 
   }
});

//!!!!!Needs to be reworked for actual model validation. Right now it only logs that the validation didnt passed.!!!!
menuSchema.pre("save", function(next){
    if(!this.Principal && this.Submenu.length !== 0)
    {
        console.log("[- Erreur de validation -]");
        console.log(this);
    }
    next();
});

let Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;

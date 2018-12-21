let mongoose    = require("mongoose"),
    Utility     = require("../utils/utility.js");


let Schema = mongoose.Schema;
let menuSchema = new Schema({
   Title: {
       type: String,
       required: true,
       minlength: 5,
       maxlength: 100
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
       required: false
   },
   SubMenu: [{
        type : Schema.Types.ObjectId,
        ref: 'Menu',
        required: false
   }],
   ParentMenu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: false
   }
});

//!!!!!Needs to be reworked for actual model validation. Right now it only logs that the validation didnt passed.!!!!
menuSchema.pre("save", function(next){
    if(this.ParentMenu !== undefined)
    {
        Menu.findById(this.ParentMenu)
            .then((menu)=>{
                menu.SubMenu.push(this._id);
                menu.save();
            })
            .catch((err) =>{
                Utility.WriteInLog("error", err);
                console.log(err);
            });
    }
    next();
});

let Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;

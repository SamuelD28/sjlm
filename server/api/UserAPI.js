let User        = require("../models/UserMD.js"),
    Api         = new Object();
    
//Method that needs to be implemented
Api.Auth = function(req ,res){
   res.json(req.user);
}

Api.GetAllUser = function(req, res){
    User.find({} , (err, users)=>{
        if(err)
            console.log("An error occured while retrieving the users data");
        else 
            res.json(users);
    });
}

Api.UpdateUser = function(req, res)
{
    console.log(req.params.id);
    let Query = User.findByIdAndUpdate(req.params.id, req.body, {new : true});
    Query.exec()
         .then((user) =>{
            console.log("~Updated Page ID : " + req.params.id);
            res.send(user);
         })
         .catch((err) =>{
            console.log("~An Error occured while updating pages. \n ERROR: " + err);
         });
}

//Method to register a new user
Api.RegisterUser = function(req, res)
{
    const user  = new User(req.body);
    
    user.save((err, data) => {
        if(err)
            return res.json({success: false, err});
        else
        {
            console.log("~Successfully added the new user : " + data.email);
            return res.json({success: true, data});
        }
    })
}

//Method to login a new user. Create a new cookie with a token in it
Api.LoginUser = function(req, res){
    
    User.findOne({'email':req.body.email}, (err, user)=> {
        if(!user) 
            return res.json({success: false, message: "No email found"});
            
        user.comparePassword(req.body.password, function(err, isMatch){
            if(!isMatch)
                return res.json({success: false, message: "Wrong Password"});
                
            user.generateToken((err, user) =>{
                if(err)
                    return res.status(400);
                
                res.cookie("w_auth", user.token).status(200).json({
                    success: true
                });
            });
        });   
    });
}

Api.LogoutUser = function(req, res)
{
    //Temporary because it should not reach this function if the user is not connected
    if(req.user == null)
        throw new Error("~No user currently log in");
        
    User.findOne({token : req.user.token}, (err, user) => {
        if(err)
            console.log("~An error occured while logging out the user : " + err);
        else{
            //Resets the token to an empty string
            user.token = "";
            user.save();
            res.json({success : true});
        }
            
    });
}

module.exports = Api;
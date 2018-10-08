let User    = require("../models/UserMD.js"),
    Mdw     = new Object();

Mdw.IsAuth = function(req , res, next){
    let token = req.cookies.w_auth;
    
    User.findByToken(token, (err, user)=>{
            if(err)
                throw err;
            if(!user)
                return res.json({isAuth: false});
                
            req.user = user;
            next();
    });
}

module.exports = Mdw;
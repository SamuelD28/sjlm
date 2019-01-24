let User = require("../models/UserMD.js"),
    Mdw = new Object();

Mdw.IsAuth = function (req, res, next) {
    let token = req.cookies.w_auth;

    if(token === null || token === undefined){
        return res.status(503).json({success : false, error :  "Aucun biscuit envoyé au serveur"});
    }

    User.findByToken(token, (err, user) => {
        if (err)
            throw err;
        if (!user)
            return res.json({ isAuth: false });

        let userSlim = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isAuth: true,
            token: user.token,
        }

        req.user = userSlim;
        next();
    });
}

module.exports = Mdw;

let User = require("../models/UserMD.js"),
    Api = new Object(),
    Utility = require("../utils/utility.js");

//Method that needs to be implemented
Api.Auth = function (req, res) {
    res.json(req.user);
}

//Could remove ths route since it poses security treat
Api.GetAllUser = function (req, res) {
    User.find()
        .then((users) => {
            Utility.GenerateResponse(true, res, users);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.UpdateUser = function (req, res) {
    let Query = User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    Query.exec()
        .then((user) => {
            Utility.CheckIfObjectIsEmpty(req.body);
            Utility.GenerateResponse(true, res, user);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//Method to register a new user\
//Whats the difference between using the save method and the create method?
Api.RegisterUser = function (req, res) {
    User.create(req.body)
        .then((user) => {
            Utility.GenerateResponse(true, res, user);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

Api.DeleteUser = function (req, res) {
    User.findByIdAndRemove(req.params.id)
        .then((user) => {
            Utility.GenerateResponse(true, res, user);
        })
        .catch((err) => {
            Utility.GenerateResponse(false, res, err);
            Utility.WriteInLog("error", err);
        });
}

//Method to login a new user. Create a new cookie with a token in it
Api.LoginUser = function (req, res) {

    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user)
            return res.json({ success: false, message: "Aucun email correspondant à celui entré" });

        user.comparePassword(req.body.password, function (err, isMatch) {
            if (!isMatch)
                return res.json({ success: false, message: "Le mot de passe est invalide" });

            user.generateToken((err, user) => {
                if (err)
                    return res.status(400);

                res.cookie("w_auth", user.token).status(200).json({
                    success: true
                });
            });
        });
    });
}

Api.LogoutUser = function (req, res) {
    //Temporary because it should not reach this function if the user is not connected
    if (req.user === null)
        throw new Error("~No user currently log in");

    User.findOne({ token: req.user.token }, (err, user) => {
        if (err)
            Utility.GenerateResponse(false, res, err);
        else {
            //Resets the token to an empty string
            user.token = "";
            user.save();
            Utility.GenerateResponse(true, res, user);
        }
    });
}

module.exports = Api;

//~~~~~~~~~~Dependency and Declaration~~~~~//
    
let express = require("express"),
    router  = express.Router(),
    Api    = require("../api/UserAPI.js"),
    Mdw     = require("../middleware/UserMW.js");
    
//~~~~~~~~~~~Routes~~~~~~~~~~~~//

router.route("/")
      .post(Api.RegisterUser)
      .get(Api.GetAllUser);

//Testing routes
router.get("/auth", Mdw.IsAuth, Api.TestAuth);
router.post("/login" , Api.LoginUser);
router.get("/logout", Mdw.IsAuth, Api.LogoutUser);

//~~~~~~~~~~~~~Exprotation~~~~~~~~//

module.exports = router;


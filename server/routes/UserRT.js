//~~~~~~~~~~Dependency and Declaration~~~~~//
    
let express = require("express"),
    router  = express.Router(),
    Api    = require("../api/UserAPI.js"),
    Mdw     = require("../middleware/UserMW.js");
    
//~~~~~~~~~~~Routes~~~~~~~~~~~~//

router.route("/")
      .post(Mdw.IsAuth, Api.RegisterUser)
      .get(Mdw.IsAuth, Api.GetAllUser);
      
router.put("/:id", Mdw.IsAuth, Api.UpdateUser);

//Testing routes
router.get("/auth", Mdw.IsAuth, Api.Auth);
router.post("/login" , Api.LoginUser);
router.get("/logout", Mdw.IsAuth, Api.LogoutUser);

//~~~~~~~~~~~~~Exprotation~~~~~~~~//

module.exports = router;


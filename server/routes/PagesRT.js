//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/PagesAPI.js"),
    Mdw     = require(__dirname + "/../middleware/UserMW.js");

//----------------Routing--------------------//

// GET ADMIN
router.route("/")
      .get(Api.GetPages)
      .post(Mdw.IsAuth, Api.CreatePages);

router.get("/pageurl/:pageurl", Api.GetPageByPageUrl);

router.route("/:id")
      .get(Api.GetOnePage)
      .put(Mdw.IsAuth, Api.UpdatePages)
      .delete(Mdw.IsAuth, Api.DeletePages);

//----------------Module Exports-------------//

module.exports = router;
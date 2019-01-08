//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/VerbalTrialAPI.js"),
    Mdw     = require(__dirname + "/../middleware/UserMW.js");

//----------------Routing--------------------//

// GET ADMIN
router.route("/")
      .get(Api.GetVerbalTrial)
      .post(Mdw.IsAuth, Api.CreateVerbalTrial);

router.route("/:id")
      .put(Mdw.IsAuth, Api.UpdateVerbalTrial)
      .delete(Mdw.IsAuth, Api.DeleteVerbalTrial);

//----------------Module Exports-------------//

module.exports = router;
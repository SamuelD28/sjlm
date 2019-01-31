//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/ScheduleAPI.js"),
    Mdw     = require(__dirname + "/../middleware/UserMW.js");

//----------------Routing--------------------//

// GET ADMIN
router.route("/")
      .get(Api.GetSchedule)
      .post(Mdw.IsAuth, Api.CreateSchedule);

router.route("/:id")
      .put(Mdw.IsAuth, Api.UpdateSchedule)
      .delete(Mdw.IsAuth, Api.DeleteSchedule);

//----------------Module Exports-------------//

module.exports = router;
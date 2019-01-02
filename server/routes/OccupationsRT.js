let express = require("express"),
    router  = express.Router(),
    Api     = require("../api/OccupationsAPI.js");

router.route("/")
      .get(Api.GetOccupations)
      .post(Api.CreateOccupations);

router.route("/:id")
      .put(Api.UpdateOccupations)
      .delete(Api.DeleteOccupations);

module.exports = router;
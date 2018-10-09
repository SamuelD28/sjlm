//----------------Dependencies-------------//

let express         = require("express"),
    router          = express.Router(),
    Api             = require(__dirname + "/../api/PagesAPI.js");

//----------------Routing--------------------//    

// GET ADMIN
router.route("/")
      .get(Api.GetPages)
      .post(Api.CreatePages);
      
router.route("/:id")
      .get(Api.GetOnePage)
      .put(Api.UpdatePages)
      .delete(Api.DeletePages);
      
//----------------Module Exports-------------//    

module.exports = router;
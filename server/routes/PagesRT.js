//----------------Dependencies-------------//

let express         = require("express"),
    router          = express.Router(),
    Pages            = require(__dirname + "/../api/PagesAPI.js");

//----------------Routing--------------------//    

// GET ADMIN
router.route("/")
      .get(Pages.Api.GetPages)
      .post(Pages.Api.CreatePages);

router.route("/:id")
      .put(Pages.Api.UpdatePages)
      .delete(Pages.Api.DeletePages);
      
//----------------Module Exports-------------//    

module.exports = router;
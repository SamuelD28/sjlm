let express = require("express"),
    router  = express.Router(),
    Api     = require("../api/MenuAPI.js");
    
router.route("/")
      .get(Api.GetMenus)
      .post(Api.CreateMenu)
      .delete(Api.DeleteAllMenu);

router.route("/:id")
      .put(Api.UpdateMenu)
      .delete(Api.DeleteMenu);
      
module.exports = router;
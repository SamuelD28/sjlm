//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/CategoryNewsAPI.js"),
    Mdw     = require(__dirname + "/../middleware/UserMW.js");
    
//----------------Routing-------------//

router.route("/")
      .get(Api.GetCategoryNews)
      .post(Mdw.IsAuth, Api.CreateCategoryNews);
      
router.route("/:id")
      .put(Mdw.IsAuth, Api.UpdateCategoryNews)
      .delete(Mdw.IsAuth, Api.DeleteCategoryNews);

//----------------Module Export-------------//

module.exports = router;
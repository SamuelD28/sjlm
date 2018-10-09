//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/NewsAPI.js"),
    Mdw     = require(__dirname  +"/../middleware/UserMW.js");

//----------------Routing--------------------//    

// GET ADMIN
router.route("/")
      .get(Api.FindNews)
      .post(Api.CreateNews);

router.route("/:limit")
      .get(Api.FindNews)
      
router.route("/:id")
      .put(Api.UpdateNews)
      .delete(Api.DeleteNews);
      
//----------------Module Exports-------------//    

module.exports = router;
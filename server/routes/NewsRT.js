//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/NewsAPI.js"),
    Mdw     = require(__dirname  +"/../middleware/UserMW.js");

//----------------Routing--------------------//    

// GET ADMIN
router.route("/")
      .get(Api.FindNews)
      .post(Mdw.IsAuth, Api.CreateNews);

router.get("/category/:category", Api.FindNewsByCategory);
router.get("/limit/:number", Api.FindNews);
      
router.route("/:id")
      .get(Api.FindNewsById)
      .put(Mdw.IsAuth, Api.UpdateNews)
      .delete(Mdw.IsAuth, Api.DeleteNews);
      
//----------------Module Exports-------------//    

module.exports = router;
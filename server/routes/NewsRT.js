//----------------Dependencies-------------//

let express         = require("express"),
    router          = express.Router(),
    News            = require(__dirname + "/../api/NewsAPI.js");

//----------------Routing--------------------//    

// GET ADMIN
router.route("/")
      .get(News.Api.FindNews)
      .post(News.Api.CreateNews);

router.route("/:limit")
      .get(News.Api.FindNews)
      
router.route("/:id")
      .put(News.Api.UpdateNews)
      .delete(News.Api.DeleteNews);
      
//----------------Module Exports-------------//    

module.exports = router;
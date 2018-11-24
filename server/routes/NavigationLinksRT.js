//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/NavigationLinksAPI.js"),
    Mdw     = require(__dirname + "/../middleware/UserMW.js");
    
//----------------Routing-------------//

router.route("/")
      .get(Api.GetNavigationLinks)
      .post(Mdw.IsAuth, Api.CreateNavigationLinks);
      
router.route("/:id")
      .put(Mdw.IsAuth, Api.UpdateNavigationLinks)
      .delete(Mdw.IsAuth, Api.DeleteNavigationLinks);

//----------------Module Export-------------//

module.exports = router;
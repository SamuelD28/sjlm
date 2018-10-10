//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/MembersAPI.js"),
    Mdw     = require(__dirname + "/../middleware/UserMW.js");
    
//----------------Routing-------------//

router.route("/")
      .get(Api.GetMembers)
      .post(Mdw.IsAuth, Api.CreateMembers);
      
router.route("/:id")
      .put(Mdw.IsAuth, Api.UpdateMembers)
      .delete(Mdw.IsAuth, Api.DeleteMembers);

//----------------Module Export-------------//

module.exports = router;
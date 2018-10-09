//----------------Dependencies-------------//

let express = require("express"),
    router  = express.Router(),
    Api     = require(__dirname + "/../api/MembersAPI.js"),
    Mdw     = require(__dirname + "/../middleware/UserMW.js");
    
//----------------Routing-------------//

router.route("/")
      .get(Api.GetMembers)
      .post(Api.CreateMembers);
      
router.route("/:id")
      .put(Api.UpdateMembers)
      .delete(Api.DeleteMembers);

//----------------Module Export-------------//

module.exports = router;
//----------------Dependencies-------------//

let express         = require("express"),
    router          = express.Router(),
    Members         = require(__dirname + "/../api/MembersAPI.js");
    
//----------------Routing-------------//

router.route("/")
      .get(Members.Api.GetMembers)
      .post(Members.Api.CreateMembers);
      
router.route("/:id")
      .put(Members.Api.UpdateMembers)
      .delete(Members.Api.DeleteMembers);

//----------------Module Export-------------//

module.exports = router;
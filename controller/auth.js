const User = require("../models/user.js");
const router = express.Router();

router.get("sign-up", () => {
  res.render("sign-up.ejs");
});

module.exports = router;

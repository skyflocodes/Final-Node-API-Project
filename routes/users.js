  
const { create } = require("../controllers/users");

module.exports = router => {
  router.post("/users", create);

  return router;
};
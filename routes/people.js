const {
  index, show, create, update, destroy
} = require('../controllers/people');
const passport = require('passport');

module.exports = router => {
  router.get('/people', index);
  router.get('/people/:id', show);
  router.post('/people', passport.authenticate('jwt', { session: false }), create);
  router.put('/people', passport.authenticate('jwt', { session: false }), update);
  router.delete('/people', passport.authenticate('jwt', { session: false }), destroy);
};
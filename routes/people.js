const {
  index, show, create, update, destroy
} = require('../controllers/people');

module.exports = router => {
  router.get('/people', index);
  router.get('/people/:id', show);
  router.post('/people', create);
  router.put('/people', update);
  router.delete('/people', destroy);
};
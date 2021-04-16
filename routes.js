module.exports = router => {
  require('./routes/people')(router);
  require('./routes/users')(router);
  require('./routes/sessions')(router);
  return router;
};
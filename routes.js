module.exports = router => {
  require('./routes/people')(router);
  return router;
};
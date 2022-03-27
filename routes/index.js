const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.send("<h1>I'm a public route</h1>");
});

router.use('/', require('./card'));

module.exports = router;

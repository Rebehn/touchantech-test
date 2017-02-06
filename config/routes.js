const router = require('express').Router();
const membersController = require('../controllers/members');

router.route('/members')
  .get(membersController.index)
  .post(membersController.create);

module.exports = router;

const router = require('express').Router();
const membersController = require('../controllers/members');
const schoolsController = require('../controllers/schools');

router.get('/', (req, res) => res.render('homepage'));

router.route('/members')
  .get(membersController.index)
  .post(membersController.create);

router.get('/members/new', membersController.new);

router.route('/schools')
  .get(schoolsController.index)
  .post(schoolsController.create);

router.get('/schools/new', schoolsController.new);

router.route('/schools/:id')
  .get(schoolsController.show);

module.exports = router;

const School = require('../models/school');

function schoolsIndex(req, res) {
  School.find((err, schools) => {
    if(err) return res.status(500).json({ error: err });
    res.render('schools/index', { schools });
  });
}

function schoolsNew(req, res){
  res.render('schools/new');
}

function schoolsCreate(req, res) {
  School.create(req.body, (err, school) => {
    if(err) return res.status(400).json({ error: err });
    res.redirect(301, 'schools');
  });
}

function schoolsShow(req, res) {
  School.findById(req.params.id, (err, school) => {
    if(err) return res.status(500).json({ error: err });
    if(!school) return res.status(404).json({ error: 'Not found' });
    return res.json(school);
  });
}

module.exports = {
  index: schoolsIndex,
  new: schoolsNew,
  create: schoolsCreate,
  show: schoolsShow
};

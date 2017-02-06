const School = require('../models/school');

function schoolsIndex(req, res) {
  School.find((err, schools) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(schools);
  });
}

function schoolsCreate(req, res) {
  School.create(req.body, (err, school) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(school);
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
  create: schoolsCreate,
  show: schoolsShow
};

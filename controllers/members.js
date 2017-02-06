const Member = require('../models/member');

function membersIndex(req, res) {
  Member.find((err, members) => {
    if(err) return res.status(500).json({ error: err });
    return res.json(members);
  });
}

function membersCreate(req, res) {
  Member.create(req.body, (err, member) => {
    if(err) return res.status(400).json({ error: err });
    return res.json(member);
  });
}

module.exports = {
  index: membersIndex,
  create: membersCreate
};

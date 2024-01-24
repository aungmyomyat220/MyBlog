const { v4: uuid } = require('uuid');
function generateUUID(req, res, next) {
  req.uuid = uuid;
  next();
}

module.exports = generateUUID
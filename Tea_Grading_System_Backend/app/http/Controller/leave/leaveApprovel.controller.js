const service = require('../../../service/leave/leaveApprovel.service');

const log4js = require('../../../../config/log4js');
const log = log4js.getLogger('leaveApprovel.controller.js');

/**
 * Display a listing of the resource
 *
 * @param {*} req
 * @param {Object} res
 */
exports.getAll = async (req, res) => {
  const { page, size } = req.query;
  service
    .getAll(page, size, req.headers)
    .then((doc) => res.send(doc))
    .catch((err) => catchError(res, err, log));
};

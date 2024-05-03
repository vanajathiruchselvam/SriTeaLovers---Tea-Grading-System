const service = require('../../../service/report/sales.service');

const log4js = require('../../../../config/log4js');
const log = log4js.getLogger('sales.controller.js');

/**
 * Display a listing of the resource
 *
 * @param {*} req
 * @param {Object} res
 */
exports.getAll = async (req, res) => {
  const { from, to } = req.query;
  service
    .getAll(from, to)
    .then((doc) => res.send(doc))
    .catch((err) => catchError(res, err, log));
};

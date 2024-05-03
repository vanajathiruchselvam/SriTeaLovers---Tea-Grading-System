const service = require('../../../service/booking/booking.service');

const log4js = require('../../../../config/log4js');
const log = log4js.getLogger('booking.controller.js');

/**
 * Display a listing of the resource
 *
 * @param {*} req
 * @param {Object} res
 */
exports.getAll = async (req, res) => {
  const { page, size, query } = req.query;
  service
    .getAll(page, size, query)
    .then((doc) => res.send(doc))
    .catch((err) => catchError(res, err, log));
};

/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) =>
  service
    .create(req.body, req.headers)
    .then(async (doc) => response.successWithData(res, doc))
    .catch((err) => catchError(res, err, log));

/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.show = async (req, res) =>
  service
    .show(req.params.id)
    .then((doc) => response.successWithData(res, doc))
    .catch((err) => catchError(res, err, log));

/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.cancel = async (req, res) =>
  service
    .cancel(req.params.id)
    .then((doc) => response.successWithData(res, doc))
    .catch((err) => catchError(res, err, log));
/**
 *
 * @param {*} req
 * @param {*} res
 */
exports.payment = async (req, res) =>
  service
    .payment(req.params.id, req.body)
    .then((doc) => response.successWithData(res, doc))
    .catch((err) => catchError(res, err, log));

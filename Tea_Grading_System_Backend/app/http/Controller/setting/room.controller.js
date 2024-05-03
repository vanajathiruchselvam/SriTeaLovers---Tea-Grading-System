const service = require('../../../service/setting/rooms.service');

const log4js = require('../../../../config/log4js');
const log = log4js.getLogger('room.controller.js');

/**
 * Display a listing of the resource
 *
 * @param {*} req
 * @param {Object} res
 */
exports.getAll = async (req, res) => {
  const { page, size, query } = req.query;
  service
    .getAll(page, size, query, req.headers)
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
    .create(req.body)
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
exports.edit = async (req, res) => {
  service
    .update(req.params.id, req.body)
    .then((doc) => response.successWithBoolean(res, doc))
    .catch((err) => catchError(res, err, log));
};
/**
 *  Remove the specified resource from storage.
 *
 * @param {id} req
 * @param {String} res
 */
exports.delete = async (req, res) =>
  service
    .delete(req.params.id)
    .then((doc) => response.successWithBoolean(res, doc))
    .catch((err) => catchError(res, err, log));

/**
 *
 * @param {query} req
 * @param {object} res
 */
exports.search = async (req, res) => {
  service
    .search(req.query.query, req.query.except, req.query.status)
    .then((data) => response.successWithData(res, data))
    .catch((err) => catchError(res, err, log));
};

/**
 * Display a listing of the resource
 *
 * @param {*} req
 * @param {Object} res
 */
exports.all = async (req, res) => {
  const { query, start, end } = req.query;
  service
    .all(query, start, end)
    .then((doc) => res.send(doc))
    .catch((err) => catchError(res, err, log));
};

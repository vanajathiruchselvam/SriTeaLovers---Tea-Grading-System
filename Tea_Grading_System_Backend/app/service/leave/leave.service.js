const { Leave, staff, User } = require('../../models');
const Sequelize = require('sequelize');

const log4js = require('../../../config/log4js');
const log = log4js.getLogger('item.service.js');

/**
 *
 * @param {*} page
 * @param {*} itemPerPage
 * @param {*} query
 * @param {*} status
 */
exports.getAll = (page, itemPerPage) =>
  new Promise(async (resolve, reject) => {
    const { limit, offset } = getPagination(page, itemPerPage);
    Leave.findAndCountAll({
      attributes: ['id', 'from_date', 'to_date', 'reason', 'status'],
      include: [
        {
          model: staff,
          as: 'staff',
          attributes: ['id', 'staff_no', 'first_name'],
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'name'],
        },
      ],
      limit,
      offset,
      order: [['id', 'DESC']],
      distinct: true,
    })
      .then((doc) => {
        let values;
        if (doc.rows.length > 0) values = getPagingData(doc, page, itemPerPage);
        else values = 'No record found.';
        resolve(values);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} values
 */
exports.create = (values, headers) =>
  new Promise(async (resolve, reject) => {
    Leave.create({
      ...values,
      user_id: getToken(headers).key,
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} model
 */
exports.show = (model) =>
  new Promise(async (resolve, reject) => {
    Leave.findOne({
      attributes: ['id', 'from_date', 'to_date', 'reason', 'status'],
      include: [
        {
          model: staff,
          as: 'staff',
          attributes: ['id', 'staff_no', 'first_name'],
        },
        {
          model: User,
          as: 'approver',
          attributes: ['id', 'name'],
        },
      ],
      where: { id: model },
    })
      .then(resolve)
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });

/**
 *
 * @param {*} model
 */
exports.changeStatus = (model, values) =>
  new Promise(async (resolve, reject) => {
    Leave.findOne({
      where: { id: model },
    })
      .then((doc) => {
        if (!doc) throw new Error('Invalid Id.');
        doc.update({
          status: values.status,
        });
        resolve(true);
      })
      .catch((err) => {
        log.error(err);
        reject(err);
      });
  });
